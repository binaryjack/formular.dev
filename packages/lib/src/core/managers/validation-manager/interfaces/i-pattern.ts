import { IValidationBase } from './i-validation-base'

/**
 * Pattern validation constraint using regular expressions.
 *
 * Validates that field input matches the specified regular expression pattern.
 * Commonly used for email, phone number, and custom format validation.
 */
export interface IPattern extends IValidationBase {
    /** Regular expression pattern that input must match */
    value: RegExp
}
