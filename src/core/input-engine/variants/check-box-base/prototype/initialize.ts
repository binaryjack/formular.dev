import { IFieldInitializationParameters } from '@core/input-engine/generator/builder/field-builder'

import { abstractInitializer } from '@core/input-engine/core/abstract/abstract-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { notification } from '@core/managers/notification-manager/utils/new-notification-visitor'
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
            [notification(this, this.handleOnChanged, 'onChange', 'onChange', this.name)]
        )

        if (success) {
            logManager(this.input.trackingManager, 'info', this.dependencyName, 'Initialized')
            this.isInitialized = true
        }
    } catch (e: any) {
        logManager(this.input.trackingManager, 'critical', this.dependencyName, e)
    }
}
