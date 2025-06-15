import { EventsType } from '@core/framework/events/events.types'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IInitializableDependency } from '../../initialization-manager/initialization-manager.types'
import { IValidationMethodStrategy } from './i-validation-method-strategy'
import { IValidationResult } from './i-validation-result'

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
