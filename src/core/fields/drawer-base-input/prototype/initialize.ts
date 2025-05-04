import { IFieldInputExtended } from '@core/fields/field-base-input/field-input-base-types'
import { initializer } from '@core/fields/field-base-input/initializers/initializer'
import { IDrawerBaseInput } from '../drawer-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: IDrawerBaseInput, fieldInput: IFieldInputExtended) {
    initializer(initialize.name, this, fieldInput, [])
}
