import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValidationResult } from './i-validation-result'

/**
 * Interface for implementing custom validation strategies.
 *
 * Validation strategies define how specific validation rules are applied to fields.
 * Each strategy can implement both synchronous and asynchronous validation logic.
 *
 * @example
 * ```typescript
 * const emailValidator: IValidationMethodStrategy = {
 *   name: 'EmailValidator',
 *   validate: (field) => {
 *     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 *     const isValid = emailRegex.test(field.input.value as string);
 *     return newValidationResult(
 *       isValid,
 *       field.input.name,
 *       'EMAIL_VALIDATION',
 *       field.input.validationManager.triggerKeyWordType
 *     );
 *   },
 *   validateAsync: async (field) => {
 *     // Async validation logic (e.g., server-side email check)
 *     return Promise.resolve(this.validate(field));
 *   }
 * };
 * ```
 */
export interface IValidationMethodStrategy {
    /** Constructor function for creating new instances */
    new (): IValidationMethodStrategy

    /** Unique name identifier for this validation strategy */
    name: string

    /**
     * Performs synchronous validation on a field
     * @param field - The field to validate
     * @returns Validation result indicating success/failure
     */
    validate: (field: IExtendedInput) => IValidationResult

    /**
     * Performs asynchronous validation on a field
     * @param field - The field to validate
     * @returns Promise resolving to validation result
     */
    validateAsync: (field: IExtendedInput) => Promise<IValidationResult>
}
