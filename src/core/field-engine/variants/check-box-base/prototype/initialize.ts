import { IFieldInitializationParameters } from '@core/field-engine/generator/builder/field-builder'

import { abstractInitializer } from '@core/field-engine/core/abstract/abstract-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { eventNotifVisitor } from '@core/managers/notification-manager/utils/new-notification-visitor'
import { ICheckBoxBaseInput } from '../check-box-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = async function (
    this: ICheckBoxBaseInput,
    params: IFieldInitializationParameters
) {
    try {
        const success = await abstractInitializer(
            this.input,
            (e) => {
                logManager(undefined, 'info', 'initialize', e.name)
                this.checked = undefined
            },
            [eventNotifVisitor(this, this.handleOnChanged, 'onChange')]
        )

        if (success) {
            logManager(this.input.trackingManager, 'info', this.dependencyName, 'Initialized')
            this.isInitialized = true
        }
    } catch (e: any) {
        logManager(this.input.trackingManager, 'critical', this.dependencyName, e)
    }
}
