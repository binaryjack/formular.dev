import { IValidationBase } from './i-validation-base'

/**
 * Minimum length validation constraint for text fields.
 *
 * Ensures that text input meets the specified minimum character requirement.
 */
export interface IMinLength extends IValidationBase {
    /** Minimum required number of characters */
    value: number
}
