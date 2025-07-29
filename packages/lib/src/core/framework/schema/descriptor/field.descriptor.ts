import { InputTypeNames } from '@core/framework/common/common.input.types'

import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { IFieldError } from '@core/framework/models/errors/i-field-error'
import { IFieldGuide } from '@core/framework/models/errors/i-field-guide'
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { INDate } from '../../types/date/i-n-date'
import { IOptionItem } from '../option-schema/options.scheme.types'

export const SFieldDescriptor = Symbol.for('IFieldDescriptor')

/**
 * Field Descriptor - The foundation interface of FORMULAR
 *
 * This interface represents the complete definition of a form field, including its data,
 * validation rules, state, and behavior. It serves as the primary building block for
 * all form fields in the FORMULAR system.
 *
 * A field descriptor contains all the information needed to:
 * - Render the field in the UI
 * - Validate user input
 * - Track field state and changes
 * - Handle user interactions
 * - Manage field options and configuration
 *
 * @example
 * ```typescript
 * const usernameField: IFieldDescriptor = {
 *   id: 1,
 *   name: 'username',
 *   label: 'Username',
 *   type: 'text',
 *   value: '',
 *   defaultValue: '',
 *   validationOptions: {
 *     required: { value: true },
 *     minLength: { value: 3 },
 *     maxLength: { value: 50 }
 *   },
 *   shouldValidate: true,
 *   isValid: false,
 *   isDirty: false,
 *   isPristine: true,
 *   isFocus: false,
 *   errors: [],
 *   guides: [],
 *   options: []
 * }
 * ```
 */
export interface IFieldDescriptor {
    /** Unique numeric identifier for this field */
    id: number

    /** Unique string name/key for this field (used for form data) */
    name: string

    /** Display label for this field (shown in UI) */
    label: string

    /** Current value of the field */
    value: InputDataTypes

    /** Complex object value (for date/time fields and similar) */
    objectValue: INDate | null

    /** Default value for this field (used for reset operations) */
    defaultValue: InputDataTypes

    /** Type of input control ('text', 'email', 'select', etc.) */
    type: InputTypeNames

    /** Array of current validation errors for this field */
    errors: IFieldError[]

    /** Array of help/guide messages for this field */
    guides: IFieldGuide[]

    /** Validation rules configuration (required, min, max, pattern, etc.) */
    validationOptions: IValidationOptions

    /** Target element ID or selector (for linked fields) */
    target?: string

    /** Available options for select/radio/checkbox fields */
    options: IOptionItem[]

    /** Whether this field currently passes all validation rules */
    isValid: boolean

    /** Whether this field has been modified from its default value */
    isDirty: boolean

    /** Whether this field is in its original, unmodified state */
    isPristine: boolean

    /** Whether this field currently has focus */
    isFocus: boolean

    /** Expected value for testing/validation purposes */
    expectedValue?: InputDataTypes

    /** Whether this field has been loaded/initialized */
    loaded?: boolean

    /** Whether this field has been changed since last check */
    changed?: boolean

    /**
     * Whether this field should be validated
     *
     * @remarks
     * This is typically defined by backend/schema configuration and determines
     * if validation rules should be applied to this field.
     */
    shouldValidate: boolean

    /**
     * Input mask pattern for formatting (optional)
     *
     * Use '#' as numeric placeholder. Examples:
     * - Date: "##/##/####" → "12/25/2023"
     * - Phone: "(###) ###-####" → "(555) 123-4567"
     * - SSN: "###-##-####" → "123-45-6789"
     */
    mask?: string
}

export type TFieldDescriptor = {
    [key in keyof IFieldDescriptor]: string
}
