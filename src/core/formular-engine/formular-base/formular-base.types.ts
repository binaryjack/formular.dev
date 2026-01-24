import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { EventsType } from '@core/framework/events/events.types'
import { IFieldError } from '@core/framework/models/errors/i-field-error'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IFormularManager } from '@core/managers/formular-manager/formular-manager.types'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import {
    IValidableForm,
    IValidationManager
} from '@core/managers/validation-manager/validation-manager.types'
import { LoadingStatus } from '@core/status'

/**
 * Main interface representing a complete form instance with full lifecycle management.
 *
 * This interface combines form management, validation, notifications, and state management
 * into a single cohesive interface. It provides all the functionality needed to create,
 * manage, validate, and submit forms.
 *
 * @template T - The type of the data object this form will produce/manage
 *
 * @example
 * ```typescript
 * interface UserData {
 *   username: string;
 *   email: string;
 * }
 *
 * const userForm: IFormular<UserData> = formManager.createFromSchema(userSchema);
 * const result = await userForm.submit(); // Returns UserData | null
 * ```
 */
export type IFormular<T extends object> = IFormularBase<T> &
    INotificationManager &
    IFormularFlags &
    IValidationManager &
    IValidableForm

/**
 * Form state flags and status management interface.
 *
 * Provides properties and methods to track the current state of a form,
 * including loading status, validation state, and whether the form has been modified.
 */
export interface IFormularFlags {
    /** Whether the form is currently in a busy/loading state */
    isBusy: boolean

    /** Whether the form has been modified from its original state */
    isDirty: boolean

    /**
     * Whether the form is currently valid (all validation rules pass)
     *
     * @remarks
     * Originally this should be in IValidable, but because IFieldDescriptor
     * already has one, we assume this info belongs to the entity itself.
     * This is not ideal but provides clarity.
     */
    isValid: boolean

    /**
     * Sets the busy/loading status of the form
     * @param status - The new loading status to set
     */
    setIsBusy: (status: LoadingStatus) => void
}

/**
 * Core form management interface defining the fundamental operations and properties of a form.
 *
 * This interface provides the foundational structure for form instances, including
 * field management, validation, submission, and state tracking. All form instances
 * implement this interface to ensure consistent behavior across the system.
 *
 * @template T - The type of data this form manages and returns upon submission
 */
export interface IFormularBase<T extends object> {
    /**
     * Constructor for creating a new form instance
     * @param id - Unique identifier for this form
     * @param manager - The form manager that owns this form
     */
    new (id: string, manager: IFormularManager): IFormular<T>

    /** Unique identifier for this form instance */
    readonly id: string

    /** Array of all fields currently in this form */
    fields: IExtendedInput[]

    /** Original field configurations (for reset/comparison purposes) */
    originFields: IExtendedInput[]

    /** Internal loading status tracking */
    _loadingStatus: LoadingStatus

    /** Whether the form has been modified from its original state */
    isDirty: boolean

    /** Number of times this form has been submitted */
    submitCount: number

    /** Whether validation should run on the first submit attempt */
    validateOnFirstSubmit: boolean

    /** Whether this form instance is bound to a data source */
    isFormularBinded: boolean

    /** Reference to the form manager that created this form */
    readonly manager: IFormularManager

    /** Reference to the notification manager for this form */
    readonly notificationManager?: INotificationManager

    /**
     * Validates all fields in the form and returns the overall validity state
     * @returns Promise that resolves to true if all fields are valid
     */
    checkAllFieldsAreValid: () => Promise<boolean>

    /**
     * Adds one or more fields to this form
     * @param flds - Fields to add to the form
     */
    addFields: (...flds: IExtendedInput[]) => void

    /**
     * Retrieves a specific field by its name
     * @param fieldName - Name of the field to retrieve
     * @returns The field instance or undefined if not found
     */
    getField: (fieldName: string) => IExtendedInput | undefined

    /**
     * Checks for changes in form data and updates dirty state
     */
    checkChanges: () => void

    /**
     * Validates and submits the form
     * @returns Promise that resolves to the form data if valid, or null if invalid
     */
    submit: () => Promise<T | null>

    /**
     * Sets the loading/busy status of the form
     * @param status - The loading status to set
     */
    setIsBusy: (status: LoadingStatus) => void

    /**
     * Registers a callback to be called when the form data changes
     * @param callback - Function to call when changes are detected
     */
    hasChanges: (callback: () => void) => void

    /**
     * Gets the current form state flags
     * @returns Object containing form state information
     */
    getFormFlags: () => Partial<IFormularFlags>

    /**
     * Extracts current form data as key-value pairs
     * @returns Object containing all field names and their current values
     */
    getData: () => Record<string, InputDataTypes>

    /**
     * Sets the event types that will trigger validation
     * @param mode - Array of event types to use as validation triggers
     */
    setTriggerKeyWord: (mode: EventsType[]) => void

    /**
     * Cleans up all resources associated with this form instance

    /**
     * Parses and populates form fields with data
     * @param data - Data object to populate the form with
     */
    parse: (data: T) => void

    /**
     * Clears all form data and resets to initial state
     */
    clear: () => void

    /**
     * Validates all fields in the form
     * @returns Promise resolving to true if all fields are valid
     */
    validateForm: () => Promise<boolean>

    /**
     * Pre-validates a specific field
     * @param fieldName - Name of the field to pre-validate
     * @returns True if the field passes pre-validation
     */
    preValidateField: (fieldName: string) => boolean

    /**
     * Updates a specific field's value
     * @param fieldName - Name of the field to update
     * @param value - New value for the field
     */
    updateField: (fieldName: string, value: InputDataTypes) => void

    /**
     * Clears a specific field
     * @param fieldName - Name of the field to clear
     */
    clearField: (fieldName: string) => void

    /**
     * Resets the form to its original state
     */
    reset: () => void

    /**
     * Validates a specific field
     * @param fieldName - Name of the field to validate
     */
    validateField: (fieldName: string) => void

    /**
     * Gets all form validation errors
     * @returns Object mapping field names to their error arrays
     */
    getErrors: () => Record<string, IFieldError[]>

    /**
     * Disposes all fields, clears references, and prepares for garbage collection
     */
    dispose: () => void
}

/**
 * Represents a change event for a specific field in a form.
 *
 * Used to track which fields have been modified and notify observers
 * of field-level changes within the form.
 */
export interface IFieldChange {
    /** Name of the field that changed */
    name: string

    /** Whether the field has pending changes */
    hasChanges: boolean
}
