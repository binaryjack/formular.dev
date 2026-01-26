import { abstractInitializer } from '@core/input-engine/core/abstract/abstract-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { notification } from '@core/managers/notification-manager/utils/new-notification-visitor'
import { IClickBaseInput } from '../click-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = async function (this: IClickBaseInput) {
    try {
        const success = await abstractInitializer(this.input, () => {}, [
            notification(this, this.onClickHandle, 'onClick', 'onClick', this.name)
        ])

        if (success) {
            // Object.setPrototypeOf(ClickBaseInput.prototype, FieldInput.prototype)
            this.isInitialized = true
        }
    } catch (e: any) {
        logManager(this.input.trackingManager, 'critical', this.dependencyName, e)
    }
}
