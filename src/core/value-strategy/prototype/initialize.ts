import { IFieldInitializationParameters } from '@core/factory/builder/field-builder'
import { abstractInitializer } from '@core/fields/field-base-input/abstract/abstract-initializer'
import { logManager } from '@core/general-logging-manager/log-manager'
import { IValueStrategy } from '../value-strategy.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = async function (
    this: IValueStrategy,
    params: IFieldInitializationParameters
) {
    try {
        const success = await abstractInitializer(this.field, (e) => {
            // Object.setPrototypeOf(ValueStrategy.prototype, FieldInput.prototype)
            e.valueStrategy.acceptValueStrategies(...params.valueStrategies)
        })

        if (success) {
            logManager(this.field.tracker, 'info', this.dependencyName, 'Initialized')
            this.isInitialized = true
        }
    } catch (e: any) {
        logManager(this.field.tracker, 'critical', this.dependencyName, e)
    }
}
