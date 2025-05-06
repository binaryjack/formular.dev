import { initializer } from '@core/fields/field-base-input/initializers/initializer'
import { IValueStrategy } from '../value-strategy.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: IValueStrategy) {
    initializer(initialize.name, this, this.field)
}
