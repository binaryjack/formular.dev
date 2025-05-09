import { IFieldInitializationParameters } from '@core/factory/builder/field-builder'
import { abstractInitializer } from '@core/fields/field-base-input/abstract/abstract-initializer'
import { FieldInputStateType } from '@core/framework/common/common.input.state.types'
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
                newAssert(this.field !== undefined, `The dependency field is not instanciated`),
                newAssert(
                    params.descriptor?.options?.length > 0,
                    `${this.dependencyName}: None options were provided. this feature will not work properly`
                )
            ]
        )
        em.process()
        if (em.hasErrors()) {
            logManager(undefined, 'critical', 'initialize', em.toString())
        }

        const success = await abstractInitializer(this.field, (e) => {
            e.styler.className = ''
            e.styler.classesList = new Map<FieldInputStateType, string>([
                ['dirty', 'is-not-dirty'],
                ['errors', 'no-errors'],
                ['focus', 'is-not-focus'],
                ['open', 'is-closed'],
                ['pristine', 'is-pristine'],
                ['valid', 'is-valid'],
                ['required', 'required']
            ])

            e.styler.update(
                'required',
                params.descriptor.validationOptions.requiredData?.required === true
            )

            e?.notifier?.observers.subscribe(this.classNames.bind(this))
            e?.notifier?.observers.subscribe(this.getFlagsObject.bind(this))

            // Extend the prototype of FieldStateStyle with FieldInput's prototype
            // Object.setPrototypeOf(FieldStateStyle.prototype, FieldInput.prototype)
        })

        if (success) {
            logManager(this.field.tracker, 'info', this.dependencyName, 'Initialized')
            this.isInitialized = true
        }
    } catch (e: any) {
        logManager(this.field.tracker, 'critical', this.dependencyName, e)
    }
}
