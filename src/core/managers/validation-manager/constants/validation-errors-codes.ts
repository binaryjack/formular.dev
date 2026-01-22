/**
 * Standard validation error codes used throughout the system.
 *
 * These codes provide consistent error identification across all validation
 * scenarios and can be used for internationalization and custom error handling.
 *
 * @example
 * ```typescript
 * // Using error codes in custom validators
 * if (value < minValue) {
 *   return newValidationResult(
 *     false,
 *     fieldName,
 *     ValidationErrorsCodes.min,
 *     triggerEvents,
 *     'Value is too small'
 *   );
 * }
 * ```
 */
export const ValidationErrorsCodes = {
    /** Numeric value is below minimum threshold */
    min: 'MIN_ERROR',

    /** Numeric value exceeds maximum threshold */
    max: 'MAX_ERROR',

    /** Text length is below minimum requirement */
    minLength: 'MIN_LENGTH_ERROR',

    /** Text length exceeds maximum limit */
    maxLength: 'MAX_LENGTH_ERROR',

    /** Required field is empty or missing */
    required: 'REQUIRED',

    /** Input doesn't match required pattern/format */
    pattern: 'PATTERN',

    /** Custom validation rule failed */
    custom: 'CUSTOM'
}
