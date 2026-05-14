import { ExceptionManager, newAssert } from '@core/framework/exceptions/exception-manager'
import { abstractInitializer } from '@core/input-engine/core/abstract/abstract-initializer'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { logManager } from '@core/managers/log-manager/log-manager'
import { notification } from '@core/managers/notification-manager/utils/new-notification-visitor'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = async function (this: IExtendedInput) {
    try {
        const success = await abstractInitializer(this.input, () => {}, [
            notification(this, this.handleOnChanged, 'onChange', 'onChange', this.name),
            notification(this, this.handleOnClear, 'onClear', 'onClear', this.name)
        ])

        if (success) {
            const em = new ExceptionManager(
                ...[
                    newAssert(this.input !== undefined, `The dependency field is not instanciated`),
                    newAssert(
                        this.input.isInitialized,
                        `${this.dependencyName}: The dependency field is not properly initialized`
                    )
                ]
            )
            em.process()
            if (em.hasErrors()) {
                logManager(undefined, 'critical', 'initialize', em.toString())
            } else {
                this.isInitialized = true
            }
        }
    } catch (e: any) {
        logManager(this.input.trackingManager, 'critical', this.dependencyName, e)
    }
}
