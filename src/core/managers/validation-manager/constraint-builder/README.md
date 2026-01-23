# Formular Validation Constraint Factory

## Overview

The `ValidationConstraintFactory` provides a fluent, type-safe API for creating validation constraints in Formular. It mirrors the builder pattern used throughout the library and makes it easy to define complex validation rules programmatically or declaratively.

## Features

- ✅ **Fluent API**: Chain validation rules with method chaining
- ✅ **Type Safety**: Full TypeScript support with generic types
- ✅ **Declarative Config**: Define validations using plain objects
- ✅ **Presets**: Common validation patterns (email, password, username, etc.)
- ✅ **Composable**: Combine with field descriptors seamlessly
- ✅ **Reusable**: Create validation templates and share them

## Installation

The factory is included in the `formular.dev` package:

```typescript
import {
    ValidationConstraintFactory,
    createValidationConstraints,
    ValidationPresets
} from '@formular.dev/core'
```

## Usage

### 1. Fluent API (Recommended for Complex Logic)

```typescript
const factory = new ValidationConstraintFactory()

const constraints = factory
    .required(true, 'Username is required')
    .minLength(3, 'Minimum 3 characters')
    .maxLength(50, 'Maximum 50 characters')
    .pattern(/^[a-zA-Z0-9_-]+$/, 'Only letters, numbers, _ and -')
    .build()
```

### 2. Configuration Object (Recommended for Simple Cases)

```typescript
import { createValidationConstraints, ValidationConfig } from '@formular.dev/core'

const validationConfig: ValidationConfig = {
    required: true,
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9_-]+$/
}

const constraints = createValidationConstraints(validationConfig, 'username')
```

### 3. Validation Presets (Recommended for Common Patterns)

```typescript
import { ValidationPresets, createValidationConstraints } from '@formular.dev/core'

// Email validation
const emailConfig = ValidationPresets.email(true)
const emailConstraints = createValidationConstraints(emailConfig, 'email')

// Password validation
const passwordConfig = ValidationPresets.password(true)
const passwordConstraints = createValidationConstraints(passwordConfig, 'password')

// Username validation
const usernameConfig = ValidationPresets.username(true)
const usernameConstraints = createValidationConstraints(usernameConfig, 'username')

// Numeric range (e.g., age 18-120)
const ageConfig = ValidationPresets.numericRange(18, 120, true)
const ageConstraints = createValidationConstraints(ageConfig, 'age')

// Text length
const bioConfig = ValidationPresets.textLength(10, 500, false)
const bioConstraints = createValidationConstraints(bioConfig, 'bio')
```

## API Reference

### ValidationConstraintFactory

#### Methods

- `required(value, errorMessage?, guideMessage?, name?)`: Add required validation
- `min(value, errorMessage?, guideMessage?, name?)`: Add minimum value validation
- `max(value, errorMessage?, guideMessage?, name?)`: Add maximum value validation
- `minLength(value, errorMessage?, guideMessage?, name?)`: Add minimum length validation
- `maxLength(value, errorMessage?, guideMessage?, name?)`: Add maximum length validation
- `pattern(value, errorMessage?, guideMessage?, name?)`: Add regex pattern validation
- `custom(value, errorMessage?, guideMessage?, name?)`: Add custom validation
- `addConstraint(constraint)`: Add a raw constraint builder
- `build<T>()`: Build all constraints and return array
- `getConstraints()`: Get raw constraint builders
- `reset()`: Clear all constraints

### ValidationConfig Interface

```typescript
interface ValidationConfig {
    required?: boolean | ValidationConstraintConfig<boolean>
    min?: number | ValidationConstraintConfig<number>
    max?: number | ValidationConstraintConfig<number>
    minLength?: number | ValidationConstraintConfig<number>
    maxLength?: number | ValidationConstraintConfig<number>
    pattern?: RegExp | ValidationConstraintConfig<RegExp>
    custom?: ValidationConstraintConfig<any>
}
```

### ValidationPresets

Available presets:

- `email(required?)`: Email validation with pattern and max length
- `password(required?)`: Strong password validation
- `username(required?)`: Username validation (letters, numbers, \_, -)
- `phone(required?)`: Phone number validation
- `url(required?)`: URL validation
- `numericRange(min, max, required?)`: Numeric value range
- `textLength(minLength, maxLength, required?)`: Text length constraints

## Integration with Field Descriptors

### Complete Example

```typescript
import { IFieldDescriptor } from '@formular.dev/core'
import { createValidationConstraints, ValidationPresets } from '@formular.dev/core'

interface UserForm {
    username: string
    email: string
    password: string
    age: number
}

function createUserFormFields(): IFieldDescriptor[] {
    return [
        {
            id: 1,
            name: 'username',
            label: 'Username',
            type: 'text',
            validation: ValidationPresets.username(true)
            // ... other field properties
        },
        {
            id: 2,
            name: 'email',
            label: 'Email',
            type: 'email',
            validation: ValidationPresets.email(true)
            // ... other field properties
        },
        {
            id: 3,
            name: 'password',
            label: 'Password',
            type: 'password',
            validation: ValidationPresets.password(true)
            // ... other field properties
        },
        {
            id: 4,
            name: 'age',
            label: 'Age',
            type: 'number',
            validation: ValidationPresets.numericRange(18, 120, true)
            // ... other field properties
        }
    ].map((field) => ({
        ...field,
        value: '',
        defaultValue: '',
        validationOptions: fieldConfigToValidationOptions(field.validation),
        shouldValidate: true,
        isValid: false,
        isDirty: false,
        isPristine: true,
        isFocus: false,
        errors: [],
        guides: [],
        options: []
    })) as IFieldDescriptor[]
}
```

## Advanced Usage

### Custom Validation Messages

```typescript
const factory = new ValidationConstraintFactory()

factory
    .required(true, 'Please provide your email address', 'Email is required for account creation')
    .pattern(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address',
        'Example: user@example.com'
    )
    .maxLength(150, 'Email is too long', 'Keep it under 150 characters')

const constraints = factory.build()
```

### Conditional Validation

```typescript
function createPasswordField(requireStrong: boolean): ValidationConstraintFactory {
    const factory = new ValidationConstraintFactory().required(true).minLength(8)

    if (requireStrong) {
        factory.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
            'Password must contain uppercase, lowercase, number, and special character'
        )
    }

    return factory
}
```

### Reusable Validation Templates

```typescript
const emailValidation = () =>
    new ValidationConstraintFactory()
        .required(true)
        .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .maxLength(150)

const strongPasswordValidation = () =>
    new ValidationConstraintFactory()
        .required(true)
        .minLength(12)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)

// Use in multiple places
const loginEmailConstraints = emailValidation().build()
const signupEmailConstraints = emailValidation().build()
```

## Testing

The factory includes comprehensive test coverage:

```typescript
import { ValidationConstraintFactory } from '@formular.dev/core'

describe('ValidationConstraintFactory', () => {
    it('should create chained constraints', () => {
        const factory = new ValidationConstraintFactory()
        const constraints = factory.required(true).minLength(3).maxLength(50).build()

        expect(constraints).toHaveLength(3)
    })
})
```

## Migration from ValidationConstraintBuilder

If you're currently using `ValidationConstraintBuilder` directly:

### Before:

```typescript
const required = new ValidationConstraintBuilder<boolean>('required')
    .setConstraint(true)
    .setName('username')
    .setErrorMessage('Username is required')
    .build()

const minLength = new ValidationConstraintBuilder<number>('minLength')
    .setConstraint(3)
    .setName('username')
    .setErrorMessage('Minimum 3 characters')
    .build()
```

### After:

```typescript
const factory = new ValidationConstraintFactory()
const [required, minLength] = factory
    .required(true, 'Username is required', undefined, 'username')
    .minLength(3, 'Minimum 3 characters', undefined, 'username')
    .build()
```

Or even simpler:

```typescript
const config = ValidationPresets.username(true)
const constraints = createValidationConstraints(config, 'username')
```

## Best Practices

1. **Use Presets First**: Check if a preset matches your needs before creating custom validation
2. **Fluent API for Complex Logic**: Use the factory class when you need conditional or dynamic validation
3. **Config Objects for Simple Cases**: Use `createValidationConstraints` with config objects for straightforward validation
4. **Consistent Messages**: Define validation messages in a centralized location for consistency
5. **Type Safety**: Always specify generic types when using custom validators

## Contributing

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for development guidelines.

## License

MIT
