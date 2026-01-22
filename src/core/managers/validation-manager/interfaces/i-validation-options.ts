import { IMax } from './i-max'
import { IMaxLength } from './i-max-length'
import { IMin } from './i-min'
import { IMinLength } from './i-min-length'
import { IPattern } from './i-pattern'
import { IRequired } from './i-required'

/**
 * Complete validation configuration for a field.
 *
 * Combines all possible validation constraints that can be applied to a field.
 * Fields can have multiple validation rules applied simultaneously.
 *
 * @example
 * ```typescript
 * const passwordValidation: IValidationOptions = {
 *   required: { value: true },
 *   minLength: { value: 8 },
 *   maxLength: { value: 128 },
 *   pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/ }
 * };
 * ```
 */
export interface IValidationOptions {
    /** Required field validation */
    required?: IRequired

    /** Minimum numeric value validation */
    min?: IMin

    /** Maximum numeric value validation */
    max?: IMax

    /** Minimum text length validation */
    minLength?: IMinLength

    /** Maximum text length validation */
    maxLength?: IMaxLength

    /** Regular expression pattern validation */
    pattern?: IPattern
}
