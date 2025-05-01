import { FieldInput } from '@core/fields/field-base-input/field-input-base'
import { IFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import { IOptionInput } from '../option-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: IOptionInput, fieldInput: IFieldInput) {
    try {
        this.prototype = { ...FieldInput.prototype, ...this.prototype }

        FieldInput.call(this, fieldInput)

        this.options = []
        this.optionsInitialized = false
        this.selectedOptionId = null

        /** to move to specifics */
    } catch (e: any) {
        throw Error(
            `${initialize.name} - an error has occured when initializing ${this.name} class: ${e.message}`
        )
    }
}
