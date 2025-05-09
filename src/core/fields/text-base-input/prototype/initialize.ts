import { newEvent } from '@core/events/events.types'
import { IFieldInitializationParameters } from '@core/factory/builder/field-builder'
import { abstractInitializer } from '@core/fields/field-base-input/abstract/abstract-initializer'
import { IExtendedFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import { ExceptionManager, newAssert } from '@core/framework/exceptions/exception-manager'
import { logManager } from '@core/general-logging-manager/log-manager'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = async function (
    this: IExtendedFieldInput,
    params: IFieldInitializationParameters
) {
    try {
        const em = new ExceptionManager(
            ...[
                newAssert(this.field !== undefined, `The dependency field is not instanciated`),
                newAssert(
                    this.field.isInitialized,
                    `${this.dependencyName}: The dependency field is not properly initialized`
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
                // Object.setPrototypeOf(TextBaseInput.prototype, FieldInput.prototype)
            },
            [
                nnv(
                    newEvent(
                        this.field.name,
                        this.handleOnChanged.name,
                        'onChange',
                        this.handleOnChanged.name
                    ),
                    this.handleOnChanged.bind(this)
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
