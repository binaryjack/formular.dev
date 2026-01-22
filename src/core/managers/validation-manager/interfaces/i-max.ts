import { IValidationBase } from './i-validation-base'

/**
 * Maximum value validation constraint for numeric fields.
 *
 * Ensures that numeric input does not exceed the specified maximum value.
 */
export interface IMax extends IValidationBase {
    /** Maximum allowed numeric value */
    value: number
}
