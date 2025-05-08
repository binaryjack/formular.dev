import { IFieldInitializationParameters } from '@core/factory/builder/field-builder'
import { abstractInitializer } from '@core/fields/field-base-input/abstract/abstract-initializer'
import { ExceptionManager, newAssert } from '@core/framework/exceptions/exception-manager'
import { logManager } from '@core/general-logging-manager/log-manager'
import { IFieldStateStyle } from '../field-state-style.types'

export const initialize = async function (
    this: IFieldStateStyle,
    params: IFieldInitializationParameters
) {
    try {
        const em = new ExceptionManager(
            ...[
                newAssert(
                    this.field.isInitialized,
                    `The dependency field is not properly initialized`
                ),
                newAssert(
                    this.field.styler.isInitialized,
                    `The dependency field.styler is not properly initialized`
                ),
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

        const success = await abstractInitializer(initialize.name, this.field, (e) => {
            e.styler.update(
                'required',
                params.descriptor.validationOptions.requiredData?.required === true
            )
            e?.notifier?.observers.subscribe(this.classNames.bind(this))
            e?.notifier?.observers.subscribe(this.getFlagsObject.bind(this))
        })

        if (success) {
            logManager(undefined, 'info', this.dependencyName, 'Initialized')
            this.isInitialized = true
        }
    } catch (e: any) {
        logManager(undefined, 'critical', this.dependencyName, e)
    }
}
