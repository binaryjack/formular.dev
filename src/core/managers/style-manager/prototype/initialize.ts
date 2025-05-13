import { IFieldInitializationParameters } from '@core/input-engine/generator/builder/field-builder'

import { InputStateType } from '@core/framework/common/common.input.state.types'
import { ExceptionManager, newAssert } from '@core/framework/exceptions/exception-manager'

import { abstractInitializer } from '@core/input-engine/core/abstract/abstract-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IStyleManager } from '../style-manager.types'

export const initialize = async function (
    this: IStyleManager,
    params: IFieldInitializationParameters
) {
    try {
        const em = new ExceptionManager(
            ...[newAssert(this.input !== undefined, `The dependency field is not instanciated`)]
        )
        em.process()
        if (em.hasErrors()) {
            logManager(undefined, 'critical', 'initialize', em.toString())
        }

        const success = await abstractInitializer(this.input, (e) => {
            e?.notificationManager?.observers.subscribe(this.classNames.bind(this))
            e?.notificationManager?.observers.subscribe(this.getFlagsObject.bind(this))

            e.styleManager.className = ''
            e.styleManager.classesList = new Map<InputStateType, string>([
                ['dirty', 'is-not-dirty'],
                ['errors', 'no-errors'],
                ['focus', 'is-not-focus'],
                ['open', 'is-closed'],
                ['pristine', 'is-pristine'],
                ['valid', 'is-valid'],
                ['required', 'required']
            ])

            e?.styleManager.update(
                'required',
                params.descriptor.validationOptions.requiredData?.required === true
            )

            // Extend the prototype of FieldStateStyle with FieldInput's prototype
            // Object.setPrototypeOf(FieldStateStyle.prototype, FieldInput.prototype)
        })

        if (success) {
            logManager(this.input.trackingManager, 'info', this.dependencyName, 'Initialized')
            this.isInitialized = true
        }
    } catch (e: any) {
        logManager(this.input.trackingManager, 'critical', this.dependencyName, e)
    }
}
