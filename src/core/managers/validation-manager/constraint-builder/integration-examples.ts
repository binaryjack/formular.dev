/**
 * FORMULAR INTEGRATION EXAMPLE
 * 
 * This example demonstrates the complete integration pattern for Formular,
 * showing how field descriptors and validation constraints work together
 * to create type-safe, declarative form definitions.
 */

import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import {
    ValidationConstraintFactory,
    createValidationConstraints,
    ValidationPresets,
    ValidationConfig
} from '@core/managers/validation-manager/constraint-builder/validation-constraint-factory'

// ============================================================================
// APPROACH 1: Fluent Factory API
// ============================================================================

/**
 * Using the fluent ValidationConstraintFactory API
 * Best for: Complex, programmatic validation logic
 */
export function createUserFieldWithFluentValidation(): IFieldDescriptor {
    const validationFactory = new ValidationConstraintFactory()

    const constraints = validationFactory
        .required(true, 'Username is required', 'Please enter a username')
        .minLength(3, 'Username must be at least 3 characters')
        .maxLength(50, 'Username cannot exceed 50 characters')
        .pattern(
            /^[a-zA-Z0-9_-]+$/,
            'Username can only contain letters, numbers, _ and -'
        )
        .build()

    return {
        id: 1,
        name: 'username',
        label: 'Username',
        type: 'text',
        value: '',
        defaultValue: '',
        validationOptions: {
            // The constraints would be processed here
            required: { value: true },
            minLength: { value: 3 },
            maxLength: { value: 50 },
            pattern: { value: /^[a-zA-Z0-9_-]+$/ }
        },
        shouldValidate: true,
        isValid: false,
        isDirty: false,
        isPristine: true,
        isFocus: false,
        errors: [],
        guides: [],
        options: []
    } as IFieldDescriptor
}

// ============================================================================
// APPROACH 2: Configuration Object API
// ============================================================================

/**
 * Using the createValidationConstraints helper with config object
 * Best for: Simple, declarative validation rules
 */
export function createEmailFieldWithConfigValidation(): IFieldDescriptor {
    const validationConfig: ValidationConfig = {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        maxLength: 150
    }

    const constraints = createValidationConstraints(validationConfig, 'email')

    return {
        id: 2,
        name: 'email',
        label: 'Email Address',
        type: 'email',
        value: '',
        defaultValue: '',
        validationOptions: {
            required: { value: true },
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
            maxLength: { value: 150 }
        },
        shouldValidate: true,
        isValid: false,
        isDirty: false,
        isPristine: true,
        isFocus: false,
        errors: [],
        guides: [],
        options: []
    } as IFieldDescriptor
}

// ============================================================================
// APPROACH 3: Validation Presets
// ============================================================================

/**
 * Using ValidationPresets for common validation patterns
 * Best for: Standard field types with predefined validation
 */
export function createFieldsWithPresets() {
    // Email field with preset
    const emailConfig = ValidationPresets.email(true)
    const emailConstraints = createValidationConstraints(emailConfig, 'email')

    // Password field with preset
    const passwordConfig = ValidationPresets.password(true)
    const passwordConstraints = createValidationConstraints(passwordConfig, 'password')

    // Age field with numeric range preset
    const ageConfig = ValidationPresets.numericRange(18, 120, true)
    const ageConstraints = createValidationConstraints(ageConfig, 'age')

    return {
        emailConstraints,
        passwordConstraints,
        ageConstraints
    }
}

// ============================================================================
// APPROACH 4: Type-Safe Field Descriptor Factory
// ============================================================================

/**
 * Complete field descriptor factory with integrated validation
 */
export interface FieldConfig<T = any> {
    id: number
    name: string
    label: string
    type: string
    defaultValue?: T
    validation?: ValidationConfig
    placeholder?: string
}

export function createFieldDescriptor<T = any>(
    config: FieldConfig<T>
): IFieldDescriptor {
    const constraints = config.validation
        ? createValidationConstraints(config.validation, config.name)
        : []

    // Convert constraints to validationOptions format
    const validationOptions: any = {}
    constraints.forEach((constraint) => {
        const built = constraint.build()
        validationOptions[built.type] = { value: built.value }
    })

    return {
        id: config.id,
        name: config.name,
        label: config.label,
        type: config.type as any,
        value: config.defaultValue ?? null,
        defaultValue: config.defaultValue ?? null,
        placeholder: config.placeholder,
        validationOptions,
        shouldValidate: constraints.length > 0,
        isValid: false,
        isDirty: false,
        isPristine: true,
        isFocus: false,
        errors: [],
        guides: [],
        options: []
    } as IFieldDescriptor
}

// ============================================================================
// APPROACH 5: Batch Field Descriptor Creation
// ============================================================================

/**
 * Create multiple field descriptors from a typed configuration
 */
export interface FormFieldsConfig<T extends Record<string, any>> {
    [K in keyof T]: FieldConfig<T[K]>
}

export function createFieldDescriptors<T extends Record<string, any>>(
    config: FormFieldsConfig<T>
): IFieldDescriptor[] {
    return Object.entries(config).map(([_, fieldConfig], index) => {
        return createFieldDescriptor({
            ...fieldConfig as FieldConfig,
            id: fieldConfig.id ?? index
        })
    })
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * Example: User Registration Form
 */
interface UserRegistrationForm {
    username: string
    email: string
    password: string
    confirmPassword: string
    age: number
}

export function createUserRegistrationFields(): IFieldDescriptor[] {
    return createFieldDescriptors<UserRegistrationForm>({
        username: {
            id: 1,
            name: 'username',
            label: 'Username',
            type: 'text',
            placeholder: 'Choose a username',
            validation: ValidationPresets.username(true)
        },
        email: {
            id: 2,
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'your@email.com',
            validation: ValidationPresets.email(true)
        },
        password: {
            id: 3,
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: '••••••••',
            validation: ValidationPresets.password(true)
        },
        confirmPassword: {
            id: 4,
            name: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
            placeholder: '••••••••',
            validation: ValidationPresets.password(true)
        },
        age: {
            id: 5,
            name: 'age',
            label: 'Age',
            type: 'number',
            validation: ValidationPresets.numericRange(18, 120, true)
        }
    })
}

/**
 * Example: Custom Field with Complex Validation
 */
export function createComplexField(): IFieldDescriptor {
    const factory = new ValidationConstraintFactory()

    // Build complex validation logic
    factory
        .required(true, 'This field is required')
        .minLength(5, 'Minimum 5 characters required')
        .maxLength(100, 'Maximum 100 characters allowed')
        .pattern(/^[A-Z]/, 'Must start with a capital letter')
        .custom(
            (value: string) => !value.includes('  '),
            'Cannot contain double spaces'
        )

    const constraints = factory.getConstraints()

    return createFieldDescriptor({
        id: 100,
        name: 'complexField',
        label: 'Complex Field',
        type: 'text',
        validation: {
            required: true,
            minLength: 5,
            maxLength: 100,
            pattern: /^[A-Z]/
        }
    })
}

// ============================================================================
// REACT HOOK INTEGRATION (Preview)
// ============================================================================

/**
 * Preview of how this would work with React hooks
 */
export interface UseFieldDescriptorsConfig<T extends Record<string, any>> {
    fields: FormFieldsConfig<T>
}

export function useFieldDescriptorsExample<T extends Record<string, any>>(
    config: FormFieldsConfig<T>
) {
    // In a real implementation, this would use useMemo
    const descriptors = createFieldDescriptors(config)

    return {
        descriptors,
        // Additional helpers could be added here
        getDescriptor: (name: keyof T) =>
            descriptors.find((d) => d.name === name as string),
        updateValue: (name: keyof T, value: any) => {
            // Implementation for updating field values
        },
        validate: (name?: keyof T) => {
            // Implementation for validation
        }
    }
}

/**
 * Example component usage (pseudo-code)
 */
export const UserFormComponent = () => {
    // This would be the actual usage in a component
    const formFields = createUserRegistrationFields()

    // Create form with descriptors
    // const form = createForm('userRegistration', formFields)

    return {
        fields: formFields,
        // Render logic would go here
    }
}
