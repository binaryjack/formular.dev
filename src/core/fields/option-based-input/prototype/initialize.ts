import { initializer } from '@core/fields/field-base-input/initializers/initializer'
import { IOptionBaseInput } from '../option-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: IOptionBaseInput) {
    initializer(initialize.name, this, this.field, [], (context) => {
        context.options = []
        context.optionsInitialized = false
        context.selectedOptionId = null
    })
}
