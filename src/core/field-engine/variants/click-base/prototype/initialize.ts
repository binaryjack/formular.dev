import { IFieldInitializationParameters } from '@core/field-engine/generator/builder/field-builder'

import { abstractInitializer } from '@core/field-engine/core/input-base/abstract/abstract-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { eventNotifVisitor } from '@core/managers/notification-manager/utils/new-notification-visitor'
import { IClickBaseInput } from '../click-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = async function (
    this: IClickBaseInput,
    params: IFieldInitializationParameters
) {
    try {
        const success = await abstractInitializer(
            this.field,
            (e) => {
                logManager(undefined, 'info', 'initialize', e.name)
            },
            [eventNotifVisitor(this, this.handleOnClicked, 'onClick')]
        )

        if (success) {
            logManager(this.field.trackingManager, 'info', this.dependencyName, 'Initialized')
            // Object.setPrototypeOf(ClickBaseInput.prototype, FieldInput.prototype)
            this.isInitialized = true
        }
    } catch (e: any) {
        logManager(this.field.trackingManager, 'critical', this.dependencyName, e)
    }
}
