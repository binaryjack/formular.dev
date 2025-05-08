import { IFieldInitializationParameters } from '@core/factory/builder/field-builder'
import { abstractInitializer } from '@core/fields/field-base-input/abstract/abstract-initializer'
import { ExceptionManager, newAssert } from '@core/framework/exceptions/exception-manager'
import { logManager } from '@core/general-logging-manager/log-manager'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { IRadioBaseInput } from '../radio-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: IRadioBaseInput, params: IFieldInitializationParameters) {
    const em = new ExceptionManager(
        ...[
            newAssert(this.field.isInitialized, `The dependency field is not properly initialized`),
            newAssert(
                this.optionBase?.options?.length > 0,
                `The needed dependency on OptionBase is not properly initialized or none options were provided.`
            ),
            newAssert(
                this.optionBase?.isInitialized,
                `The this.optionBase is not properly initialized`
            ),
            newAssert(
                this.clickBase?.isInitialized,
                `The this.clickBase is not properly initialized`
            )
        ]
    )
    em.process()
    if (em.hasErrors()) {
        logManager(undefined, 'critical', 'initialize', em.toString())
    }

    abstractInitializer(
        initialize.name,
        this.field,
        (e) => {
            logManager(undefined, 'info', 'initialize', e.name)
        },
        [
            nnv(
                newEvent(this.field.name, initialize.name, 'onChange', this.handleOnChanged.name),
                this.handleOnChanged.bind(this)
            )
        ]
    )
}
