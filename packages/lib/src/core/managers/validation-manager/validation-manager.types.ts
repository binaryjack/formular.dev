import { EventsType } from '@core/framework/events/events.types'
import { IFieldError } from '@core/framework/models/errors/i-field-error'
import { IFieldGuide } from '@core/framework/models/errors/i-field-guide'
import { IExtendedInput, IInput } from '@core/input-engine/core/input-base/input-base.types'
import { IInitializableDependency } from '../initialization-manager/initialization-manager.types'

export const SValidationManager = Symbol.for('IValidationManager')

/**
 * Interface for forms that support validation operations.
 *
 * Provides the contract for forms to implement validation capabilities
 * across all their fields.
 */
export interface IValidableForm {
    /** Validates all fields in the form */
    validateAll: () => void
}

/**
 * Command object for triggering validation on a specific form.
 */
export interface IDoValidate {
    /** ID of the form to validate */
    formId: string
}

/**
 * Represents the result of a validation operation on a field.
 *
 * Contains all information about whether validation passed or failed,
 * along with error messages and contextual information.
 */
export interface IValidationResult {
    /** Whether the validation passed (true) or failed (false) */
    state: boolean

    /** Error/validation code identifier */
    code: string

    /** Name of the field that was validated */
    fieldName: string

    /** Events that triggered this validation */
    triggerEventTypes: EventsType[]

    /** Human-readable error message (if validation failed) */
    error?: string

    /** Help/guidance message for the user */
    guide?: string
}

/**
 * Command object for triggering validation on all fields in a form.
 */
export interface IDoValidateAll {
    /** ID of the form to validate completely */
    formId: string
}

/**
 * Aggregated results from validating multiple fields or an entire form.
 */
export interface IValidationResults {
    /** Whether all validations passed */
    isValid: boolean

    /** Individual validation results for each field */
    results?: IValidationResult[]

    /** ID of the form these results belong to */
    formId?: string
}

export const newValidationResults = (
    isValid: boolean,
    results?: IValidationResult[],
    formId?: string
): IValidationResults => {
    return { isValid, results: results ?? [], formId }
}

export const newValidationResult = (
    state: boolean,
    fieldName: string,
    code: string,
    triggerEventTypes: EventsType[],
    error?: string,
    guide?: string
): IValidationResult => {
    return { state, fieldName, code, error, guide, triggerEventTypes }
}

export type IValidationStrategyType = (field: IInput) => IValidationManager

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

/**
 * Central validation manager that coordinates all validation operations.
 *
 * The validation manager maintains a collection of validation strategies and
 * applies them to fields based on trigger events and validation rules.
 * It supports both synchronous and asynchronous validation scenarios.
 */
export interface IValidationManager extends IInitializableDependency {
    /** Constructor function for creating new instances */
    new (): IValidationManager

    /** Array of all registered validation strategies */
    validationStrategies: IValidationMethodStrategy[]

    /** Whether validation is currently in progress */
    isValidating: boolean

    /** Events that will trigger validation (blur, change, input, etc.) */
    triggerKeyWordType: EventsType[]

    /**
     * Registers multiple validation strategies at once
     * @param parsers - Validation strategies to register
     */
    addValidationStrategies: (...parsers: IValidationMethodStrategy[]) => void

    /**
     * Registers a single validation strategy
     * @param parser - Validation strategy to register
     */
    addValidationStrategy: (parser: IValidationMethodStrategy) => void

    /**
     * Sets which events will trigger validation
     * @param mode - Array of event types to use as triggers
     */
    setTriggerKeyWord: (mode: EventsType[]) => void

    /**
     * Validates a single field synchronously
     * @param field - Field to validate
     * @param reset - Whether to reset validation state before validating
     * @returns Array of validation results
     */
    validate: (field: IExtendedInput, reset?: boolean) => IValidationResult[]

    /**
     * Validates a single field asynchronously
     * @param field - Field to validate
     * @param reset - Whether to reset validation state before validating
     * @returns Promise resolving to array of validation results
     */
    validateAsync?: (field: IExtendedInput, reset?: boolean) => Promise<IValidationResult[]>

    /**
     * Validates multiple fields synchronously
     * @param fields - Fields to validate
     * @param reset - Whether to reset validation state before validating
     * @returns Array of validation results for all fields
     */
    validateMany: (fields: IExtendedInput[], reset?: boolean) => IValidationResult[]

    /**
     * Validates multiple fields asynchronously
     * @param fields - Fields to validate
     * @param reset - Whether to reset validation state before validating
     * @returns Promise resolving to array of validation results for all fields
     */
    validateManyAsync?: (fields: IExtendedInput[], reset?: boolean) => Promise<IValidationResult[]>
}

/**
 * Union type representing all possible validation rule combinations.
 *
 * This type allows for type-safe composition of different validation rules
 * while maintaining their specific constraints and error handling.
 */
export type IValidationGeneric =
    | (IValidationBase & IRequired)
    | (IValidationBase & IMax)
    | (IValidationBase & IMin)
    | (IValidationBase & IMaxLength)
    | (IValidationBase & IMinLength)
    | (IValidationBase & IPattern)

/**
 * Base interface for all validation rules.
 *
 * Provides common properties that all validation constraints share,
 * including error and guide message configuration.
 */
export interface IValidationBase {
    /** Optional type identifier for the validation rule */
    type?: string

    /** Error information if validation fails */
    error?: IFieldError

    /** Guidance/help information for the user */
    guide?: IFieldGuide
}

/**
 * Required field validation constraint.
 *
 * Ensures that a field has a non-empty value before the form can be submitted.
 */
export interface IRequired extends IValidationBase {
    /** Whether this field is required (true) or optional (false) */
    value: boolean
}

/**
 * Maximum value validation constraint for numeric fields.
 *
 * Ensures that numeric input does not exceed the specified maximum value.
 */
export interface IMax extends IValidationBase {
    /** Maximum allowed numeric value */
    value: number
}

/**
 * Minimum value validation constraint for numeric fields.
 *
 * Ensures that numeric input meets the specified minimum value requirement.
 */
export interface IMin extends IValidationBase {
    /** Minimum required numeric value */
    value: number
}

/**
 * Maximum length validation constraint for text fields.
 *
 * Ensures that text input does not exceed the specified character limit.
 */
export interface IMaxLength extends IValidationBase {
    /** Maximum allowed number of characters */
    value: number
}

/**
 * Minimum length validation constraint for text fields.
 *
 * Ensures that text input meets the specified minimum character requirement.
 */
export interface IMinLength extends IValidationBase {
    /** Minimum required number of characters */
    value: number
}

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

/** Type representing the keys of ValidationErrorsCodes */
export type ValidationErrorsCodesType = keyof typeof ValidationErrorsCodes

/** Type representing the actual error code values */
export type ValidationErrorsCodesValue = (typeof ValidationErrorsCodes)[ValidationErrorsCodesType]
