# 📖 Core Concepts

<div style="border: 2px solid #4CAF50; border-radius: 8px; padding: 20px; margin: 20px 0; background-color: #f9f9f9;">

### 📋 Document Information

| Property | Value |
|----------|-------|
| **Author** | Piana Tadeo |
| **Library Version** | 1.0.56 |
| **Documentation Version** | 1.0.0 |
| **Last Updated** | December 14, 2025 |
| **Topic** | Core Architecture & Concepts |

</div>

**Navigation**: [🏠 Home](./HOME.md) | [← Getting Started](./GETTING_STARTED.md) | [→ Validation System](./VALIDATION_SYSTEM.md)

---

## 📚 Table of Contents

- [Architecture Overview](#-architecture-overview)
- [Service Manager (IoC Container)](#-service-manager-ioc-container)
- [FormularManager](#-formularmanager)
- [Input Engine](#-input-engine)
- [Notification System](#-notification-system)
- [Memory Management](#-memory-management)
- [Design Patterns](#-design-patterns)

---

## 🏗️ Architecture Overview

FORMULAR.dev is built on a sophisticated, framework-agnostic architecture designed for enterprise applications.

### Core Principles

1. **Framework Agnostic** - Core logic independent of any UI framework
2. **Dependency Injection** - IoC container manages all services and dependencies
3. **Reactive Programming** - Observable pattern for state management
4. **Type Safety** - Full TypeScript support with comprehensive type definitions
5. **Performance First** - Prototype-based classes, batched notifications, lazy loading
6. **Memory Safe** - Automatic cleanup, circular dependency detection

### Architecture Layers

```
┌─────────────────────────────────────────┐
│     Framework Adapters (React, Vue)     │
│    (UI Components & Framework Hooks)    │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│        Form Management Layer            │
│  (FormularManager, Field Management)    │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Validation Engine               │
│  (Validators, Rules, Multi-Country)     │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│       Service Container (IoC)           │
│  (ServiceManager, DI, Lifecycle)        │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│        Core Managers                    │
│  (DOM, Style, Config, Notification)     │
└─────────────────────────────────────────┘
```

---

## 🔧 Service Manager (IoC Container)

The ServiceManager is the heart of FORMULAR.dev's dependency injection system.

### What is the Service Manager?

The Service Manager is an **Inversion of Control (IoC) container** that:

- Manages service registration and resolution
- Handles dependency injection automatically
- Provides lazy instantiation of services
- Detects circular dependencies
- Manages service lifecycle
- Supports service hierarchies (parent/child containers)

### Creating a Service Manager

#### Using ServiceManagerFactory (Recommended)

```typescript
import { ServiceManagerFactory } from 'formular.dev.lib'

// Full-featured service manager
const serviceManager = ServiceManagerFactory.create({
    includeCoreManagers: true,       // DOM, Style, Config managers
    includeFormularManager: true,     // Form management
    includeInputEngine: true,         // Input field factories
    includeBaseConfigurations: true,  // Default configurations
    customSetup: [],                  // Custom setup functions
    parent: undefined                 // Optional parent container
})
```

#### Using SetupHelpers

```typescript
import { SetupHelpers } from 'formular.dev.lib'

// For form applications (most common)
const sm = SetupHelpers.forFormApplication()

// For testing
const testSm = SetupHelpers.forTesting()

// For custom implementations
const customSm = SetupHelpers.forCustomImplementation()
```

#### Manual Creation

```typescript
import { ServiceManager } from 'formular.dev.lib'
import { 
    setupManagers, 
    setupFormularManager,
    setupInputEngine 
} from 'formular.dev.lib/setup'

const serviceManager = new ServiceManager()

// Register services manually
setupManagers(serviceManager)       // Core managers
setupFormularManager(serviceManager) // FormularManager
setupInputEngine(serviceManager)     // Input factories
```

### Service Registration

#### Singleton Registration

```typescript
// Register a service as singleton
serviceManager.registerSingleton(
    'IConfigurationManager',
    () => new ConfigurationManager()
)
```

#### Transient Registration

```typescript
// Register a service as transient (new instance each time)
serviceManager.registerTransient(
    'IInputField',
    () => new InputField()
)
```

#### Factory Registration

```typescript
// Register with factory function
serviceManager.registerFactory(
    'IFormularBase',
    (sm) => {
        const config = sm.resolve('IConfigurationManager')
        return new FormularBase(config)
    }
)
```

### Service Resolution

```typescript
// Resolve a service
const formularManager = serviceManager.resolve('IFormularManager')

// Check if service exists
if (serviceManager.has('IFormularManager')) {
    const manager = serviceManager.resolve('IFormularManager')
}

// Try resolve (returns null if not found)
const manager = serviceManager.tryResolve('IFormularManager')
```

### Dependency Injection

Services can automatically inject their dependencies:

```typescript
class MyCustomService {
    constructor(
        private configManager: IConfigurationManager,
        private notificationManager: INotificationManager
    ) {}
}

// Register with dependencies
serviceManager.registerSingleton(
    'IMyCustomService',
    (sm) => new MyCustomService(
        sm.resolve('IConfigurationManager'),
        sm.resolve('INotificationManager')
    )
)
```

### Service Lifecycle

```typescript
// Services implement IDisposable for cleanup
class MyService implements IDisposable {
    dispose() {
        // Cleanup resources
        this.cleanup()
    }
}

// ServiceManager disposes all services
serviceManager.dispose()  // Calls dispose() on all services
```

### Circular Dependency Detection

```typescript
// ServiceManager detects circular dependencies
serviceManager.validateNoCycles()  // Throws if cycles detected

// Example of circular dependency (will throw):
// A → B → C → A
```

---

## 📋 FormularManager

The FormularManager is the central service for creating and managing form instances.

### Overview

The FormularManager:

- Creates form instances
- Manages form lifecycle
- Provides builder pattern for complex forms
- Handles form registration and lookup
- Integrates with the service container

### Creating Forms

#### From Descriptors (Declarative)

```typescript
const formularManager = serviceManager.resolve('IFormularManager')

const formular = formularManager.createFromDescriptors('user-form', [
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        validation: {
            email: true,
            required: true
        }
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        validation: {
            minLength: 8
        }
    }
])
```

#### Programmatically

```typescript
const formular = formularManager.create('user-form')

// Add fields
formular.createField('email', {
    type: 'email',
    label: 'Email',
    required: true
})

formular.createField('password', {
    type: 'password',
    label: 'Password',
    required: true
})
```

#### Using Builder Pattern

```typescript
import { FormularManagerBuilder, Validators } from 'formular.dev.lib'

const formular = formularManager.create('user-form')

// Build complex validation
const emailValidation = new FormularManagerBuilder()
    .addValidation(Validators.required())
    .addValidation(Validators.email())
    .addValidation(Validators.maxLength(100))
    .build()

formular.createField('email', {
    type: 'email',
    validation: emailValidation
})
```

### Form Operations

```typescript
// Validate entire form
const isValid = await formular.validate()

// Get form data
const data = formular.getData()

// Submit form
const result = await formular.submit()  // Returns data if valid, null if invalid

// Check if form is valid
if (formular.isValid) {
    console.log('Form is valid!')
}

// Check if form has changes
if (formular.isDirty) {
    console.log('Form has unsaved changes')
}

// Reset form to initial state
formular.reset()

// Dispose form (cleanup)
formular.dispose()
```

### Field Management

```typescript
// Get a specific field
const emailField = formular.getField('email')

// Update field value
emailField.setValue('user@example.com')

// Validate single field
await emailField.validate()

// Check field state
if (emailField.isValid) {
    console.log('Email is valid')
}

if (emailField.isDirty) {
    console.log('Email has been modified')
}

// Listen to field changes
formular.on('field:changed', (fieldName, value) => {
    console.log(`${fieldName} changed to:`, value)
})
```

### Form Events

```typescript
// Listen to form validation
formular.on('validated', (isValid) => {
    console.log('Form validated:', isValid)
})

// Listen to form submission
formular.on('submitted', (data) => {
    console.log('Form submitted:', data)
})

// Listen to form reset
formular.on('reset', () => {
    console.log('Form reset')
})

// Listen to field changes
formular.on('field:changed', (fieldName, value) => {
    console.log(`${fieldName} changed to:`, value)
})
```

---

## ⚙️ Input Engine

The Input Engine provides factories and base classes for creating input fields.

### InputFactory

```typescript
const inputFactory = serviceManager.resolve('IInputFactory')

// Create an input field
const emailInput = inputFactory.create('email', {
    type: 'email',
    label: 'Email Address',
    required: true
})
```

### Input Types

FORMULAR.dev supports various input types:

- **Text Inputs**: text, email, password, tel, url
- **Numeric**: number, range
- **Date/Time**: date, datetime-local, time
- **Selection**: checkbox, radio, select
- **Advanced**: textarea, file, color
- **Custom**: Define your own input types

### Custom Input Registration

```typescript
import { BaseInput } from 'formular.dev.lib'

class CustomInput extends BaseInput {
    constructor(name: string, config: any) {
        super(name, config)
    }
    
    render() {
        // Custom rendering logic
    }
    
    validate() {
        // Custom validation logic
    }
}

// Register custom input type
serviceManager.registerTransient(
    'IInput:custom',
    () => new CustomInput()
)
```

---

## 🔔 Notification System

The Notification System provides reactive state updates using the Observer pattern.

### Overview

The NotificationManager:

- Implements publisher-subscriber pattern
- Supports priority-based notifications
- Batches multiple notifications
- Prevents memory leaks with automatic cleanup
- Enables reactive programming

### Subscribing to Notifications

```typescript
const notificationManager = serviceManager.resolve('INotificationManager')

// Subscribe to notifications
const subscription = notificationManager.subscribe(
    'field:changed',
    (fieldName, value) => {
        console.log(`Field ${fieldName} changed to:`, value)
    }
)

// Unsubscribe when done
subscription.unsubscribe()
```

### Publishing Notifications

```typescript
// Publish a notification
notificationManager.publish('field:changed', 'email', 'user@example.com')

// Publish with priority
notificationManager.publish('form:validated', { isValid: true }, { priority: 1 })
```

### Notification Batching

```typescript
// Start batching
notificationManager.startBatch()

// Multiple notifications (will be batched)
notificationManager.publish('field:changed', 'email', 'value1')
notificationManager.publish('field:changed', 'name', 'value2')
notificationManager.publish('field:changed', 'phone', 'value3')

// End batching (all notifications sent at once)
notificationManager.endBatch()
```

### Form Integration

Forms automatically use the notification system:

```typescript
const formular = formularManager.create('my-form')

// Listen to form events
formular.on('field:changed', (fieldName, value) => {
    console.log('Field changed:', fieldName, value)
})

formular.on('validated', (isValid) => {
    console.log('Form validated:', isValid)
})

formular.on('submitted', (data) => {
    console.log('Form submitted:', data)
})
```

---

## 🧹 Memory Management

FORMULAR.dev includes comprehensive memory management to prevent leaks.

### Automatic Cleanup

All services and forms implement the `IDisposable` interface:

```typescript
interface IDisposable {
    dispose(): void
}
```

### Disposing Forms

```typescript
const formular = formularManager.create('my-form')

// Use the form...

// Cleanup when done
formular.dispose()  // Removes event listeners, clears data, etc.
```

### Disposing Service Manager

```typescript
// Dispose entire service container
serviceManager.dispose()  // Calls dispose() on all services
```

### React Integration

Use cleanup in React hooks:

```tsx
useEffect(() => {
    const formular = formularManager.create('my-form')
    
    // Return cleanup function
    return () => {
        formular.dispose()
    }
}, [])
```

### Memory Leak Prevention

- **Event Listeners**: Automatically removed on dispose
- **Subscriptions**: Cleaned up when forms/services dispose
- **Circular References**: Detected and prevented
- **Resource Cleanup**: Files, timers, etc. are cleaned up

---

## 🎨 Design Patterns

FORMULAR.dev uses several design patterns for maintainability and extensibility.

### 1. Dependency Injection (IoC)

**Purpose**: Decouple services and improve testability

```typescript
// Bad: Tight coupling
class MyForm {
    constructor() {
        this.validator = new Validator()  // Hard-coded dependency
    }
}

// Good: Dependency injection
class MyForm {
    constructor(validator: IValidator) {
        this.validator = validator  // Injected dependency
    }
}

// Usage with ServiceManager
const myForm = new MyForm(
    serviceManager.resolve('IValidator')
)
```

### 2. Builder Pattern

**Purpose**: Construct complex objects step-by-step

```typescript
import { FormularManagerBuilder, Validators } from 'formular.dev.lib'

const validation = new FormularManagerBuilder()
    .addValidation(Validators.required())
    .addValidation(Validators.email())
    .addValidation(Validators.minLength(5))
    .addValidation(Validators.maxLength(100))
    .build()
```

### 3. Factory Pattern

**Purpose**: Create objects without specifying exact class

```typescript
const inputFactory = serviceManager.resolve('IInputFactory')

// Factory creates appropriate input based on type
const emailInput = inputFactory.create('email', { type: 'email' })
const textInput = inputFactory.create('name', { type: 'text' })
```

### 4. Observer Pattern

**Purpose**: Reactive programming and event handling

```typescript
// Publisher
notificationManager.publish('data:changed', newData)

// Subscribers
notificationManager.subscribe('data:changed', (data) => {
    console.log('Data changed:', data)
})
```

### 5. Strategy Pattern

**Purpose**: Interchangeable validation and parsing strategies

```typescript
// Different validation strategies
const emailStrategy = Validators.email()
const phoneStrategy = Validators.phone(['US', 'CA'])

// Apply strategies
field.setValidationStrategy(emailStrategy)
```

### 6. Prototype Pattern

**Purpose**: Performance optimization via prototype-based classes

```typescript
// Prototype-based class (optimal performance)
function FormularBase(name: string) {
    this.name = name
    this.fields = new Map()
}

FormularBase.prototype.createField = function(name, config) {
    // Implementation
}

FormularBase.prototype.validate = function() {
    // Implementation
}
```

### 7. Singleton Pattern

**Purpose**: Single instance of services

```typescript
// Registered as singleton
serviceManager.registerSingleton(
    'IConfigurationManager',
    () => new ConfigurationManager()
)

// Always returns same instance
const config1 = serviceManager.resolve('IConfigurationManager')
const config2 = serviceManager.resolve('IConfigurationManager')
// config1 === config2  → true
```

---

## 🔍 Core Manager Services

### ConfigurationManager

Manages application configuration:

```typescript
const configManager = serviceManager.resolve('IConfigurationManager')

// Get configuration
const config = configManager.getConfig()

// Update configuration
configManager.updateConfig({
    validateOnBlur: true,
    validateOnChange: false
})
```

### DomManager

Manages DOM operations:

```typescript
const domManager = serviceManager.resolve('IDomManager')

// Create element
const element = domManager.createElement('input', {
    type: 'email',
    className: 'form-input'
})

// Query elements
const inputs = domManager.queryAll('input.form-input')
```

### StyleManager

Manages CSS and styling:

```typescript
const styleManager = serviceManager.resolve('IStyleManager')

// Apply styles
styleManager.applyStyles(element, {
    color: 'red',
    fontSize: '14px'
})

// Add CSS class
styleManager.addClass(element, 'error')
```

---

## 📊 Performance Considerations

### Lazy Loading

Services are created only when first resolved:

```typescript
// Service registered but not created yet
serviceManager.registerSingleton('IService', () => new Service())

// Service created on first resolve
const service = serviceManager.resolve('IService')
```

### Batch Notifications

Group multiple notifications to reduce overhead:

```typescript
notificationManager.startBatch()

// Multiple operations
field1.setValue('value1')
field2.setValue('value2')
field3.setValue('value3')

notificationManager.endBatch()  // Single notification batch
```

### Prototype-Based Classes

FORMULAR.dev uses prototype-based classes for optimal performance:

- No transpilation overhead
- Faster instantiation
- Lower memory footprint
- Better V8 optimization

---

<div align="center">

**[⬆ Back to Top](#-core-concepts)** | **[🏠 Home](./HOME.md)** | **[→ Validation System](./VALIDATION_SYSTEM.md)**

</div>
