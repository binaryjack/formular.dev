import { IFieldInitializationParameters } from '@core/factory/builder/field-builder'
import { abstractInitializer } from '@core/fields/field-base-input/abstract/abstract-initializer'
import { logManager } from '@core/general-logging-manager/log-manager'
import { IValueStrategy } from '../value-strategy.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: IValueStrategy, params: IFieldInitializationParameters) {
    abstractInitializer(initialize.name, this.field, (e) => {
        logManager(undefined, 'info', 'initialize', e.dependencyName)
        e.acceptValueStrategies(...params.valueStrategies)
    })
}
