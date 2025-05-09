import { IFieldInitializationParameters } from '@core/factory/builder/field-builder'
import { abstractInitializer } from '@core/fields/field-base-input/abstract/abstract-initializer'
import { ExceptionManager, newAssert } from '@core/framework/exceptions/exception-manager'
import { logManager } from '@core/general-logging-manager/log-manager'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { ISelectBaseInput } from '../select-base-input.types'
/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = async function (
    this: ISelectBaseInput,
    params: IFieldInitializationParameters
) {
    try {
        const em = new ExceptionManager(
            ...[
                newAssert(this.field !== undefined, `The dependency field is not instanciated`),
                newAssert(
                    this.field.isInitialized,
                    `${this.dependencyName}:  The dependency field is not properly initialized`
                ),
                newAssert(
                    this.optionBase?.options?.length > 0,
                    `${this.dependencyName}: The needed dependency on OptionBase is not properly initialized or none options were provided.`
                ),
                newAssert(
                    this.optionBase?.isInitialized,
                    `${this.dependencyName}: The this.optionBase is not properly initialized`
                ),
                newAssert(
                    this.clickBase?.isInitialized,
                    `${this.dependencyName}: The this.clickBase is not properly initialized`
                )
            ]
        )
        em.process()
        if (em.hasErrors()) {
            logManager(undefined, 'critical', 'initialize', em.toString())
        }

        const success = await abstractInitializer(
            this.field,
            (e) => {
                logManager(undefined, 'info', 'initialize', e.name)
                // Object.setPrototypeOf(SelectBaseInput.prototype, FieldInput.prototype)
                // Object.setPrototypeOf(SelectBaseInput.prototype, ClickBaseInput.prototype)
                // Object.setPrototypeOf(SelectBaseInput.prototype, OptionBaseInput.prototype)
            },
            [
                nnv(
                    newEvent(
                        this.field.name,
                        initialize.name,
                        'onChange',
                        this.handleOnChanged.name
                    ),
                    this.handleOnChanged.bind(this)
                ),
                nnv(
                    newEvent(
                        this.field.name,
                        initialize.name,
                        'onSelect',
                        this.handleOnSelected.name
                    ),
                    this.handleOnSelected.bind(this)
                )
            ]
        )

        if (success) {
            logManager(this.field.tracker, 'info', this.dependencyName, 'Initialized')
            this.isInitialized = true
        }
    } catch (e: any) {
        logManager(this.field.tracker, 'critical', this.dependencyName, e)
    }
}
