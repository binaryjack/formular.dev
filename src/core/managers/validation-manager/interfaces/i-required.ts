import { IValidationBase } from './i-validation-base'

/**
 * Required field validation constraint.
 *
 * Ensures that a field has a non-empty value before the form can be submitted.
 */
export interface IRequired extends IValidationBase {
    /** Whether this field is required (true) or optional (false) */
    value: boolean
}
