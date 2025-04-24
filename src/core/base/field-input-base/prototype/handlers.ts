import validator from '../../validatiors/validator.strategy'
import { IValidationOrigin } from '../../validatiors/validator.types'
import { IFieldInput } from '../field-input.types'

/**
 * Handles the change event for a field input.
 *
 * @this IFieldInput - The context of the field input instance.
 * @param data - Optional parameter representing the new data or value associated with the change event.
 *
 * Logs the updated value and the provided data to the console.
 */
export const handleOnChanged = function (this: IFieldInput, data?: any) {
    // console.log('value changed', data, this.value)

    const validationOrigin = data as IValidationOrigin
    this.validate(validator, validationOrigin)
}
/**
 * Handles the click event for a field input.
 *
 * @param this - The context of the field input implementing the `IFieldInput` interface.
 * @param data - Optional data associated with the click event.
 *
 * Logs the clicked value, the provided data, and the current value of the field input.
 */
export const handleOnClicked = function (this: IFieldInput, data?: any) {
    console.log('value clicked', data, this.value)
    this.internalInfo(
        'IFieldInput.handleOnClicked',
        `value clicked: ${this.type}, value: ${this.value} `
    )
    const validationOrigin = data as IValidationOrigin
    this.validate(validator, validationOrigin)
}

/**
 * Handles the event when a value is selected.
 *
 * @this IFieldInput - The context in which this function is executed.
 * @param data - Optional parameter representing the selected data.
 * Logs the selected value, the provided data, and the current value of the field input.
 */
export const handleOnSelected = function (this: IFieldInput, data?: any) {
    this.internalInfo(
        'IFieldInput.handleOnSelected',
        `value clicked: ${this.type}, value: ${this.value} `
    )
    const validationOrigin = data as IValidationOrigin
    this.validate(validator, validationOrigin)
}

/**
 * Handles the blur event for a field input.
 *
 * @this IFieldInput - The context of the field input instance.
 * @param data - Optional additional data associated with the blur event.
 * Logs the blur event, the provided data, and the current value of the field input.
 */
export const handleOnBlur = function (this: IFieldInput, data?: any) {
    this.internalInfo('IFieldInput.handleOnBlur', `value clicked: ${this.type}, data: ${data} `)
    const validationOrigin = data as IValidationOrigin
    this.validate(validator, validationOrigin)
}

/**
 * Handles the focus event for a field input.
 *
 * @this IFieldInput - The context of the field input instance.
 * @param data - Optional data associated with the focus event.
 * Logs the focus event details, including the optional data and the current value of the field input.
 */
export const handleOnFocus = function (this: IFieldInput, data?: any) {
    this.internalInfo('IFieldInput.handleOnFocus', `value clicked: ${this.type}, data: ${data} `)
    const validationOrigin = data as IValidationOrigin
    this.validate(validator, validationOrigin)
}

/**
 * Handles the validation process for a field input.
 *
 * @param this - The current instance of the field input implementing the `IFieldInput` interface.
 * @param origin - Optional parameter representing the origin of the validation, which is cast to `IValidationOrigin`.
 *
 * @remarks
 * This function invokes the `validate` method on the current instance, passing a `validator` and the
 * optional `validationOrigin` derived from the `origin` parameter.
 */
export const handleValidation = function (this: IFieldInput, origin?: any) {
    const validationOrigin = origin as IValidationOrigin
    this.validate(validator, validationOrigin)
}
