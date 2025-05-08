import { IFieldInitializationParameters } from '@core/factory/builder/field-builder'
import { abstractInitializer } from '@core/fields/field-base-input/abstract/abstract-initializer'
import { ExceptionManager, newAssert } from '@core/framework/exceptions/exception-manager'
import { logManager } from '@core/general-logging-manager/log-manager'
import { IOptionBaseInput } from '../option-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (
    this: IOptionBaseInput,
    params: IFieldInitializationParameters
) {
    const em = new ExceptionManager(
        ...[
            newAssert(this.field.isInitialized, `The dependency field is not properly initialized`),
            newAssert(
                params.descriptor?.options?.length > 0,
                `None options were provided. this feature will not work properly`
            )
        ]
    )
    em.process()
    if (em.hasErrors()) {
        logManager(undefined, 'critical', 'initialize', em.toString())
    }

    abstractInitializer(initialize.name, this.field, (context) => {
        logManager(undefined, 'info', 'initialize', context.name)
        context.options = params.descriptor?.options ?? []
        context.optionsInitialized = true
        context.selectedOptionId = null
    })
}
