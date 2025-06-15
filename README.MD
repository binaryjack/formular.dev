# FORMULAR

<div align="center">
  <img src="./packages/shared-assets/assets/apple-touch-icon.png" alt="FORMULAR Logo" width="200" />
</div>

<div align="center">

![NPM Version](https://img.shields.io/npm/v/formular.dev?style=flat-square)  **will be available sooner ** 🚧 
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-Supported-61DAFB?style=flat-square&logo=react)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)
![Build Status](https://img.shields.io/badge/Build-Stable-green?style=flat-square)

</div>

**Author:** Piana Tadeo  
**License:** MIT  
**Website:** [https://formular.dev/](https://formular.dev/)  
**Repository:** [GitHub](https://github.com/binaryjack/formular.dev)  
**Documentation:** [Full Documentation](https://docs.formular.dev/)

## Overview

FORMULAR is a next-generation, framework-agnostic form management library designed to simplify complex form implementations with comprehensive validation. Built with enterprise-grade architecture patterns including IoC containers, reactive state management, and optimized performance, FORMULAR can be seamlessly integrated with React, Vue.js, Angular, or vanilla JavaScript.

This library provides a robust foundation for managing forms, fields, and validations, making it easier to build dynamic, accessible, and interactive user interfaces.

## 🚀 Quick Start

### Installation

```bash
# Using npm
npm install formular.dev.lib

# Using pnpm (recommended)
pnpm add formular.dev.lib

# Using yarn
yarn add formular.dev.lib
```

### Basic Usage

```tsx
import { useFormularContext, InputText } from 'formular.dev.react'
import { Validators } from 'formular.dev.lib'

const MyForm = () => {
    const { formInstance } = useFormularContext()

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            console.log('Form Data:', formInstance?.getValues())
        }}>
            <InputText fieldName="email" />
            <InputText fieldName="password" />
            <button type="submit">Submit</button>
        </form>
    )
}
```

## ✨ Features

- **🎯 Framework Agnostic**: Works seamlessly with React, Vue.js, Angular, or plain JavaScript
- **✅ Comprehensive Validation**: 20+ built-in validators with country-specific support for 12+ countries
- **🇨🇭 Switzerland Focus**: Dedicated support for Swiss formats (NPA, AHV, phone numbers)
- **🌍 Multi-Country Support**: Validate across multiple countries simultaneously
- **🔧 Advanced Architecture**: IoC container, reactive state management, and optimized notifications
- **⚡ Performance Optimized**: Lazy loading, batching, debouncing, and efficient re-renders
- **🔒 Type Safety**: Full TypeScript support with comprehensive type definitions
- **📦 Modular Design**: Pick and choose components as needed
- **🔌 Extensible**: Easy to add new validators, countries, and field types
- **🌐 Localization Ready**: Built-in localization support for validation messages
- **🛠️ Developer Experience**: Rich debugging tools, VS Code integration, and comprehensive documentation
- **📝 Rich Text Editor**: Advanced RTE component with formatting capabilities
- **🎨 Modern UI**: Beautiful, accessible components with modern design principles

---

## How FORMULAR Works

FORMULAR is built using a sophisticated combination of design patterns, dependency injection, and modular architecture to provide a robust and extensible framework for form management. The library features a comprehensive IoC (Inversion of Control) container, reactive state management through signals, and a highly optimized notification system.

## 📚 Documentation & Guides

For comprehensive guides and implementation examples, explore our documentation:

- **[Core Library Documentation](./packages/lib/README.md)** - Core FORMULAR library with validation and form management
- **[React Components Documentation](./packages/vendors/react/formular.components/README.md)** - React-specific components and hooks
- **[Rich Text Editor Guide](./packages/vendors/react/formular.components/src/components/rte-Input/README.md)** - Advanced RTE component documentation
- **[Framework Adapters](./packages/vendors/react/formular.components/src/adapters/readme.md)** - Integration guides for different frameworks
- **[Service Manager Documentation](./packages/lib/src/core/managers/service-manager/docs/lazy-resolution.md)** - IoC container and dependency injection
- **[Observable Patterns](./packages/lib/src/core/observers/observable-subject/observable-subject.md)** - Reactive programming with FORMULAR
- **[Contributing Guidelines](./CONTRIBUTING.md)** - How to contribute to the project

### 🏗️ Architecture Overview

## 🏗️ Monorepo Structure

This project is organized as a monorepo with the following packages:

```
formular.dev/
├── packages/
│   ├── lib/                          # Core FORMULAR library
│   │   ├── src/
│   │   │   ├── core/                 # Core functionality
│   │   │   │   ├── managers/         # Service managers (IoC, validation, etc.)
│   │   │   │   ├── framework/        # Framework integration
│   │   │   │   ├── input-engine/     # Input handling and validation
│   │   │   │   └── observers/        # Reactive programming patterns
│   │   │   └── project/              # Project-specific implementations
│   │   └── __tests__/                # Comprehensive test suite
│   ├── shared-assets/                # Shared assets (logos, icons, etc.)
│   └── formular.dev.web/             # Marketing website
└── packages/vendors/
    └── react/
        └── formular.components/      # React-specific components
            ├── src/
            │   ├── components/       # UI components
            │   │   ├── rte-Input/    # Rich Text Editor
            │   │   ├── input-text/   # Text input components
            │   │   └── portals/      # Portal components
            │   └── adapters/         # Framework adapters
            │       ├── react/        # React adapter
            │       ├── vue/          # Vue.js adapter
            │       ├── angular/      # Angular adapter
            │       └── javascript/   # Vanilla JS adapter
```

#### Core Components

1. **🏛️ Service Manager (IoC Container)**: Advanced dependency injection system with lazy resolution
2. **📋 Form Engine**: Comprehensive form management with reactive state
3. **⌨️ Input Engine**: Modular input system with component variants including Rich Text Editor
4. **🔔 Notification System**: High-performance batched notification manager
5. **✅ Validation Engine**: Extensible validation system with country-specific support
6. **👀 Observer Patterns**: Signals-based reactive programming
7. **🎨 Component Library**: Rich set of React components with modern design
8. **🌐 Framework Adapters**: Ready-to-use adapters for multiple frameworks

---

## 📋 Form Creation Process

FORMULAR provides multiple approaches to create forms, all centered around the `IFieldDescriptor` interface - the fundamental building block of every form field.

### Understanding IFieldDescriptor

The `IFieldDescriptor` interface is the main entry point for any field in FORMULAR. It defines all aspects of a form field including its data, validation rules, state, and behavior. Understanding how to create and use field descriptors is essential for leveraging the full power of this library.

**→ See the [Core Library Documentation](./packages/lib/README.md) for complete field descriptor documentation**

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

**→ See [Core Library Documentation](./packages/lib/README.md) for complete fluent API documentation**

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

For comprehensive documentation on creating validation strategies, working with input variants, and managing trigger keywords, see **[Input Engine Documentation](./packages/lib/src/core/input-engine/core/dom-registers-builder/README.md)**.

#### Quick Overview

- **Modular Architecture**: Each input type has specialized behavior while sharing common functionality
- **Dependency Injection**: All inputs receive core managers (validation, notification, value, etc.)
- **Strategy Pattern**: Extensible validation and parsing strategies
- **Factory Pattern**: Centralized input creation with builder services
- **Trigger Keywords**: Event-driven validation and formatting

### Value Parsing Strategies

FORMULAR uses a sophisticated strategy pattern to handle value conversion between different data representations (DOM values, JavaScript objects, formatted strings). The system ensures type-safe value handling across different input types.

For comprehensive documentation on creating value parsing strategies, working with different data types, and implementing custom parsers, see **[Core Library Documentation](./packages/lib/README.md)**.

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

## 📋 Examples

### Example 1: Complete React Form with Validation

```tsx
import React from 'react'
import { FormularProvider, useFormularContext } from 'formular.dev.react'
import { InputText, InputPassword, Button } from 'formular.dev.react/components'
import { Validators } from 'formular.dev.lib'

// Define form schema with validation
const userRegistrationSchema = {
    name: 'userRegistration',
    properties: [
        {
            id: 1,
            name: 'email',
            type: 'email',
            validation: Validators.email('email', true).build(),
            label: 'Email Address',
            placeholder: 'Enter your email'
        },
        {
            id: 2,
            name: 'password',
            type: 'password',
            validation: Validators.passwordStrong('password', true).build(),
            label: 'Password',
            placeholder: 'Enter a strong password'
        },
        {
            id: 3,
            name: 'confirmPassword',
            type: 'password',
            validation: Validators.confirmPassword('confirmPassword', 'password', true).build(),
            label: 'Confirm Password',
            placeholder: 'Confirm your password'
        }
    ]
}

const RegistrationForm = () => {
    const { formInstance, isValid, isSubmitting } = useFormularContext()

    const handleSubmit = async (data) => {
        console.log('Form Data:', data)
        // Handle form submission
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            console.log('Registration successful!')
        } catch (error) {
            console.error('Registration failed:', error)
        }
    }

    return (
        <form onSubmit={formInstance?.handleSubmit(handleSubmit)}>
            <div className="form-section">
                <InputText fieldName="email" />
                <InputPassword fieldName="password" />
                <InputPassword fieldName="confirmPassword" />
            </div>
            
            <div className="form-actions">
                <Button 
                    type="submit" 
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
            </div>
        </form>
    )
}

// Main App Component
const App = () => {
    return (
        <FormularProvider schema={userRegistrationSchema}>
            <div className="app">
                <h1>Create Your Account</h1>
                <RegistrationForm />
            </div>
        </FormularProvider>
    )
}

export default App
```

### Example 2: Rich Text Editor Integration

```tsx
import React from 'react'
import { FormularProvider } from 'formular.dev.react'
import { RTEInput } from 'formular.dev.react/components'

const DocumentEditor = () => {
    const documentSchema = {
        name: 'documentEditor',
        properties: [
            {
                id: 1,
                name: 'title',
                type: 'text',
                validation: Validators.required('title', true).build(),
                label: 'Document Title'
            },
            {
                id: 2,
                name: 'content',
                type: 'richtext',
                validation: Validators.minLength('content', 10, true).build(),
                label: 'Document Content'
            }
        ]
    }

    return (
        <FormularProvider schema={documentSchema}>
            <div className="document-editor">
                <InputText fieldName="title" />
                <RTEInput 
                    fieldName="content"
                    features={[
                        'bold', 'italic', 'underline', 
                        'link', 'list', 'heading',
                        'table', 'image'
                    ]}
                    placeholder="Start writing your document..."
                />
            </div>
        </FormularProvider>
    )
}
```

### Example 3: Swiss-Specific Validation

```tsx
import { Validators } from 'formular.dev.lib'

const swissFormSchema = {
    name: 'swissForm',
    properties: [
        {
            id: 1,
            name: 'phone',
            validation: Validators.phoneSwitzerland('phone', true).build(),
            label: 'Swiss Phone Number',
            placeholder: '+41 XX XXX XX XX'
        },
        {
            id: 2,
            name: 'postalCode',
            validation: Validators.npa('postalCode', true).build(),
            label: 'Swiss Postal Code (NPA)',
            placeholder: '1000-9999'
        },
        {
            id: 3,
            name: 'ahvNumber',
            validation: Validators.ahv('ahvNumber', true).build(),
            label: 'AHV Number',
            placeholder: '756.XXXX.XXXX.XX'
        }
    ]
}
```

### Example 4: Multi-Framework Validation (Vanilla JS)

While FORMULAR is primarily designed for React applications, you can use its validation patterns in any TypeScript/JavaScript project:

```ts
import { Validators } from 'formular.dev.lib'

// Create validation rules using FORMULAR validators
const emailValidation = Validators.email('email', true).build()
const phoneValidation = Validators.phoneSwitzerland('phone', true).build()

// Multi-country validation
const europeanPhoneValidator = Validators.phoneMultiCountry(['CH', 'DE', 'AT'], 'phone', true)

// Use in any JavaScript framework or vanilla JS
const validateForm = (formData) => {
    const results = {
        email: emailValidation.validate(formData.email),
        phone: phoneValidation.validate(formData.phone)
    }
    
    return results
}
```

> **Note**: Full vanilla JavaScript browser support and framework adapters are actively being developed. Currently, FORMULAR requires a build environment but works with any modern bundler.

---

## 🤝 Contributing

We welcome contributions to FORMULAR! The project is actively maintained and open to community involvement.

### 🚀 How to Get Started

1. **🍴 Fork the Repository**: Start by forking the repository on GitHub
2. **📚 Explore the Codebase**: Familiarize yourself with the monorepo structure and architecture
3. **🐛 Report Issues**: Found a bug or have a feature request? Open an issue on GitHub
4. **💻 Submit Pull Requests**: Implement a feature or fix a bug and submit a pull request
5. **📖 Improve Documentation**: Help enhance documentation, tutorials, and examples
6. **🧪 Write Tests**: Follow our [Contributing Guidelines](./CONTRIBUTING.md) for test implementation

### 🎯 Priority Contribution Areas

The following areas are actively seeking community contributions:

- **🌐 Framework Integrations**: Complete the Vue.js, Angular, and SvelteJS adapters (foundation is ready)
- **🗺️ Additional Country Support**: Extend pattern system with new countries and regions
- **🎛️ Enhanced Field Types**: Add specialized components (sliders, toggles, date pickers, file uploads)
- **🧪 Test Coverage**: Expand test suite following our [Contributing Guidelines](./CONTRIBUTING.md)
- **📚 Examples & Tutorials**: Create comprehensive examples for different use cases
- **⚡ Performance Optimizations**: Further optimize validation and rendering performance
- **🔧 Developer Tools**: VS Code extensions, debugging tools, and development utilities
- **📱 Mobile Components**: Touch-optimized components and mobile-specific features
- **♿ Accessibility**: Enhance ARIA support and accessibility features
- **🎨 Themes & Styling**: Create theme system and pre-built design tokens

### 💡 Advanced Contribution Opportunities

- **🧠 AI Integration**: Smart form generation and validation suggestions
- **🔄 Real-time Collaboration**: Multi-user form editing capabilities
- **📊 Analytics Integration**: Form performance and user interaction analytics
- **🌐 Internationalization**: Extended localization support beyond current offerings

## 💬 Are you interested? Let's collaborate!

We're always looking for passionate developers, designers, and contributors to join the FORMULAR community. Whether you're interested in:

- **Contributing code** to core features or framework adapters
- **Designing components** and improving user experience  
- **Writing documentation** and creating tutorials
- **Testing and reporting issues** to improve stability
- **Sharing ideas** for new features and improvements

**Get in touch:** 
- 📧 Email: [piana.tadeo@formular.dev](mailto:piana.tadeo@formular.dev)
- 💬 GitHub Discussions: [Join the conversation](https://github.com/pianatadeo/formular.dev/discussions)
- 🐛 Issues: [Report bugs or request features](https://github.com/pianatadeo/formular.dev/issues)
- 🔀 Pull Requests: [Contribute directly to the codebase](https://github.com/pianatadeo/formular.dev/pulls)

## ✅ Current Status (Updated June 2025)

🚧 Working on monorepo intégration 
🚧 Unit testing 
🚧 Demo Pages


## 🗺️ Roadmap

- **Version 1.0** ✅ **COMPLETED**:
    - Dependency Free for the Core Features ✅
    - Core form and field mechanics ✅
    - Basic validation strategies ✅
    - React integration and basic components ✅
    - Country-specific validation system ✅
    - Switzerland-focused validation (NPA, AHV) ✅
    - Multi-country validation support ✅
    - Comprehensive validator library (20+ validators) ✅

    - **IoC Service Manager Implementation** ✅
        - Advanced dependency injection with lazy resolution ✅
        - Circular dependency detection ✅
        - Service lifetime management (singleton, transient, scoped) ✅
            - Service Bootstraper for lib consumer 🚧
        - Proxy-based lazy dependencies ✅
        - React hooks integration with IoC ✅

    - **High-Performance Notification System** ✅
        - Batched notification processing ✅
        - Priority-based notification handling ✅
        - Configurable batching strategies ✅
        - Observer pattern optimizations ✅


    **Version 1.3** 🚧 **IN DEVELOPMENT**

    - Mono repo refactoring 🚧

    - **Signals Implementation** 🚧
        - Reactive programming with signals 🚧
        - React hooks integration 🚧
        - Computed signals support 🚧
        - Memory management and cleanup 🚧
    - **Updated Documentation** 🚧
        - Comprehensive architecture documentation 🚧
        - Dependency injection patterns 🚧
        - Entry points and lifecycle management 🚧
        - React integration patterns 🚧

    - **Component Library Enhancements** 🚧
        - Portal system for modals and overlays 🚧
        - Advanced positioning utilities 🚧
        - Improved accessibility support 🚧

    - **Framework Adapter Foundation** 🚧
        - Base structure for Vue.js adapter 🚧
        - Angular adapter foundation 🚧
        - Vanilla JavaScript adapter preparation 🚧-
        
  **Version 2.0 ** 🚧 
    - **Complete Framework Adapters** 🔧
        - Vue.js 3 full adapter with composition API
        - Angular 15+ adapter with reactive forms integration
        - SvelteJS adapter with stores integration
        - Vanilla JavaScript browser support

    - **Enhanced Documentation Platform** 📚
        - Interactive documentation website
        - Live code playground and examples
        - Video tutorials and guides
    - **Advanced Features** ⚡
        - Visual form builder interface
        - Advanced conditional validation
        - Form analytics and insights
        - Real-time collaboration features
    - **Mobile & Touch Optimization** 📱
        - Touch-optimized components
        - Mobile-specific input types
        - Progressive Web App (PWA) support

- **Version 2.1** 📋 **PLANNED** (Q1 2026):

    - **AI Integration** 🤖
        - Smart form generation from natural language
        - Intelligent validation suggestions
        - Auto-completion and prediction
    - **Enterprise Features** 🏢
        - Advanced security and compliance features
        - Multi-tenant form management
        - Enterprise SSO integration
    - **Performance & Scale** 🚀
        - Server-side rendering (SSR) optimization
        - Edge computing support
        - Advanced caching strategies

- **Long-term Vision** 🧠 **EXPLORING**:

    - **Community Ecosystem** 🌍
        - Community-driven plugin marketplace
        - Third-party integrations and extensions
        - Certification program for developers
    - **Advanced Capabilities** 🔮
        - Visual form builder with drag-and-drop
        - Machine learning-powered form optimization
        - Advanced workflow and approval systems
        - Integration with popular CMS and e-commerce platforms

---

## 🛠️ Development

### 🌍 Environment Setup

This project supports multiple environments with dedicated configuration:

- **Development** environment (`.env.development`) - Full debugging and hot reload
- **Integration** environment (`.env.integration`) - Testing with production-like settings  
- **Production** environment (`.env.production`) - Optimized builds

### 🚀 Launch Scripts

The project includes comprehensive launch scripts for different environments and development workflows:

#### ⚡ Quick Start

```bash
# Install dependencies (using pnpm - recommended)
pnpm install

# Start development server
pnpm start:dev

# Build for production
pnpm build:production

# Serve built application
pnpm serve:production
```

#### 🎯 VS Code Integration

This project includes full VS Code integration:

- **Run and Debug** view (`Ctrl+Shift+D`) - Launch with different environments
- **Command Palette** (`Ctrl+Shift+P`) → "Tasks: Run Task" - Access build tasks
- **Chrome debugging** configurations for frontend debugging
- **Integrated terminal** with PowerShell scripts

#### 💻 PowerShell Scripts (Windows)

```powershell
# Start development server
.\scripts\start-dev.ps1

# Build with specific environment
.\scripts\build.ps1 -Environment production

# Serve with specific environment
.\scripts\serve.ps1 -Environment integration
```

#### 📦 Monorepo Development

```bash
# Work with specific packages
cd packages/lib && pnpm dev
cd packages/vendors/react/formular.components && pnpm dev

# Build all packages
pnpm build

# Run tests across all packages
pnpm test

# Lint and format
pnpm lint
pnpm format
```

For complete documentation of all available launch options and development workflows, see the individual package README files.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## 🔗 Links & Resources

- **🌐 Website:** [https://formular.dev/](https://formular.dev/)
- **📚 Documentation:** [https://docs.formular.dev/](https://docs.formular.dev/) *(coming in v2.0)*
- **📦 NPM Package:** [formular.dev.lib](https://www.npmjs.com/package/formular.dev.lib)
- **🐙 GitHub Repository:** [https://github.com/pianatadeo/formular.dev](https://github.com/pianatadeo/formular.dev)
- **💬 Community Discussions:** [GitHub Discussions](https://github.com/pianatadeo/formular.dev/discussions)
- **🐛 Issue Tracker:** [GitHub Issues](https://github.com/pianatadeo/formular.dev/issues)

### 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/pianatadeo/formular.dev?style=social)
![GitHub forks](https://img.shields.io/github/forks/pianatadeo/formular.dev?style=social)
![GitHub issues](https://img.shields.io/github/issues/pianatadeo/formular.dev)
![GitHub pull requests](https://img.shields.io/github/issues-pr/pianatadeo/formular.dev)

---

<div align="center">

**Made with ❤️ by [Piana Tadeo](https://github.com/pianatadeo) and the FORMULAR community**

*The full-featured documentation website and live examples are planned for version 2.0!*

</div>
