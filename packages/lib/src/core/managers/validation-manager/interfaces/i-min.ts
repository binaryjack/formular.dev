import { IValidationBase } from './i-validation-base'

/**
 * Minimum value validation constraint for numeric fields.
 *
 * Ensures that numeric input meets the specified minimum value requirement.
 */
export interface IMin extends IValidationBase {
    /** Minimum required numeric value */
    value: number
}
