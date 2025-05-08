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
export const initialize = function (
    this: IExtendedFieldInput,
    params: IFieldInitializationParameters
) {
    const em = new ExceptionManager(
        ...[newAssert(this.field.isInitialized, `The dependency field is not properly initialized`)]
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
                newEvent(
                    this.field.name,
                    this.handleOnChanged.name,
                    'onChange',
                    this.handleOnChanged.name
                ),
                this.handleOnChanged.bind(this.field)
            )
        ]
    )
}
