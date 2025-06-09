import { ExceptionManager, newAssert } from '@core/framework/exceptions/exception-manager'

import {
    InputClassStatesNamesType,
    InputClassStatesValuesEnum
} from '@core/framework/common/common.input.state.types'
import { abstractInitializer } from '@core/input-engine/core/abstract/abstract-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IStyleManager } from '../style-manager.types'

export const initialize = async function (this: IStyleManager) {
    try {
        const success = await abstractInitializer(this.input, (e) => {
            e?.notificationManager?.observers.subscribe(this.classNames.bind(this), false)
            e?.notificationManager?.observers.subscribe(this.getFlagsObject.bind(this), false)

            e.styleManager.className = ''
            e.styleManager.classesList = new Map<
                InputClassStatesNamesType,
                InputClassStatesValuesEnum
            >([
                ['dirty', InputClassStatesValuesEnum.no_dirty],
                ['errors', InputClassStatesValuesEnum.no_errors],
                ['focus', InputClassStatesValuesEnum.no_focus],
                ['open', InputClassStatesValuesEnum.no_open],
                ['pristine', InputClassStatesValuesEnum.pristine],
                ['valid', InputClassStatesValuesEnum.valid],
                ['required', InputClassStatesValuesEnum.required],
                ['busy', InputClassStatesValuesEnum.no_busy]
            ])

            e?.styleManager.update(
                'required',
                params.descriptor.validationOptions.required?.value === true
            )

            // Extend the prototype of FieldStateStyle with FieldInput's prototype
            // Object.setPrototypeOf(FieldStateStyle.prototype, FieldInput.prototype)
        })

        if (success) {
            const em = new ExceptionManager(
                ...[newAssert(this.input !== undefined, `The dependency field is not instanciated`)]
            )

            em.process()
            if (em.hasErrors()) {
                logManager(undefined, 'critical', 'initialize', em.toString())
            } else {
                logManager(this.input.trackingManager, 'info', this.dependencyName, 'Initialized')
                this.isInitialized = true
            }
        }
    } catch (e: any) {
        logManager(this.input.trackingManager, 'critical', this.dependencyName, e)
    }
}
