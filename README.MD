# FORMULAR

<div align="center">
  <img src="./apple-touch-icon.png" alt="FORMULAR Logo" width="200" />
</div>

**Author:** Piana Tadeo  
**License:** MIT  
**Website:** [https://formular.dev/](https://formular.dev/)

## Overview

FORMULAR is a framework-agnostic library designed to simplify the implementation of forms with validations. It is highly portable and can be used with popular JavaScript libraries like React, Vue.js, Angular, or even with plain vanilla JavaScript.

This library provides a robust foundation for managing forms, fields, and validations, making it easier to build dynamic and interactive user interfaces.

## Features

- **Framework Agnostic**: Works seamlessly with React, Vue.js, Angular, or plain JavaScript.
- **Comprehensive Validation**: 20+ built-in validators with country-specific support for 12+ countries.
- **Switzerland Focus**: Dedicated support for Swiss formats (NPA, AHV, phone numbers).
- **Multi-Country Support**: Validate across multiple countries simultaneously.
- **Pattern Management**: Sophisticated regex pattern system with country-specific rules.
- **Reactive Updates**: Observer pattern implementation for real-time form state management.
- **Type Safety**: Full TypeScript support with comprehensive type definitions.
- **Modular Architecture**: Pick and choose components as needed.
- **Extensible Design**: Easy to add new validators and country support.
- **Localization Ready**: Built-in localization support for validation messages.
- **Performance Optimized**: Efficient validation with batching and debouncing.
- **Developer Experience**: Rich debugging tools and comprehensive documentation.

---

## How FORMULAR Works

FORMULAR is built using a sophisticated combination of design patterns, dependency injection, and modular architecture to provide a robust and extensible framework for form management. The library features a comprehensive IoC (Inversion of Control) container, reactive state management through signals, and a highly optimized notification system.

## Developer Documentation

For detailed developer guides and implementation examples, see:

- **[field-descriptor.md](./field-descriptor.md)** - Complete guide to IFieldDescriptor - the foundation interface for all form fields
- **[field-schema-builder.md](./field-schema-builder.md)** - Fluent API for creating form schemas with validation and presets
- **[INPUT_ENGINE_VARIANTS.md](./INPUT_ENGINE_VARIANTS.md)** - Complete guide on creating validation strategies, input variants, and trigger keyword management
- **[VALUE_PARSING_STRATEGIES.md](./VALUE_PARSING_STRATEGIES.md)** - Comprehensive guide on value parsing strategies with concrete examples
- **[LAUNCH_SCRIPTS.md](./LAUNCH_SCRIPTS.md)** - Development environment setup and build configurations

### Architecture Overview

#### Core Components

1. **Service Manager (IoC Container)**: Advanced dependency injection system with lazy resolution
2. **Form Engine**: Comprehensive form management with reactive state
3. **Input Engine**: Modular input system with component variants
4. **Notification System**: High-performance batched notification manager
5. **Validation Engine**: Extensible validation system with country-specific support
6. **Observer Patterns**: Signals-based reactive programming

---

## Form Creation Process

FORMULAR provides multiple approaches to create forms, all centered around the `IFieldDescriptor` interface - the fundamental building block of every form field.

### Understanding IFieldDescriptor

The `IFieldDescriptor` interface is the main entry point for any field in FORMULAR. It defines all aspects of a form field including its data, validation rules, state, and behavior. Understanding how to create and use field descriptors is essential for leveraging the full power of this library.

**→ See [field-descriptor.md](./field-descriptor.md) for complete documentation**

### Field Creation Methods

#### 1. Hand-Crafted Field Descriptors

For small, isolated needs or precise control:

```typescript
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'

const usernameField: IFieldDescriptor = {
    id: 1,
    name: 'username',
    label: 'Username',
    value: '',
    defaultValue: '',
    type: 'text',
    validationOptions: {
        required: { value: true },
        minLength: { value: 3 }
    },
    shouldValidate: true
    // ... other properties
}
```

#### 2. From Backend APIs

Load field definitions from C# or Node.js backends:

```typescript
// Fetch schema from backend
const response = await fetch('/api/form-schema/user-registration')
const schema = await response.json()

// Convert to field descriptors
const descriptors = mapSchemaToFieldDescriptor(schema)
```

#### 3. Using Fluent API (Recommended)

Use `FieldSchemaBuilder` for complex forms with the fluent API:

```typescript
import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'
import { mapSchemaToFieldDescriptor } from '@core/framework/converters/to-field-descriptor'

const userSchema: IEntityScheme = {
    name: 'userForm',
    properties: [
        new FieldSchemaBuilder()
            .setId(1)
            .setName('username')
            .setTypeInput('text')
            .setValidationData(true, Validators.username('username', true).build())
            .build(),

        new FieldSchemaBuilder()
            .setId(2)
            .setName('email')
            .setTypeInput('email')
            .setValidationData(true, Validators.email('email', true).build())
            .build()
    ]
}

// Convert schema to field descriptors
const fieldDescriptors = mapSchemaToFieldDescriptor(userSchema)
```

**→ See [field-schema-builder.md](./field-schema-builder.md) for complete fluent API documentation**

#### 4. From Existing Objects

Convert existing data objects to field descriptors:

```typescript
import { mapObjectToFields } from '@core/framework/converters/object-to-field-converter'

const userData = {
    username: 'john_doe',
    email: 'john@example.com'
}

// Populate descriptors with existing data
const populatedDescriptors = mapObjectToFields(baseDescriptors, userData, true)
```

### Creating Forms from Field Descriptors

Once you have field descriptors, create forms using the Form Manager:

```typescript
import { useService } from '@core/framework/react/services/use-service'
import {
    IFormularManager,
    SFormularManager
} from '@core/managers/formular-manager/formular-manager.types'

const { getService } = useService()
const formManager = getService<IFormularManager>(SFormularManager)

// Create form from field descriptors
const form = formManager?.createFromDescriptors<UserData>('userForm', fieldDescriptors)

// Or create directly from schema
const form = formManager?.createFromSchema<UserData>(userSchema)
```

### Form Usage in React Components

```tsx
import { useFormularContext } from '@components/context/formular-context/formular-context'
import { InputText } from '@components/input-text/input-text'

const UserForm = () => {
    const { formInstance } = useFormularContext()

    return (
        <form>
            <InputText fieldName="username" />
            <InputText fieldName="email" />
            <button onClick={() => formInstance?.submit()}>Submit</button>
        </form>
    )
}
```

---

### Pre-configured Field Builders

FORMULAR includes pre-configured builders for common field types, located in the `builders-preset` folder:

```typescript
// Available presets
import { InputTextBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/input-text-builder'
import { DateBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/date-builder'
import { SelectIdBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/select-options-id-builder'
import { CheckBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/true-false-value-builder'
import { PasswordBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/password-builder'

// Usage example
const userRegistrationSchema: IEntityScheme = {
    name: 'userRegistration',
    properties: [
        InputTextBuilder.setId(1)
            .setName('firstName')
            .setValidationData(true, Validators.firstNameValidator('firstName', true).build())
            .build(),

        DateBuilder.setId(2)
            .setName('birthDate')
            .setMask('##/##/####')
            .setValidationData(true, Validators.date('birthDate', true).build())
            .build(),

        SelectIdBuilder.setId(3)
            .setName('country')
            .setOptionData('countries', countryOptions)
            .build()
    ]
}
```

---

### Dependency Injection System

FORMULAR uses a sophisticated Service Manager that provides:

- **Lazy Resolution**: Dependencies are resolved only when needed
- **Lifecycle Management**: Singleton, transient, and scoped lifetimes
- **Circular Dependency Detection**: Automatic validation with meaningful error messages
- **Proxy-based Dependencies**: Advanced lazy dependency proxies for optimal performance

#### Service Manager Example

```typescript
import { ServiceManager } from '@core/managers/service-manager/service-manager'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'

// Create and configure the IoC container
const serviceManager = new ServiceManager()

// Register services with different lifetimes
serviceManager.registerClass(SValidationManager, ValidationManager, {
    lifetime: 'singleton',
    dependencies: [SServiceManager]
})

serviceManager.registerClass(SInputFactory, InputFactory, {
    lifetime: 'transient',
    dependencies: [SServiceManager]
})

// Lazy resolution for optimal performance
const lazyValidationManager = serviceManager.lazy<IValidationManager>(SValidationManager)
const validator = lazyValidationManager() // Resolved only when called
```

### Application Lifecycle and Entry Points

#### Main Entry Point

```typescript
// filepath: src/project/start/app-lifecycle-instances.ts
import { applifeCylceInstance } from '@project/start/app-lifecycle-instances'

// Global service manager instance
const serviceManager = applifeCylceInstance.getGlobalServiceManager()

// Setup sequence
setupManagers(serviceManager) // Core managers
setupFormularManager(serviceManager) // Form management
setupBaseInputClasses(serviceManager) // Input variants
setupInputsRegistry(serviceManager) // Input factory registry
setupInputsFactory(serviceManager) // Input creation
setupBaseFieldsConfiguration(serviceManager) // Field configurations
```

#### Service Registration Hierarchy

```typescript
// Core Managers Setup
export const setupManagers = function (sm: IServiceManager) {
    // Self-register the service manager
    sm.register(SServiceManager, () => sm, { lifetime: 'singleton' })

    // Register core services
    sm.registerClass(SValidationManager, ValidationManager, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })

    sm.registerClass(SNotificationManager, NotificationManager, {
        lifetime: 'singleton'
    })

    sm.registerClass(SInputFactory, InputFactory, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })
}
```

### Form Management Architecture

#### Defining Form Schemas

FORMULAR uses schema definitions with builder patterns for declarative form construction:

```typescript
// filepath: src/demo/form-demo/form-demo.schema.ts
import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'
import { Validators } from '@core/managers/validation-manager/validation-schema/validators'

export const controlsDemoSchema: IEntityScheme = {
    name: 'demo-schema',
    properties: [
        new FieldSchemaBuilder()
            .setName('username')
            .setTypeInput('text')
            .setValidationData(true, Validators.firstNameValidator('username', true).build())
            .build(),
        new FieldSchemaBuilder()
            .setName('email')
            .setTypeInput('email')
            .setValidationData(true, Validators.email('email', true).build())
            .build()
    ]
}
```

#### Input Factory and Builder Services

The system uses a sophisticated factory pattern with specialized builder services:

```typescript
// Input Factory with Service Manager integration
export const InputFactory = function (this: IInputFactory, serviceManager: IServiceManager) {
    this.sm = serviceManager

    this.create = function <T>(type: InputTypeNames): IBuilder<T> {
        return this.InputsRegistry(type) as IBuilder<T>
    }

    this.InputsRegistry = function <T>(type: keyof InputTypeMap): IBuilder<T> | undefined {
        const mapping = {
            text: () => this.sm.lazy<ITextInputService>(STextInputService)?.(),
            select: () => this.sm.lazy<ISelectInputService>(SSelectInputService)?.(),
            checkbox: () => this.sm.lazy<ICheckInputService>(SCheckInputService)?.(),
            radio: () => this.sm.lazy<IRadioInputService>(SRadioInputService)?.()
        }

        return mapping[type]?.()?.build
    }
}
```

### React Integration and Hooks

#### useField Hook

The `useField` hook provides reactive form field management:

```typescript
// filepath: src/core/framework/react/fields/hooks/use-field.ts
export const useField = <T extends IExtendedInput | IInputBase>(
    field?: T
): IUseFieldHookReturn<T> => {
    const [flags, setFlags] = React.useState<IFieldStateFlags>(defaultFieldStateFlags)
    const [value, setValue] = React.useState(field?.input?.value)

    const handleRefresh = useCallback(() => {
        const newFlags = stableField?.input.styleManager?.getFlagsObject?.()
        const newValue = stableField?.input?.value

        if (flagsChanged) setFlags(newFlags)
        if (newValue !== value) setValue(newValue)
    }, [stableField, flags, value])

    useEffect(() => {
        if (!stableField) return

        const notifications = [
            notification(stableField, handleRefresh, 'onUiUpdate', 'useField.onUiUpdate'),
            notification(stableField, handleRefresh, 'onFocus', 'useField.onFocus'),
            notification(stableField, handleRefresh, 'onBlur', 'useField.onBlur')
        ]

        notifications.forEach((notif) => stableField.input.notificationManager?.accept(notif))

        return () => {
            notifications.forEach((notif) => stableField.input.notificationManager?.dismiss(notif))
        }
    }, [stableField])

    return { instance: stableField, flags }
}
```

#### useService Hook

Integration with the IoC container through React hooks:

```typescript
// filepath: src/core/framework/react/services/use-service.ts
export const useService = () => {
    const serviceManager = useMemo(() => {
        return applifeCylceInstance.getGlobalServiceManager()
    }, [])

    return {
        getService: <T>(identifier: ServiceIdType<T>): T | undefined => {
            try {
                return serviceManager.lazy<T>(identifier)?.()
            } catch (error: any) {
                throw new Error(
                    `Error resolving service ${identifier?.toString()}: ${error.message}`
                )
            }
        }
    }
}
```

### Form Components Architecture

#### Component Integration Pattern

```tsx
// Example: InputText Component
const InputText = ({ fieldName }: IInputTextProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    const handleDelete = () => instance?.input?.clear()
    const { handleKeyDown } = useKeyBindings({ onDeleteCallback: handleDelete })

    useFieldDefaultValue(instance)

    return (
        <FieldSet
            inputId={instance?.input?.name}
            label={instance?.input?.label}
            type={instance?.input?.type}
            flags={flags}
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.input?.validationResults ?? []}
                />
            }
        >
            <input
                {...instance?.register()}
                ref={(r) => instance?.ref(r)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                type="text"
            />
        </FieldSet>
    )
}
```

### Notification System and Observer Pattern

#### High-Performance Batched Notifications

```typescript
// Batched notification system for optimal performance
export class NotificationManager implements INotificationManager {
    private batchQueue: PriorityNotification[] = []
    private batchConfig: IBatchConfig = {
        maxBatchSize: 50,
        batchDelay: 8,
        enablePriority: true,
        strategy: 'microtask'
    }

    notify(type: EventsType, data?: IEvents): void {
        const notification: PriorityNotification = {
            type,
            data,
            timestamp: Date.now(),
            priority: NotificationPriority.NORMAL
        }

        this.batchQueue.push(notification)
        this.scheduleBatchProcessing()
    }

    private scheduleBatchProcessing(): void {
        if (this.batchConfig.strategy === 'microtask') {
            queueMicrotask(() => this.processBatch())
        } else {
            setTimeout(() => this.processBatch(), this.batchConfig.batchDelay)
        }
    }
}
```

### Input Engine Variants

FORMULAR features a sophisticated modular input system with specialized variants for different field types. The Input Engine uses dependency injection and strategy patterns to provide extensible and maintainable form field management.

For comprehensive documentation on creating validation strategies, working with input variants, and managing trigger keywords, see **[INPUT_ENGINE_VARIANTS.md](./INPUT_ENGINE_VARIANTS.md)**.

#### Quick Overview

- **Modular Architecture**: Each input type has specialized behavior while sharing common functionality
- **Dependency Injection**: All inputs receive core managers (validation, notification, value, etc.)
- **Strategy Pattern**: Extensible validation and parsing strategies
- **Factory Pattern**: Centralized input creation with builder services
- **Trigger Keywords**: Event-driven validation and formatting

### Value Parsing Strategies

FORMULAR uses a sophisticated strategy pattern to handle value conversion between different data representations (DOM values, JavaScript objects, formatted strings). The system ensures type-safe value handling across different input types.

For comprehensive documentation on creating value parsing strategies, working with different data types, and implementing custom parsers, see **[VALUE_PARSING_STRATEGIES.md](./VALUE_PARSING_STRATEGIES.md)**.

#### Quick Overview

- **Strategy Pattern**: Specialized parsing logic for each data type
- **Type Safety**: Comprehensive TypeScript support for value transformations
- **Built-in Parsers**: String, numeric, boolean, date, and select option strategies
- **Custom Parsers**: Easy extension for complex data types (JSON, currency, file uploads)
- **Bidirectional**: Both setter and getter functions for complete value management

### Validation Engine

#### Comprehensive Validation System

```typescript
// Generic validation builder with constraint system
export class GenericValidationBuilder {
    private constraints: ValidationConstraintBuilder<any>[] = []

    setConstraints(constraints: ValidationConstraintBuilder<any>[]): this {
        this.constraints = constraints
        return this
    }

    build(): IValidationOptions {
        return {
            constraints: this.constraints.map((c) => c.build()),
            required: { value: this.isRequired() },
            patterns: this.getPatterns(),
            messages: this.getMessages()
        }
    }
}

// Country-specific validation strategies
export const phoneValidationStrategy: IValidationStrategy = {
    name: 'phone',
    validate: (value: string, constraint: string): IValidationResult => {
        const patterns = countryPhonePatterns[constraint] || defaultPhonePattern
        const isValid = patterns.test(value)

        return {
            isValid,
            error: isValid ? null : `Invalid phone number for ${constraint}`,
            constraint
        }
    }
}
```

### Converting Schemas to Forms

Schemas are converted into forms using the `FormularManager`. This manager handles the initialization of fields, validation, and other dependencies.

#### Example: Creating a Form Instance

```ts
// filepath: src/demo/form-demo/form-demo.instance.ts
import { FormularManager } from '@core/managers/formular-manager/formular-manager'
import { commonInstances } from '@demo/common/common-instances'
import { controlsDemoSchema } from './form-demo.schema'
import { getTranslationBuilder } from '@core/managers/validation-manager/validation-localize/validation-localize.builder'
import { formValidationLocalize } from '@core/managers/validation-manager/validation-localize/form-validation-localize'

const { notificationManager, domManager, trackingManager, validationManager, autoTracker } =
    commonInstances

const fm = new FormularManager(notificationManager, autoTracker)

export const demoFormInstance = fm.createFromSchema(
    controlsDemoSchema,
    {
        trackingStrategies: [],
        validationStrategies: []
    },
    [domManager, trackingManager, validationManager],
    getTranslationBuilder(),
    formValidationLocalize
)
```

### Using the Form in a Component

Once the form instance is created through the service container, it integrates seamlessly with React:

#### Example: Rendering a Form

```tsx
// filepath: src/demo/form-demo/form-demo.tsx
import React from 'react'
import FormularForm from '@components/formular-form/formular-form'
import InputText from '@components/input-text/input-text'

const FormDemo = () => {
    const handleSubmit = (data) => {
        console.log('Form Data:', data)
    }

    return (
        <FormularForm formular={demoFormInstance} onSubmit={handleSubmit}>
            <InputText fieldName="username" />
            <InputText fieldName="email" />
            <button type="submit">Submit</button>
        </FormularForm>
    )
}

export default FormDemo
```

### Patterns Used in FORMULAR

FORMULAR leverages several advanced design patterns to ensure modularity, scalability, and maintainability:

1. **Dependency Injection Pattern**:

    - Complete IoC container with lazy resolution
    - Proxy-based dependency management
    - Circular dependency detection
    - Example: `ServiceManager`, `registerClass`, lazy resolution

2. **Builder Pattern**:

    - Used for constructing form schemas and validation rules
    - Example: `FieldSchemaBuilder`, `GenericValidationBuilder`, `ValidationConstraintBuilder`

3. **Factory Pattern**:

    - Used to create input instances and manage field generation
    - Example: `InputFactory`, specialized input services (`TextInputService`, `SelectInputService`)

4. **Observer Pattern**:

    - Enables reactive updates to form fields and validation states
    - High-performance batched notification system
    - Example: Signals, `NotificationManager`, `useField` hook

5. **Strategy Pattern**:

    - Allows for interchangeable validation strategies and field types
    - Example: Validation strategies, value parsing strategies, country-specific validators

6. **Proxy Pattern**:

    - Advanced lazy dependency resolution
    - Transparent dependency injection
    - Example: `LazyDependencyProxy` for optimal performance

7. **Modular Design**:
    - Components and utilities are designed to be reusable and composable
    - Example: Input engine variants, manager system, React integration

### Advanced Example: Validation with Modern Patterns

FORMULAR supports comprehensive validation through the `GenericValidationBuilder` and `ValidationConstraintBuilder`:

```ts
// filepath: src/demo/validation-demo/validation-demo.tsx
import {
    GenericValidationBuilder,
    ValidationConstraintBuilder
} from '@core/managers/validation-manager/generic-validation-builder/generic-validation-builder'
import { Validators } from '@core/managers/validation-manager/validation-schema/validators'

// Using pre-built validators
const emailValidator = Validators.email('email', true)
const phoneValidator = Validators.phone('phone', true)

// Building custom validators
const customValidator = new GenericValidationBuilder().setConstraints([
    new ValidationConstraintBuilder<boolean>('required')
        .setConstraint(true)
        .setName('customField')
        .setErrorMessage('This field is required')
        .setGuideMessage('Please enter a value'),
    new ValidationConstraintBuilder<RegExp>('pattern')
        .setConstraint(/^[a-zA-Z]+$/)
        .setName('customField')
        .setErrorMessage('Only alphabets are allowed')
        .setGuideMessage('Enter only letters')
])

// Country-specific validation
const swissPhoneValidator = Validators.phoneSwitzerland('phone', true)
const npaValidator = Validators.npa('postalCode', true) // Swiss postal code
const ahvValidator = Validators.ahv('ssn', true) // Swiss AHV number

// Multi-country validation
const europeanPhoneValidator = Validators.phoneMultiCountry('phone', ['CH', 'DE', 'AT', 'FR'])
```

This custom validator can then be applied to a field in the schema.

### Country-Specific Validation Features

FORMULAR includes comprehensive country-specific validation support with patterns for 12+ countries:

#### Switzerland-Specific Validators

```ts
import { Validators } from '@core/managers/validation-manager/validation-schema/validators'

// Swiss phone number validation
const swissPhone = Validators.phoneSwitzerland('phone', true)

// Swiss postal code (NPA) validation
const npaCode = Validators.npa('postalCode', true)

// Swiss AHV number validation
const ahvNumber = Validators.ahv('socialSecurity', true)
```

#### Multi-Country Validation

```ts
// European phone validation
const euroPhone = Validators.phoneMultiCountry('phone', ['CH', 'DE', 'AT', 'FR', 'IT'])

// DACH region postal codes
const dachPostal = Validators.postalCodeMultiCountry('postal', ['CH', 'DE', 'AT'])

// North American SSN validation
const naSSN = Validators.ssnMultiCountry('ssn', ['US', 'CA'])
```

#### Supported Countries

- **Switzerland (CH)**: Phone, NPA, AHV
- **Germany (DE)**: Phone, Postal, SSN
- **Austria (AT)**: Phone, Postal, SSN
- **France (FR)**: Phone, Postal, SSN
- **United States (US)**: Phone, ZIP, SSN
- **Canada (CA)**: Phone, Postal, SIN
- **United Kingdom (UK)**: Phone, Postal, NI
- **Italy (IT)**: Phone, Postal, CF
- **Spain (ES)**: Phone, Postal, DNI
- **Netherlands (NL)**: Phone, Postal, BSN
- **Belgium (BE)**: Phone, Postal, NISS
- **Luxembourg (LU)**: Phone, Postal, Matricule

---

By combining these patterns and modular components, FORMULAR provides a powerful framework for managing forms in any JavaScript application.

## Current Validation System

FORMULAR includes a sophisticated validation system with the following key components:

### Core Validation Classes

- **`GenericValidationBuilder`**: Main validation builder for creating validation rules
- **`ValidationConstraintBuilder`**: Builder for individual validation constraints
- **`ValidationManager`**: Manages validation execution and state
- **`PatternManager`**: Manages country-specific validation patterns

### Available Validators

FORMULAR provides 20+ pre-built validators through the `Validators` object:

```ts
import { Validators } from '@core/managers/validation-manager/validation-schema/validators'

// Basic validators
Validators.email('email', true) // Email validation
Validators.phone('phone', true) // Phone validation
Validators.firstName('firstName', true) // First name validation
Validators.lastName('lastName', true) // Last name validation
Validators.passwordStrong('password', true) // Strong password validation
Validators.url('website', false) // URL validation
Validators.creditCard('card', true) // Credit card validation
Validators.age('age', true) // Age validation (1-120)
Validators.username('username', true) // Username validation
Validators.currency('amount', true) // Currency validation
Validators.date('birthDate', true) // Date validation
Validators.time('eventTime', true) // Time validation
Validators.numeric('score', true, 0, 100) // Numeric with min/max

// Country-specific validators
Validators.phoneCountry('phone', 'CH', true) // Swiss phone
Validators.postalCodeCountry('postal', 'DE', true) // German postal
Validators.ssnCountry('ssn', 'US', true) // US SSN

// Switzerland-specific shortcuts
Validators.phoneSwitzerland('phone', true) // Swiss phone
Validators.npa('postalCode', true) // Swiss NPA
Validators.ahv('ssn', true) // Swiss AHV

// Multi-country validators
Validators.phoneMultiCountry('phone', ['CH', 'DE', 'AT'])
Validators.postalCodeMultiCountry('postal', ['CH', 'DE', 'AT'])
Validators.ssnMultiCountry('ssn', ['US', 'CA'])
```

### Form Manager Integration

The `FormularManager` now requires proper initialization with notification and tracking managers:

```ts
import { FormularManager } from '@core/managers/formular-manager/formular-manager'
import { commonInstances } from '@demo/common/common-instances'

const { notificationManager, autoTracker } = commonInstances
const formManager = new FormularManager(notificationManager, autoTracker)
```

## Key Architecture Benefits

### Performance Optimizations

1. **Lazy Dependency Resolution**: Services are only instantiated when needed
2. **Batched Notifications**: High-performance notification system with configurable batching
3. **Proxy-based Dependencies**: Transparent lazy loading with minimal overhead
4. **Memoized Signals**: Reactive programming with automatic memoization
5. **Efficient React Integration**: Optimized hooks with minimal re-renders

### Developer Experience

1. **Type Safety**: Full TypeScript support throughout the entire system
2. **Circular Dependency Detection**: Automatic validation prevents dependency cycles
3. **Rich Debugging**: Comprehensive error messages and development tools
4. **Hot Module Replacement**: Development environment optimizations
5. **Extensible Architecture**: Easy to add new validators, input types, and countries

### Scalability Features

1. **Modular Design**: Components can be used independently
2. **Strategy Pattern**: Easy to swap validation and parsing strategies
3. **Country-agnostic Base**: Core system supports any country validation
4. **Framework Agnostic Core**: Core validation can work with any UI framework
5. **Plugin Architecture**: Ready for community extensions

### Converting Schemas to Forms

Schemas are converted into forms using the `FormularManager`. This manager handles the initialization of fields, validation, and other dependencies.

#### Example: Creating a Form Instance

```ts
// filepath: src/demo/form-demo/form-demo.instance.ts
import { FormularManager } from '@core/managers/formular-manager/formular-manager'
import { commonInstances } from '@demo/common/common-instances'
import { controlsDemoSchema } from './form-demo.schema'
import { getTranslationBuilder } from '@core/managers/validation-manager/validation-localize/validation-localize.builder'
import { formValidationLocalize } from '@core/managers/validation-manager/validation-localize/form-validation-localize'

const { notificationManager, domManager, trackingManager, validationManager, autoTracker } =
    commonInstances

const fm = new FormularManager(notificationManager, autoTracker)

export const demoFormInstance = fm.createFromSchema(
    controlsDemoSchema,
    {
        trackingStrategies: [],
        validationStrategies: []
    },
    [domManager, trackingManager, validationManager],
    getTranslationBuilder(),
    formValidationLocalize
)
```

### Using the Form in a Component

Once the form instance is created, it can be used in a React component to render fields and handle form submission.

#### Example: Rendering a Form

```tsx
// filepath: src/demo/form-demo/form-demo.tsx
import React from 'react'
import FormularForm from '@components/formular-form/formular-form'
import InputText from '@components/input-text/input-text'

const FormDemo = () => {
    const handleSubmit = (data) => {
        console.log('Form Data:', data)
    }

    return (
        <FormularForm formular={demoFormInstance} onSubmit={handleSubmit}>
            <InputText fieldName="username" />
            <InputText fieldName="email" />
            <button type="submit">Submit</button>
        </FormularForm>
    )
}

export default FormDemo
```

### Patterns Used in FORMULAR

FORMULAR leverages several design patterns to ensure modularity, scalability, and maintainability:

1. **Builder Pattern**: Used for constructing form schemas and validation rules.

    - Example: `InputTextBuilder`, `DateBuilder`, `PasswordBuilder`.

2. **Factory Pattern**: Used to create input instances and manage field generation.

    - Example: `InputFactory`, `FieldProvider`.

3. **Observer Pattern**: Enables reactive updates to form fields and validation states.

    - Example: Signals used in `useField`.

4. **Strategy Pattern**: Allows for interchangeable validation strategies and field types.

    - Example: Validators like `emailValidator`, `phoneValidator`, country-specific validators.

5. **Modular Design**: Components and utilities are designed to be reusable and composable.
    - Example: `FormularManager`, `InputsProvider`.

### Advanced Example: Validation with Modern Patterns

FORMULAR supports comprehensive validation through the `GenericValidationBuilder` and `ValidationConstraintBuilder`.

```ts
// filepath: src/demo/validation-demo/validation-demo.tsx
import {
    GenericValidationBuilder,
    ValidationConstraintBuilder
} from '@core/managers/validation-manager/generic-validation-builder/generic-validation-builder'
import { Validators } from '@core/managers/validation-manager/validation-schema/validators'

// Using pre-built validators
const emailValidator = Validators.email('email', true)
const phoneValidator = Validators.phone('phone', true)

// Building custom validators
const customValidator = new GenericValidationBuilder().setConstraints([
    new ValidationConstraintBuilder<boolean>('required')
        .setConstraint(true)
        .setName('customField')
        .setErrorMessage('This field is required')
        .setGuideMessage('Please enter a value'),
    new ValidationConstraintBuilder<RegExp>('pattern')
        .setConstraint(/^[a-zA-Z]+$/)
        .setName('customField')
        .setErrorMessage('Only alphabets are allowed')
        .setGuideMessage('Enter only letters')
])

// Country-specific validation
const swissPhoneValidator = Validators.phoneSwitzerland('phone', true)
const npaValidator = Validators.npa('postalCode', true) // Swiss postal code
const ahvValidator = Validators.ahv('ssn', true) // Swiss AHV number

// Multi-country validation
const europeanPhoneValidator = Validators.phoneMultiCountry('phone', ['CH', 'DE', 'AT', 'FR'])
```

This custom validator can then be applied to a field in the schema.

### Country-Specific Validation Features

FORMULAR includes comprehensive country-specific validation support with patterns for 12+ countries:

#### Switzerland-Specific Validators

```ts
import { Validators } from '@core/managers/validation-manager/validation-schema/validators'

// Swiss phone number validation
const swissPhone = Validators.phoneSwitzerland('phone', true)

// Swiss postal code (NPA) validation
const npaCode = Validators.npa('postalCode', true)

// Swiss AHV number validation
const ahvNumber = Validators.ahv('socialSecurity', true)
```

#### Multi-Country Validation

```ts
// European phone validation
const euroPhone = Validators.phoneMultiCountry('phone', ['CH', 'DE', 'AT', 'FR', 'IT'])

// DACH region postal codes
const dachPostal = Validators.postalCodeMultiCountry('postal', ['CH', 'DE', 'AT'])

// North American SSN validation
const naSSN = Validators.ssnMultiCountry('ssn', ['US', 'CA'])
```

#### Supported Countries

- **Switzerland (CH)**: Phone, NPA, AHV
- **Germany (DE)**: Phone, Postal, SSN
- **Austria (AT)**: Phone, Postal, SSN
- **France (FR)**: Phone, Postal, SSN
- **United States (US)**: Phone, ZIP, SSN
- **Canada (CA)**: Phone, Postal, SIN
- **United Kingdom (UK)**: Phone, Postal, NI
- **Italy (IT)**: Phone, Postal, CF
- **Spain (ES)**: Phone, Postal, DNI
- **Netherlands (NL)**: Phone, Postal, BSN
- **Belgium (BE)**: Phone, Postal, NISS
- **Luxembourg (LU)**: Phone, Postal, Matricule

---

By combining these patterns and modular components, FORMULAR provides a powerful framework for managing forms in any JavaScript application.

## Current Validation System

FORMULAR includes a sophisticated validation system with the following key components:

### Core Validation Classes

- **`GenericValidationBuilder`**: Main validation builder for creating validation rules
- **`ValidationConstraintBuilder`**: Builder for individual validation constraints
- **`ValidationManager`**: Manages validation execution and state
- **`PatternManager`**: Manages country-specific validation patterns

### Available Validators

FORMULAR provides 20+ pre-built validators through the `Validators` object:

```ts
import { Validators } from '@core/managers/validation-manager/validation-schema/validators'

// Basic validators
Validators.email('email', true) // Email validation
Validators.phone('phone', true) // Phone validation
Validators.firstName('firstName', true) // First name validation
Validators.lastName('lastName', true) // Last name validation
Validators.passwordStrong('password', true) // Strong password validation
Validators.url('website', false) // URL validation
Validators.creditCard('card', true) // Credit card validation
Validators.age('age', true) // Age validation (1-120)
Validators.username('username', true) // Username validation
Validators.currency('amount', true) // Currency validation
Validators.date('birthDate', true) // Date validation
Validators.time('eventTime', true) // Time validation
Validators.numeric('score', true, 0, 100) // Numeric with min/max

// Country-specific validators
Validators.phoneCountry('phone', 'CH', true) // Swiss phone
Validators.postalCodeCountry('postal', 'DE', true) // German postal
Validators.ssnCountry('ssn', 'US', true) // US SSN

// Switzerland-specific shortcuts
Validators.phoneSwitzerland('phone', true) // Swiss phone
Validators.npa('postalCode', true) // Swiss NPA
Validators.ahv('ssn', true) // Swiss AHV

// Multi-country validators
Validators.phoneMultiCountry('phone', ['CH', 'DE', 'AT'])
Validators.postalCodeMultiCountry('postal', ['CH', 'DE', 'AT'])
Validators.ssnMultiCountry('ssn', ['US', 'CA'])
```

### Form Manager Integration

The `FormularManager` now requires proper initialization with notification and tracking managers:

```ts
import { FormularManager } from '@core/managers/formular-manager/formular-manager'
import { commonInstances } from '@demo/common/common-instances'

const { notificationManager, autoTracker } = commonInstances
const formManager = new FormularManager(notificationManager, autoTracker)
```

## Examples

### Example 1: Using FORMULAR with React

```tsx
import React from 'react'
import FormularForm from '@components/formular-form/formular-form'
import InputText from '@components/input-text/input-text'
import { demoFormInstance } from '@demo/form-demo/form-demo.instance'

const MyForm = () => {
    const handleSubmit = (data) => {
        console.log('Form Data:', data)
    }

    return (
        <FormularForm formular={demoFormInstance} onSubmit={handleSubmit}>
            <InputText fieldName="username" />
            <InputText fieldName="email" />
            <button type="submit">Submit</button>
        </FormularForm>
    )
}

export default MyForm
```

### Example 2: Using FORMULAR Validation Patterns

While FORMULAR is primarily designed for React applications, you can use its validation patterns and builders in any TypeScript/JavaScript project:

```ts
import { Validators } from '@core/managers/validation-manager/validation-schema/validators'
import { GenericValidationBuilder } from '@core/managers/validation-manager/generic-validation-builder/generic-validation-builder'
import { ValidationConstraintBuilder } from '@core/managers/validation-manager/constraint-builder/validation-constraint-builder'

// Create validation rules using FORMULAR validators
const emailValidation = Validators.email('email', true).build()
const phoneValidation = Validators.phoneSwitzerland('phone', true).build()

// Build complex validation using GenericValidationBuilder
const userValidation = new GenericValidationBuilder()
    .setConstraints([
        new ValidationConstraintBuilder('required', 'username', true),
        new ValidationConstraintBuilder('minLength', 'username', 3),
        new ValidationConstraintBuilder('maxLength', 'username', 20)
    ])
    .build()

// Use country-specific validators
const swissPhoneValidator = Validators.phoneSwitzerland('phone', true)
const npaValidator = Validators.npa('postalCode', true)
const ahvValidator = Validators.ahv('socialSecurity', true)

// Multi-country validation
const multiCountryPhone = Validators.phoneMultiCountry(['CH', 'DE', 'AT'], 'phone', true)
```

> **Note**: Full vanilla JavaScript browser support is planned for Version 2.0. Currently, FORMULAR requires a TypeScript/JavaScript build environment.

---

## Contributing

We welcome contributions to FORMULAR as soon as we stabilize the injection dependency core manager.

How you can get involved in contributing to this project in the future ?

1. **Fork the Repository**: Start by forking the repository on GitHub.
2. **Explore the Codebase**: Familiarize yourself with the project structure and mechanics.
3. **Report Issues**: Found a bug or have a feature request? Open an issue on GitHub.
4. **Submit Pull Requests**: Implement a feature or fix a bug and submit a pull request.
5. **Write Documentation**: Help improve the documentation for better usability.

### Planned Contributions

The following areas are ready for community contributions:

- **Framework Integrations**: Create adapters for popular frameworks like Angular and Vue.js (the core validation system is ready).
- **Additional Country Support**: Extend the existing pattern system with new countries and regions.
- **Enhanced Field Types**: Add support for specialized field types like sliders, toggles, and date pickers.
- **Unit Tests**: Improve test coverage to ensure reliability across all validators and components.
- **Examples and Tutorials**: Provide more examples and tutorials for developers.
- **Performance Optimizations**: Further optimize validation performance and memory usage.
- **Developer Tools**: Create debugging tools and development utilities.

## Are you interested ? drop me few lines and let's see how we can collaborate !

## Current Status:

🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
🎉 IoC Service Manager Implementation: ✅ COMPLETED 🎉
🎉 Project stability: Stable for development 🎉  
🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉

## Roadmap

- **Version 1.0** ✅ **COMPLETED**:

    - Dependency Free for the Core Features ✅
    - Core form and field mechanics ✅
    - Basic validation strategies ✅
    - React integration and basic components ✅
    - Country-specific validation system ✅
    - Switzerland-focused validation (NPA, AHV) ✅
    - Multi-country validation support ✅
    - Comprehensive validator library (20+ validators) ✅

- **Version 1.1** ✅ **COMPLETED**:

    - **IoC Service Manager Implementation** ✅
        - Advanced dependency injection with lazy resolution ✅
        - Circular dependency detection ✅
        - Service lifetime management (singleton, transient, scoped) ✅
        - Proxy-based lazy dependencies ✅
        - React hooks integration with IoC ✅
    - **High-Performance Notification System** ✅
        - Batched notification processing ✅
        - Priority-based notification handling ✅
        - Configurable batching strategies ✅
        - Observer pattern optimizations ✅
    - **Signals Implementation** ✅
        - Reactive programming with signals ✅
        - React hooks integration ✅
        - Computed signals support ✅
        - Memory management and cleanup ✅
    - **Updated Documentation** ✅
        - Comprehensive architecture documentation ✅
        - Dependency injection patterns ✅
        - Entry points and lifecycle management ✅
        - React integration patterns ✅

- **Version 2.0** 📋 **PLANNED**:

    - Open to contributors!
    - Enhanced debugging and developer tools
        - Currently Some components are available for React
        - I plan to decline them as a extension for Browsers.
    - Enhance Documentation Base
    - Framework adapters for Angular and Vue.js
    - Custom Validators Strategy
    - Advanced form lifecycle management
    - Performance optimizations
    - Extended country support
    - Form state persistence

- **Backlog** 🧠 **In Brainstorming**:

    - Full-featured website with documentation and live examples
    - Community-driven plugins and extensions
    - Visual form builder
    - Advanced conditional validation
    - Real-time collaboration features
    - More advanced Framework/Libs targeted Components.

---

## Development

### Environment Setup

This project supports multiple environments with dedicated configuration files:

- Development environment (`.env.development`)
- Integration environment (`.env.integration`)
- Production environment (`.env.production`)

### Launch Scripts

The project includes comprehensive launch scripts for different environments and development workflows. For detailed information about available scripts, launch configurations, and usage examples, see [LAUNCH_SCRIPTS.md](./LAUNCH_SCRIPTS.md).

#### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Build for production
npm run build:production

# Serve built application
npm run serve:production
```

#### VS Code Integration

- Use Run and Debug view (`Ctrl+Shift+D`) to launch with different environments
- Use Command Palette (`Ctrl+Shift+P`) → "Tasks: Run Task" for build tasks
- Chrome debugging configurations available for frontend debugging

#### PowerShell Scripts (Windows)

```powershell
# Start development server
.\scripts\start-dev.ps1

# Build with specific environment
.\scripts\build.ps1 -Environment production

# Serve with specific environment
.\scripts\serve.ps1 -Environment integration
```

For complete documentation of all available launch options, see [LAUNCH_SCRIPTS.md](./LAUNCH_SCRIPTS.md).

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

For more information, visit [https://formular.dev/](https://formular.dev/).

- note that he's planned in version 3 of the current project!
