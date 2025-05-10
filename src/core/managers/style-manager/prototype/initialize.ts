import { IFieldInitializationParameters } from '@core/field-engine/generator/builder/field-builder'

import { FieldInputStateType } from '@core/framework/common/common.input.state.types'
import { ExceptionManager, newAssert } from '@core/framework/exceptions/exception-manager'

import { abstractInitializer } from '@core/field-engine/core/input-base/abstract/abstract-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IStyleManager } from '../style-manager.types'

export const initialize = async function (
    this: IStyleManager,
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
            e.styleManager.className = ''
            e.styleManager.classesList = new Map<FieldInputStateType, string>([
                ['dirty', 'is-not-dirty'],
                ['errors', 'no-errors'],
                ['focus', 'is-not-focus'],
                ['open', 'is-closed'],
                ['pristine', 'is-pristine'],
                ['valid', 'is-valid'],
                ['required', 'required']
            ])

            e.styleManager.update(
                'required',
                params.descriptor.validationOptions.requiredData?.required === true
            )

            e?.notificationManager?.observers.subscribe(this.classNames.bind(this))
            e?.notificationManager?.observers.subscribe(this.getFlagsObject.bind(this))

            // Extend the prototype of FieldStateStyle with FieldInput's prototype
            // Object.setPrototypeOf(FieldStateStyle.prototype, FieldInput.prototype)
        })

        if (success) {
            logManager(this.field.trackingManager, 'info', this.dependencyName, 'Initialized')
            this.isInitialized = true
        }
    } catch (e: any) {
        logManager(this.field.trackingManager, 'critical', this.dependencyName, e)
    }
}
