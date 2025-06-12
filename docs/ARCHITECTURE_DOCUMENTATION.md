# FORMULAR Architecture Documentation

## Overview

FORMULAR is built on a sophisticated architecture that combines dependency injection, reactive programming, and modular design patterns. This document provides an in-depth look at the architectural decisions, design patterns, and system organization.

## Table of Contents

- [Core Architecture Principles](#core-architecture-principles)
- [System Layers](#system-layers)
- [Dependency Injection Container](#dependency-injection-container)
- [Form Engine Architecture](#form-engine-architecture)
- [Input Engine Variants](#input-engine-variants)
- [Validation System](#validation-system)
- [Notification & Observer Pattern](#notification--observer-pattern)
- [React Integration Layer](#react-integration-layer)
- [Performance Optimizations](#performance-optimizations)
- [Memory Management](#memory-management)

## Core Architecture Principles

### 1. Framework Agnostic Core

The core FORMULAR system is designed to be completely framework-independent:

```
┌─────────────────────────────────────────┐
│           React Integration             │ ← Framework Adapter Layer
├─────────────────────────────────────────┤
│            FORMULAR Core                │ ← Framework Agnostic
│  ┌─────────────┬─────────────────────┐  │
│  │ Form Engine │   Validation Engine │  │
│  ├─────────────┼─────────────────────┤  │
│  │Input Engine │  Notification Sys.  │  │
│  ├─────────────┼─────────────────────┤  │
│  │   IoC Container & Service Layer    │  │
│  └─────────────┴─────────────────────┘  │
└─────────────────────────────────────────┘
```

### 2. Inversion of Control (IoC)

The entire system is built around dependency injection:

- **Service Container**: Manages all dependencies with lazy resolution
- **Lifetime Management**: Singleton, transient, and scoped lifetimes
- **Circular Dependency Detection**: Prevents dependency cycles
- **Proxy-based Resolution**: Transparent lazy loading

### 3. Reactive Programming with Signals

- **Signals**: Reactive state management for form fields
- **Computed Values**: Automatic derivation of dependent values
- **Observer Pattern**: Event-driven updates and notifications
- **Memory Efficiency**: Automatic cleanup and garbage collection

### 4. Strategy Pattern Implementation

Every major subsystem uses strategy patterns for extensibility:

- **Validation Strategies**: Pluggable validation logic
- **Value Parsing Strategies**: Type-specific value handling
- **Input Strategies**: Component-specific behaviors
- **Notification Strategies**: Configurable notification delivery

## System Layers

### Layer 1: Service Container & Infrastructure

```typescript
// Core IoC Container
interface IServiceManager {
    register<T>(identifier: ServiceIdType<T>, factory: ServiceFactory<T>): void
    resolve<T>(identifier: ServiceIdType<T>): T
    lazy<T>(identifier: ServiceIdType<T>): () => T
    createScope(): IServiceManager
}

// Service Registration
export const setupManagers = (sm: IServiceManager) => {
    sm.register(SServiceManager, () => sm, { lifetime: 'singleton' })
    sm.registerClass(SValidationManager, ValidationManager, {
        lifetime: 'singleton',
        dependencies: [SServiceManager]
    })
    sm.registerClass(SNotificationManager, NotificationManager, {
        lifetime: 'singleton'
    })
}
```

**Key Features:**

- Lazy dependency resolution
- Circular dependency detection
- Lifetime management (singleton, transient, scoped)
- Service proxy for transparent lazy loading

### Layer 2: Core Managers

#### Form Manager

```typescript
interface IFormularManager {
    createFromSchema<T>(schema: IEntityScheme): IFormular<T>
    createFromDescriptors<T>(id: string, descriptors: IFieldDescriptor[]): IFormular<T>
    createEmpty<T>(name: string): IFormular<T>
    validate(formId: string): Promise<boolean>
}
```

#### Validation Manager

```typescript
interface IValidationManager {
    validationStrategies: IValidationMethodStrategy[]
    validate(field: IExtendedInput): IValidationResult[]
    validateAsync(field: IExtendedInput): Promise<IValidationResult[]>
    addValidationStrategy(strategy: IValidationMethodStrategy): void
}
```

#### Notification Manager

```typescript
interface INotificationManager {
    subscribe<T>(event: string, callback: (data: T) => void): string
    publish<T>(event: string, data: T): void
    unsubscribe(subscriptionId: string): void
}
```

### Layer 3: Form & Input Engine

#### Form Engine

Manages complete form lifecycle:

```typescript
interface IFormular<T> {
    fields: IExtendedInput[]
    submit(): Promise<T | null>
    validate(): Promise<boolean>
    getData(): Record<string, InputDataTypes>
    addFields(...fields: IExtendedInput[]): void
}
```

#### Input Engine

Modular input system with variants:

```typescript
// Base input with dependency injection
export const InputBase = function (
    descriptor: IFieldDescriptor,
    domManager: IDomManager,
    notificationManager: INotificationManager,
    trackingManager: ITrackingManager,
    validationManager: IValidationManager,
    valueManager: IValueManager
) {
    // All managers injected as dependencies
}

// Specialized input variants
interface ITextInput extends IInputBase {
    /* text-specific methods */
}
interface ISelectInput extends IInputBase {
    /* select-specific methods */
}
interface ICheckboxInput extends IInputBase {
    /* checkbox-specific methods */
}
```

### Layer 4: Framework Integration

#### React Adapter Layer

```typescript
// React-specific hooks and components
export const useField = (field: IExtendedInput) => {
    // React state management for field
}

export const useFormularContext = <T>(): IFormularContext<T> => {
    // React context integration
}

// Framework adapter interface
interface IFrameworkAdapter {
    createFieldComponent(field: IExtendedInput): ComponentType
    createFormComponent(form: IFormular<any>): ComponentType
    integratStateManagement(signals: ISignal[]): any
}
```

## Dependency Injection Container

### Service Registration Patterns

```typescript
// 1. Factory Registration
serviceManager.register(SInputFactory, () => new InputFactory(serviceManager))

// 2. Class Registration with Dependencies
serviceManager.registerClass(SValidationManager, ValidationManager, {
    lifetime: 'singleton',
    dependencies: [SServiceManager, SNotificationManager]
})

// 3. Lazy Registration for Circular Dependencies
serviceManager.registerLazy(SFormularManager, () => {
    return new FormularManager(serviceManager.resolve(SNotificationManager))
})
```

### Resolution Strategies

```typescript
// Immediate Resolution
const validationManager = serviceManager.resolve<IValidationManager>(SValidationManager)

// Lazy Resolution (for performance)
const lazyValidator = serviceManager.lazy<IValidationManager>(SValidationManager)
const validator = lazyValidator() // Resolved only when called

// Scoped Resolution
const scopedContainer = serviceManager.createScope()
const scopedService = scopedContainer.resolve<IScopedService>(SScopedService)
```

## Form Engine Architecture

### Form Creation Pipeline

```typescript
// 1. Schema Definition
const schema: IEntityScheme = {
    name: 'user-form',
    properties: [
        /* field schemas */
    ]
}

// 2. Schema to Descriptor Conversion
const descriptors = mapSchemaToFieldDescriptor(schema)

// 3. Descriptor to Input Conversion
const inputs = descriptors.map((desc) => inputFactory.create(desc.type)(desc))

// 4. Form Assembly
const form = new Formular(schema.name, formManager)
form.addFields(...inputs)
```

### Form State Management

```typescript
interface IFormularFlags {
    isBusy: LoadingStatus // Form loading state
    isDirty: boolean // Has unsaved changes
    isValid: boolean // All validations pass
}

// State transitions
form.setIsBusy(LoadingStatus.Loading)
await form.validate()
form.setIsBusy(LoadingStatus.Loaded)
```

## Input Engine Variants

### Base Input Architecture

Every input extends from a common base with injected dependencies:

```typescript
export const InputBase = function (
    this: IInputBase,
    descriptor: IFieldDescriptor | null,
    domManager: IDomManager, // DOM manipulation
    notificationManager: INotificationManager, // Event handling
    trackingManager: ITrackingManager, // Analytics/debugging
    validationManager: IValidationManager, // Validation logic
    valueManager: IValueManager, // Value parsing/formatting
    drawer: IDrawerBaseInput, // UI interactions
    styleManager: IStyleManager // Styling and classes
) {
    // Base functionality implementation
}
```

### Specialized Input Variants

```typescript
// Text Input Variant
interface ITextInput extends IInputBase {
    mask?: string // Input masking
    placeholder?: string // Placeholder text
    autocomplete?: string // Browser autocomplete
}

// Select Input Variant
interface ISelectInput extends IInputBase {
    options: IOptionItem[] // Available options
    multiple?: boolean // Multi-select support
    searchable?: boolean // Search functionality
}

// Date Input Variant
interface IDateInput extends IInputBase {
    format: DatePickerFormatsEnum // Date format
    minDate?: Date // Minimum selectable date
    maxDate?: Date // Maximum selectable date
}
```

### Input Factory Pattern

```typescript
interface IInputFactory {
    create<T>(type: InputTypeNames): IBuilder<T>
    InputsRegistry<T>(type: keyof InputTypeMap): IBuilder<T>
}

// Factory usage
const inputFactory = serviceManager.resolve<IInputFactory>(SInputFactory)
const textInputBuilder = inputFactory.create<ITextInput>('text')
const textInput = textInputBuilder(fieldDescriptor)
```

## Validation System

### Validation Strategy Architecture

```typescript
// Base validation strategy interface
interface IValidationMethodStrategy {
    name: string
    validate(field: IExtendedInput): IValidationResult
    validateAsync(field: IExtendedInput): Promise<IValidationResult>
}

// Example: Email validation strategy
const emailValidator: IValidationMethodStrategy = {
    name: 'EmailValidator',
    validate: (field) => {
        const email = field.input.value as string
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        return newValidationResult(
            isValid,
            field.input.name,
            ValidationErrorsCodes.pattern,
            field.input.validationManager.triggerKeyWordType
        )
    },
    validateAsync: async (field) => {
        // Server-side email validation
        const result = await validateEmailOnServer(field.input.value as string)
        return newValidationResult(
            result.isValid,
            field.input.name,
            result.errorCode,
            field.input.validationManager.triggerKeyWordType
        )
    }
}
```

### Validation Rule Composition

```typescript
// Fluent validation builder
const validationRules = new GenericValidationBuilder()
    .setConstraints([
        new ValidationConstraintBuilder<boolean>('required')
            .setConstraint(true)
            .setName('email')
            .setErrorMessage('Email is required'),
        new ValidationConstraintBuilder<RegExp>('pattern')
            .setConstraint(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
            .setName('email')
            .setErrorMessage('Please enter a valid email address')
    ])
    .build()
```

### Country-Specific Validation

```typescript
// Swiss-specific validators
const swissValidators = {
    npa: Validators.swissNPA('postalCode', true).build(),
    ahv: Validators.swissAHV('socialSecurity', true).build(),
    phone: Validators.swissPhone('phoneNumber', true).build()
}

// Multi-country validation
const multiCountryPhone = Validators.multiCountryPhone('phone', ['CH', 'DE', 'FR'], true).build()
```

## Notification & Observer Pattern

### Event-Driven Architecture

```typescript
// Notification types
enum NotificationTypes {
    FIELD_CHANGED = 'field:changed',
    FIELD_VALIDATED = 'field:validated',
    FORM_SUBMITTED = 'form:submitted',
    FORM_RESET = 'form:reset'
}

// Publisher-Subscriber pattern
class NotificationManager implements INotificationManager {
    private subscriptions = new Map<string, Array<(data: any) => void>>()

    subscribe<T>(event: string, callback: (data: T) => void): string {
        // Subscribe to events
    }

    publish<T>(event: string, data: T): void {
        // Notify all subscribers
    }
}

// Usage in form fields
field.input.notificationManager.subscribe(
    NotificationTypes.FIELD_CHANGED,
    (data: IFieldChangeData) => {
        // React to field changes
        updateFormState(data)
    }
)
```

### Reactive Programming with Signals

```typescript
// Signal-based reactive updates
interface ISignal<T> {
    value: T
    subscribe(callback: (value: T) => void): () => void
    update(newValue: T): void
}

// Computed signals
const isFormValid = computed(() => {
    return form.fields.every((field) => field.input.isValid)
})

// React integration
const useSignal = <T>(signal: ISignal<T>) => {
    const [value, setValue] = useState(signal.value)

    useEffect(() => {
        return signal.subscribe(setValue)
    }, [signal])

    return value
}
```

## React Integration Layer

### Hook Architecture

```typescript
// Core form hook
export const useFormularContext = <T>(): IFormularContext<T> => {
    return useContext(formularContext)
}

// Field-specific hook
export const useField = (field: IExtendedInput | undefined) => {
    const [flags, setFlags] = useState<IFieldFlags>({
        isValid: field?.input?.isValid ?? false,
        isDirty: field?.input?.isDirty ?? false,
        isPristine: field?.input?.isPristine ?? true,
        isFocus: field?.input?.isFocus ?? false
    })

    useEffect(() => {
        if (!field) return

        // Subscribe to field changes
        const unsubscribe = field.input.notificationManager.subscribe('field:changed', () =>
            setFlags(getCurrentFlags())
        )

        return unsubscribe
    }, [field])

    return { instance: field, flags }
}
```

### Component Integration Pattern

```typescript
// HOC for form field integration
export const withFormularField = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return React.forwardRef<HTMLElement, P & { fieldName: string }>((props, ref) => {
    const { formInstance } = useFormularContext()
    const field = formInstance?.getField(props.fieldName)
    const { instance, flags } = useField(field)

    return (
      <Component
        {...props}
        field={instance}
        flags={flags}
        ref={ref}
      />
    )
  })
}

// Usage
const FormularInput = withFormularField(InputText)
```

## Performance Optimizations

### 1. Lazy Dependency Resolution

Services are only instantiated when first requested:

```typescript
// Lazy service resolution
const lazyValidator = serviceManager.lazy<IValidationManager>(SValidationManager)

// Service is created only when called
const validator = lazyValidator() // Instantiated here
```

### 2. Memoized Validation Results

```typescript
// Validation result caching
class ValidationManager {
    private cache = new Map<string, IValidationResult>()

    validate(field: IExtendedInput): IValidationResult[] {
        const cacheKey = `${field.input.name}:${field.input.value}`

        if (this.cache.has(cacheKey)) {
            return [this.cache.get(cacheKey)!]
        }

        const result = this.performValidation(field)
        this.cache.set(cacheKey, result)
        return [result]
    }
}
```

### 3. Batched Notifications

```typescript
// Notification batching for performance
class NotificationManager {
    private batchQueue: Array<{ event: string; data: any }> = []
    private batchTimeout: NodeJS.Timeout | null = null

    publish<T>(event: string, data: T): void {
        this.batchQueue.push({ event, data })

        if (!this.batchTimeout) {
            this.batchTimeout = setTimeout(() => {
                this.flushBatch()
                this.batchTimeout = null
            }, 0) // Next tick
        }
    }

    private flushBatch(): void {
        // Process all queued notifications
        this.batchQueue.forEach(({ event, data }) => {
            this.notifySubscribers(event, data)
        })
        this.batchQueue = []
    }
}
```

### 4. React Optimization Patterns

```typescript
// Memoized form components
const FormularForm = React.memo(<T extends object>({
  formular,
  children,
  onSubmit
}: IFormularProps<T>) => {
  // Component implementation
}, (prevProps, nextProps) => {
  // Custom comparison for form instances
  return prevProps.formular.id === nextProps.formular.id &&
         prevProps.formular.submitCount === nextProps.formular.submitCount
})

// Optimized field rendering
const InputText = React.memo(({ fieldName }: { fieldName: string }) => {
  const { instance, flags } = useField(fieldName)

  return useMemo(() => (
    <input {...instance?.register()} />
  ), [instance?.input?.value, flags.isValid, flags.isDirty])
})
```

## Memory Management

### 1. Automatic Cleanup

```typescript
// Form disposal
class Formular implements IFormular<any> {
    dispose(): void {
        // Unsubscribe from all notifications
        this.fields.forEach((field) => {
            field.input.notificationManager.unsubscribeAll()
        })

        // Clear field references
        this.fields = []
        this.originFields = []

        // Remove from form manager
        this.manager.clear(this)
    }
}
```

### 2. React Hook Cleanup

```typescript
export const useField = (field: IExtendedInput | undefined) => {
    useEffect(() => {
        if (!field) return

        // Subscribe to field events
        const unsubscribes = [
            field.input.notificationManager.subscribe('change', handleChange),
            field.input.notificationManager.subscribe('validate', handleValidate)
        ]

        // Cleanup on unmount
        return () => {
            unsubscribes.forEach((unsub) => unsub())
        }
    }, [field])
}
```

### 3. Service Container Disposal

```typescript
class ServiceManager implements IServiceManager {
    dispose(): void {
        // Dispose all singleton instances
        this.singletons.forEach((instance, key) => {
            if (typeof instance?.dispose === 'function') {
                instance.dispose()
            }
        })

        this.singletons.clear()
        this.registrations.clear()
        this.isDisposed = true
    }
}
```

## Best Practices

### 1. Dependency Management

- Register all services at application startup
- Use lazy resolution for optional dependencies
- Implement proper disposal patterns

### 2. Form Architecture

- Define schemas for reusable form structures
- Use builders for complex field configurations
- Implement validation at the schema level

### 3. Performance

- Leverage memoization for expensive operations
- Use batch processing for multiple operations
- Implement proper cleanup in React components

### 4. Error Handling

- Implement comprehensive error boundaries
- Use typed error codes for consistent handling
- Provide meaningful error messages and guidance

### 5. Testing

- Mock services using the IoC container
- Test validation strategies independently
- Use provided test utilities for form testing

This architecture enables FORMULAR to be highly extensible, performant, and maintainable while providing a consistent developer experience across different frameworks and use cases.
