import {
    InputClassStatesNamesType,
    InputClassStatesValuesEnum
} from '@core/framework/common/common.input.state.types'
import { IExtendedInputBase } from '@core/input-engine/core/input-base/input-base.types'

export const SStyleManager = Symbol.for('IStyleManager')

export const defaultFieldInputCSSClassName = 'f-input'

/**
 * Interface representing the state flags for form field styling.
 *
 * These flags control the visual appearance and CSS classes applied to form fields
 * based on their current state and user interactions.
 */
export interface IFieldStateFlags {
    /** Whether the field value has been modified by the user */
    dirty: boolean
    /** Whether the field has validation errors */
    errors: boolean
    /** Whether the field currently has focus */
    focus: boolean
    /** Whether the field's dropdown/drawer is open (for select, date picker, etc.) */
    open: boolean
    /** Whether the field value is in its original, unmodified state */
    pristine: boolean
    /** Whether the field value passes all validation rules */
    valid: boolean
    /** Whether the field is required for form submission */
    required: boolean
    /** Whether the field is in a loading/processing state */
    busy: boolean
}

/**
 * Default state flags for form fields.
 *
 * These represent the initial state of a field before any user interaction.
 */
export const defaultFieldStateFlags: IFieldStateFlags = {
    dirty: false,
    errors: false,
    focus: false,
    open: false,
    pristine: true,
    valid: true,
    required: false,
    busy: false
}

/**
 * Interface for field styling properties managed by the StyleManager.
 */
export interface IFieldStyleProperties {
    /** The complete CSS class name string for the field */
    className: string
    /** Map of state-based CSS classes for dynamic styling */
    classesList: Map<InputClassStatesNamesType, InputClassStatesValuesEnum>
}

/**
 * Main interface for the StyleManager that handles dynamic CSS class management for form fields.
 *
 * The StyleManager provides:
 * - Dynamic CSS class application based on field state
 * - State flag management for visual feedback
 * - Integration with field validation and interaction states
 * - Consistent styling across all field types
 * - Performance-optimized class name generation
 *
 * The StyleManager automatically updates field appearance based on:
 * - User interactions (focus, blur, input)
 * - Validation results (valid, invalid, errors)
 * - Field state changes (dirty, pristine, required)
 * - Loading states (busy, processing)
 *
 * @example
 * ```typescript
 * // StyleManager is typically used internally by field components
 * const styleManager = field.styleManager;
 *
 * // Update field state
 * styleManager.update('dirty', true);
 * styleManager.update('valid', false);
 *
 * // Get current CSS classes
 * const cssClasses = styleManager.classNames(); // "f-input dirty invalid"
 *
 * // Get state flags for conditional rendering
 * const flags = styleManager.getFlagsObject();
 * if (flags.errors) {
 *   // Show error message
 * }
 * ```
 */
export interface IStyleManager extends IFieldStyleProperties, IExtendedInputBase {
    /**
     * Constructor for creating a new StyleManager instance
     */
    new (): IStyleManager

    /**
     * Updates a specific field state flag and regenerates CSS classes
     * @param type - The type of state to update (dirty, valid, focus, etc.)
     * @param state - The new boolean state value
     */
    update: (type: InputClassStatesNamesType, state: boolean) => void

    /**
     * Gets the CSS class name for a specific state
     * @param state - The state type to get the class for
     * @returns The CSS class name for the specified state
     */
    get: (state: InputClassStatesNamesType) => string

    /**
     * Gets an array of all field state flags
     * @returns Array of field state flag objects
     */
    getFlagsList: () => IFieldStateFlags[]

    /**
     * Gets the current field state flags as a single object
     * @returns Object containing all current field state flags
     */
    getFlagsObject: () => IFieldStateFlags

    /**
     * Generates the complete CSS class name string for the field
     * @returns Space-separated string of CSS class names based on current state
     */
    classNames: () => string

    // Extension methods for modular functionality
    extend?: (extensionName: string, extension: Record<string, any>) => void
    hasExtension?: (extensionName: string) => boolean
    extensions?: Map<string, Record<string, any>>
}
