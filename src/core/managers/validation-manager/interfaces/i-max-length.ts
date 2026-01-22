import { IValidationBase } from './i-validation-base'

/**
 * Maximum length validation constraint for text fields.
 *
 * Ensures that text input does not exceed the specified character limit.
 */
export interface IMaxLength extends IValidationBase {
    /** Maximum allowed number of characters */
    value: number
}
