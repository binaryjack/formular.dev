import { IFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import { preExceptionHandler } from '@core/tracker/pre-exception-handler/pre-exception-handler'
import { IOptionBaseInput } from '../option-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: IOptionBaseInput, fieldInput: IFieldInput) {
    try {
        this._field = fieldInput

        this.options = []
        this.optionsInitialized = false
        this.selectedOptionId = null

        /** to move to specifics */
    } catch (e: any) {
        preExceptionHandler(
            undefined,
            'critical',
            initialize.name,
            `an error has occured when initializing ${this.name} class: ${e.message}`
        )
    }
}
