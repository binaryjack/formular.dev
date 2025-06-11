# Input Engine Variants - Developer Guide

FORMULAR's Input Engine is a sophisticated modular system that provides different input variants for various form field types. This guide explains how developers can create, add, and use validation strategies with concrete examples.

## Overview

The Input Engine is built on a strategy pattern architecture where each input type has its own specialized behavior while sharing common functionality through dependency injection. The system uses the IoC container to manage dependencies and ensure proper initialization order.

## Architecture Components

### 1. Core Objects and Initialization Order

The Input Engine follows a specific initialization sequence to ensure proper dependency resolution:

```typescript
// 1. Service Manager (IoC Container)
const serviceManager = new ServiceManager()

// 2. Core Managers Registration
setupManagers(serviceManager) // Validation, Notification, Value managers
setupFormularManager(serviceManager) // Form management
setupBaseInputClasses(serviceManager) // Input variants
setupInputsRegistry(serviceManager) // Input factory registry
setupInputsFactory(serviceManager) // Input creation
setupBaseFieldsConfiguration(serviceManager) // Field configurations with strategies
```

### 2. Input Base Architecture

Every input variant extends from `InputBase` which provides core functionality:

```typescript
// Core Input Base with Dependency Injection
export const InputBase = function (
    this: IInputBase,
    descriptor: IFieldDescriptor | null,
    domManager: IDomManager,
    notificationManager: INotificationManager,
    trackingManager: ITrackingManager,
    validationManager: IValidationManager,
    valueManager: IValueManager,
    drawer: IDrawerBaseInput,
    styleManager: IStyleManager
) {
    // All managers are injected as dependencies
    this.domManager = domManager
    this.notificationManager = notificationManager
    this.trackingManager = trackingManager
    this.validationManager = validationManager
    this.valueManager = valueManager
    this.drawer = drawer
    this.styleManager = styleManager
}
```

### 3. Input Variants

FORMULAR provides several specialized input variants:

#### Text Base Input

```typescript
export const TextBaseInput = function (this: ITextBaseInput, input: IInputBase) {
    this.input = input
    // Text-specific functionality
    // Supports string values, pattern validation, length constraints
}
```

#### Select Base Input

```typescript
export const SelectBaseInput = function (this: ISelectBaseInput, input: IInputBase) {
    this.input = input
    // Select-specific functionality
    // Includes option management, selection tracking
}
```

#### Checkbox Base Input

```typescript
export const CheckBoxBaseInput = function (this: ICheckBoxBaseInput, input: IInputBase) {
    this.input = input
    // Boolean value management
    // Supports checked/unchecked states
}
```

#### Radio Base Input

```typescript
export const RadioBaseInput = function (this: IRadioBaseInput, input: IInputBase) {
    this.input = input
    // Radio group management
    // Single selection from multiple options
}
```

#### Numeric Base Input

```typescript
export const NumericBaseInput = function (this: INumericBaseInput, input: IInputBase) {
    this.input = input
    // Numeric value management
    // Supports min/max constraints, step values
}
```

#### Date Base Input

```typescript
export const DateBaseInput = function (this: IDateBaseInput, input: IInputBase) {
    this.input = input
    // Date/time value management
    // Format handling, date validation
}
```

#### Masked Base Input

```typescript
export const MaskedBaseInput = function (this: IMaskedBaseInput, mask: string) {
    this.mask = mask
    // Input masking functionality
    // Pattern-based input formatting
}
```

## Creating Custom Validation Strategies

### 1. Basic Validation Strategy Structure

A validation strategy implements the `IValidationMethodStrategy` interface:

```typescript
interface IValidationMethodStrategy {
    name: string
    validate: (field: IExtendedInput) => IValidationResult
    validateAsync: (field: IExtendedInput) => Promise<IValidationResult>
}
```

### 2. Example: Creating a Custom Email Domain Validation Strategy

```typescript
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import {
    IValidationMethodStrategy,
    newValidationResult,
    ValidationErrorsCodes
} from '@core/managers/validation-manager/validation-manager.types'

const CustomEmailDomainStrategy = function (this: IValidationMethodStrategy) {
    this.name = 'CustomEmailDomainStrategy'

    this.validateAsync = async function (field: IExtendedInput) {
        return Promise.resolve(this.validate(field))
    }

    this.validate = function (field: IExtendedInput) {
        const name = field.input.name
        const value = field.input.valueManager.getValue(field) as string

        // Skip validation if no custom domain constraint is set
        if (!field?.input.validationOptions?.customEmailDomain) {
            return newValidationResult(
                true,
                name,
                ValidationErrorsCodes.custom,
                field.input.validationManager.triggerKeyWordType
            )
        }

        const allowedDomains = field.input.validationOptions.customEmailDomain.value as string[]
        const hasValue = value && value.length > 0

        if (hasValue) {
            const emailDomain = value.split('@')[1]
            const isAllowedDomain = allowedDomains.includes(emailDomain)

            if (!isAllowedDomain) {
                return newValidationResult(
                    false,
                    name,
                    ValidationErrorsCodes.custom,
                    field.input.validationManager.triggerKeyWordType,
                    `Email must be from one of these domains: ${allowedDomains.join(', ')}`,
                    'Please use a company email address'
                )
            }
        }

        return newValidationResult(
            true,
            name,
            ValidationErrorsCodes.custom,
            field.input.validationManager.triggerKeyWordType
        )
    }
} as any as IValidationMethodStrategy

export const customEmailDomainStrategy = new CustomEmailDomainStrategy()
```

### 3. Example: Advanced Async Password Strength Validation

```typescript
const AsyncPasswordStrengthStrategy = function (this: IValidationMethodStrategy) {
    this.name = 'AsyncPasswordStrengthStrategy'

    this.validate = function (field: IExtendedInput) {
        // Sync fallback - basic validation
        const name = field.input.name
        const value = field.input.valueManager.getValue(field) as string

        if (!value || value.length < 8) {
            return newValidationResult(
                false,
                name,
                ValidationErrorsCodes.custom,
                field.input.validationManager.triggerKeyWordType,
                'Password must be at least 8 characters',
                'Enter a longer password'
            )
        }

        return newValidationResult(
            true,
            name,
            ValidationErrorsCodes.custom,
            field.input.validationManager.triggerKeyWordType
        )
    }

    this.validateAsync = async function (field: IExtendedInput) {
        const name = field.input.name
        const value = field.input.valueManager.getValue(field) as string

        if (!value) {
            return newValidationResult(
                true,
                name,
                ValidationErrorsCodes.custom,
                field.input.validationManager.triggerKeyWordType
            )
        }

        try {
            // Simulate API call to check against common passwords database
            const response = await fetch('/api/check-password-strength', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: value })
            })

            const result = await response.json()

            if (!result.isStrong) {
                return newValidationResult(
                    false,
                    name,
                    ValidationErrorsCodes.custom,
                    field.input.validationManager.triggerKeyWordType,
                    result.message || 'Password is too weak',
                    'Use a stronger password with numbers, symbols, and mixed case'
                )
            }

            return newValidationResult(
                true,
                name,
                ValidationErrorsCodes.custom,
                field.input.validationManager.triggerKeyWordType
            )
        } catch (error) {
            // Fallback to sync validation on error
            return this.validate(field)
        }
    }
} as any as IValidationMethodStrategy

export const asyncPasswordStrengthStrategy = new AsyncPasswordStrengthStrategy()
```

## Adding Validation Strategies to the System

### 1. Using the Validation Strategy Service

The recommended way to add validation strategies is through the `ValidationStrategyService`:

```typescript
// In your setup file (e.g., setup-custom-validations.ts)
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    IValidationStrategyService,
    SValidationStrategyService
} from '@project/services/validation-strategy-service'
import { customEmailDomainStrategy, asyncPasswordStrengthStrategy } from './custom-validators'

export const setupCustomValidations = function (sm: IServiceManager) {
    const validationService = sm.lazy<IValidationStrategyService>(SValidationStrategyService)?.()

    if (validationService) {
        // Add your custom strategies
        validationService.add(customEmailDomainStrategy, asyncPasswordStrengthStrategy)
    }
}
```

### 2. Integration in Application Lifecycle

Add your custom validation setup to the application initialization:

```typescript
// In app-lifecycle-instances.ts or similar startup file
import { setupCustomValidations } from './setup-custom-validations'

export const initializeApplication = () => {
    const serviceManager = new ServiceManager()

    // Standard setup
    setupManagers(serviceManager)
    setupFormularManager(serviceManager)
    setupBaseInputClasses(serviceManager)
    setupInputsRegistry(serviceManager)
    setupInputsFactory(serviceManager)
    setupBaseFieldsConfiguration(serviceManager)

    // Add your custom validations
    setupCustomValidations(serviceManager)

    return serviceManager
}
```

## Trigger Keywords and Event Management

### 1. Understanding Trigger Keywords

Trigger keywords determine when validation should be executed. They are event-based and allow fine-grained control over validation timing:

```typescript
enum EventsEnum {
    onBlur = 'onBlur', // Validate when field loses focus
    onChange = 'onChange', // Validate when value changes
    onFocus = 'onFocus', // Validate when field gains focus
    onSubmit = 'onSubmit', // Validate on form submission
    onKeyUp = 'onKeyUp', // Validate on key release
    onKeyDown = 'onKeyDown', // Validate on key press
    onClick = 'onClick', // Validate on click
    onClear = 'onClear', // Validate when field is cleared
    validateOnFormFirstSubmit = 'validateOnFormFirstSubmit' // Only after first submit attempt
}
```

### 2. Setting Trigger Keywords

#### Form Level

```typescript
// Set triggers for entire form
const formInstance = formManager.createFromSchema(schema, options, managers)
formInstance.setTriggerKeyWord(['onBlur', 'onChange', 'onSubmit'])
```

#### Field Level

```typescript
// Set triggers for specific field
const field = formInstance.getField('username')
field.input.validationManager.setTriggerKeyWord(['onBlur', 'onSubmit'])
```

#### Global Configuration

```typescript
// In setup-base-input-configurations.ts
export const setupBaseFieldsConfiguration = function (sm: IServiceManager) {
    const validationTriggerService =
        sm.lazy<IValidationTriggerService>(SValidationTriggerService)?.()

    // Set default triggers for all fields
    validationTriggerService.add('onBlur', 'onChange', 'onKeyUp', 'onKeyDown', 'onFocus')
}
```

### 3. Custom Trigger Management

```typescript
// Create a custom trigger service for specific use cases
export const setupCustomTriggers = function (sm: IServiceManager) {
    const triggerService = sm.lazy<IValidationTriggerService>(SValidationTriggerService)?.()

    if (triggerService) {
        // Add custom triggers
        triggerService.add('onCustomEvent')

        // Remove unwanted triggers
        triggerService.remove('onKeyUp', 'onKeyDown')
    }
}
```

### 4. Conditional Trigger Logic

```typescript
// Example: Different triggers based on field type
const setupConditionalTriggers = (field: IExtendedInput) => {
    switch (field.input.type) {
        case 'email':
            // Email fields validate on blur to avoid interrupting typing
            field.input.validationManager.setTriggerKeyWord(['onBlur', 'onSubmit'])
            break
        case 'password':
            // Password fields validate in real-time for strength feedback
            field.input.validationManager.setTriggerKeyWord(['onChange', 'onBlur', 'onSubmit'])
            break
        case 'select':
            // Dropdowns validate immediately on selection
            field.input.validationManager.setTriggerKeyWord(['onChange', 'onSubmit'])
            break
        default:
            // Default behavior
            field.input.validationManager.setTriggerKeyWord(['onBlur', 'onSubmit'])
    }
}
```

## Practical Examples

### 1. Complete Custom Validator with Form Integration

```typescript
// 1. Create the validator
const businessEmailValidator = function (this: IValidationMethodStrategy) {
    this.name = 'BusinessEmailValidator'

    this.validate = function (field: IExtendedInput) {
        const name = field.input.name
        const value = field.input.valueManager.getValue(field) as string

        if (!value) {
            return newValidationResult(
                true,
                name,
                ValidationErrorsCodes.custom,
                field.input.validationManager.triggerKeyWordType
            )
        }

        const businessDomains = ['company.com', 'enterprise.org', 'business.net']
        const domain = value.split('@')[1]

        if (!businessDomains.includes(domain)) {
            return newValidationResult(
                false,
                name,
                ValidationErrorsCodes.custom,
                field.input.validationManager.triggerKeyWordType,
                'Please use your business email address',
                'Business email addresses only'
            )
        }

        return newValidationResult(
            true,
            name,
            ValidationErrorsCodes.custom,
            field.input.validationManager.triggerKeyWordType
        )
    }

    this.validateAsync = async function (field: IExtendedInput) {
        return Promise.resolve(this.validate(field))
    }
} as any as IValidationMethodStrategy

// 2. Register the validator
const setupBusinessValidation = (sm: IServiceManager) => {
    const validationService = sm.lazy<IValidationStrategyService>(SValidationStrategyService)?.()
    validationService?.add(new businessEmailValidator())
}

// 3. Use in form schema
const businessFormSchema: IEntityScheme = {
    name: 'business-form',
    properties: [
        new FieldSchemaBuilder()
            .setName('businessEmail')
            .setTypeInput('email')
            .setValidationData(true, Validators.email('businessEmail', true).build())
            .build()
    ]
}

// 4. Create form with custom triggers
const createBusinessForm = (serviceManager: IServiceManager) => {
    const formManager = new FormularManager(notificationManager, autoTracker)
    const form = formManager.createFromSchema(businessFormSchema, {}, managers)

    // Set specific triggers for business email
    form.setTriggerKeyWord(['onBlur', 'onSubmit'])

    return form
}
```

### 2. Field-Specific Validation Strategy

```typescript
// Validator that only applies to specific field names
const specificFieldValidator = function (this: IValidationMethodStrategy) {
    this.name = 'SpecificFieldValidator'

    this.validate = function (field: IExtendedInput) {
        const name = field.input.name

        // Only validate fields with specific names
        if (!['username', 'companyName', 'projectName'].includes(name)) {
            return newValidationResult(
                true,
                name,
                ValidationErrorsCodes.custom,
                field.input.validationManager.triggerKeyWordType
            )
        }

        const value = field.input.valueManager.getValue(field) as string

        // Custom validation logic for these specific fields
        if (value && /^[a-zA-Z0-9_-]+$/.test(value)) {
            return newValidationResult(
                true,
                name,
                ValidationErrorsCodes.custom,
                field.input.validationManager.triggerKeyWordType
            )
        }

        return newValidationResult(
            false,
            name,
            ValidationErrorsCodes.custom,
            field.input.validationManager.triggerKeyWordType,
            'Only letters, numbers, underscores, and hyphens allowed',
            'Use alphanumeric characters only'
        )
    }

    this.validateAsync = async function (field: IExtendedInput) {
        return Promise.resolve(this.validate(field))
    }
} as any as IValidationMethodStrategy
```

## Best Practices

### 1. Validation Strategy Design

- **Single Responsibility**: Each strategy should handle one validation concern
- **Async Support**: Always provide both sync and async implementations
- **Error Handling**: Include proper error handling in async validators
- **Performance**: Keep validators lightweight and efficient
- **Reusability**: Design strategies to be reusable across different field types

### 2. Trigger Management

- **User Experience**: Choose triggers that don't interrupt user flow
- **Performance**: Avoid excessive validation triggers (e.g., onKeyDown for complex validations)
- **Consistency**: Use consistent trigger patterns across similar field types
- **Progressive Enhancement**: Start with basic triggers and add more as needed

### 3. Integration Patterns

- **Service Registration**: Always use the IoC container for dependency management
- **Initialization Order**: Follow the proper setup sequence
- **Error Recovery**: Provide fallbacks for failed validations
- **Testing**: Test validators in isolation and integration scenarios

## Debugging and Troubleshooting

### 1. Common Issues

**Validator Not Running**

```typescript
// Check if validator is properly registered
const validationService = serviceManager.lazy<IValidationStrategyService>(
    SValidationStrategyService
)?.()
console.log(
    'Registered strategies:',
    validationService?.strategies.map((s) => s.name)
)

// Check trigger keywords
console.log('Field triggers:', field.input.validationManager.triggerKeyWordType)
```

**Dependency Injection Issues**

```typescript
// Verify service manager setup
const vm = serviceManager.lazy<IValidationManager>(SValidationManager)?.()
if (!vm) {
    console.error('ValidationManager not registered')
}
```

### 2. Debug Helpers

```typescript
// Add debugging to custom validators
const debugValidator = function (this: IValidationMethodStrategy) {
    this.name = 'DebugValidator'

    this.validate = function (field: IExtendedInput) {
        console.log(`Validating field: ${field.input.name}`)
        console.log(`Value: ${field.input.valueManager.getValue(field)}`)
        console.log(`Triggers: ${field.input.validationManager.triggerKeyWordType}`)

        // Your validation logic here
        return newValidationResult(
            true,
            field.input.name,
            ValidationErrorsCodes.custom,
            field.input.validationManager.triggerKeyWordType
        )
    }

    this.validateAsync = async function (field: IExtendedInput) {
        return Promise.resolve(this.validate(field))
    }
} as any as IValidationMethodStrategy
```

This comprehensive guide covers the essential aspects of working with FORMULAR's Input Engine Variants and validation strategies. The system's flexibility allows for powerful customization while maintaining consistency and performance through its well-architected dependency injection system.

---

## Related Documentation

- **[VALUE_PARSING_STRATEGIES.md](./VALUE_PARSING_STRATEGIES.md)** - Comprehensive guide on value parsing strategies and data transformations
- **[README.md](./README.MD)** - Main project documentation and architecture overview
- **[LAUNCH_SCRIPTS.md](./LAUNCH_SCRIPTS.md)** - Development environment setup and build configurations

---

_For more information about FORMULAR, visit [https://formular.dev/](https://formular.dev/)._
