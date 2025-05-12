import { IFieldInitializationParameters } from '@core/input-engine/generator/builder/field-builder'

import { abstractInitializer } from '@core/input-engine/core/abstract/abstract-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IValueManager } from '../value-manager.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = async function (
    this: IValueManager,
    params: IFieldInitializationParameters
) {
    try {
        const success = await abstractInitializer(this.input, (e) => {
            // Object.setPrototypeOf(ValueStrategy.prototype, FieldInput.prototype)
            e.vlaueManager.acceptValueStrategies(...params.valueStrategies)
        })

        if (success) {
            logManager(this.input.trackingManager, 'info', this.dependencyName, 'Initialized')
            this.isInitialized = true
        }
    } catch (e: any) {
        logManager(this.input.trackingManager, 'critical', this.dependencyName, e)
    }
}
