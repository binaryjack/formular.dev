# FORMULAR API Documentation

## Table of Contents

- [Core Interfaces](#core-interfaces)
- [Form Management](#form-management)
- [Field Schema & Descriptors](#field-schema--descriptors)
- [Validation System](#validation-system)
- [Input Engine](#input-engine)
- [Service Container](#service-container)
- [React Integration](#react-integration)

## Core Interfaces

### IFormular<T>

The main interface representing a form instance with complete lifecycle management.

```typescript
interface IFormular<T extends object> {
    readonly id: string
    fields: IExtendedInput[]
    originFields: IExtendedInput[]
    submitCount: number
    validateOnFirstSubmit: boolean
    isFormularBinded: boolean
    readonly manager: IFormularManager
    readonly notificationManager?: INotificationManager

    // Core Methods
    checkAllFieldsAreValid(): Promise<boolean>
    addFields(...flds: IExtendedInput[]): void
    getField(fieldName: string): IExtendedInput | undefined
    checkChanges(): void
    submit(): Promise<T | null>
    setIsBusy(status: LoadingStatus): void
    hasChanges(callback: () => void): void
    getFormFlags(): Partial<IFormularFlags>
    getData(): Record<string, InputDataTypes>
    setTriggerKeyWord(mode: EventsType[]): void
}
```

**Key Properties:**

- `id`: Unique form identifier
- `fields`: Array of all form fields
- `submitCount`: Number of times form has been submitted
- `manager`: Reference to the form manager that created this form

**Key Methods:**

- `submit()`: Validates and submits the form, returns form data
- `getField(name)`: Retrieves a specific field by name
- `getData()`: Returns current form data as key-value pairs
- `checkAllFieldsAreValid()`: Validates all fields and returns validity state

### IFieldDescriptor

The foundation interface defining all aspects of a form field.

```typescript
interface IFieldDescriptor {
    id: number
    name: string
    label: string
    value: InputDataTypes
    objectValue: INDate | null
    defaultValue: InputDataTypes
    type: InputTypeNames
    errors: IFieldError[]
    guides: IFieldGuide[]
    validationOptions: IValidationOptions
    target?: string
    options: IOptionItem[]
    isValid: boolean
    isDirty: boolean
    isPristine: boolean
    isFocus: boolean
    expectedValue?: InputDataTypes
    loaded?: boolean
    changed?: boolean
    shouldValidate: boolean
    mask?: string
}
```

**Key Properties:**

- `name`: Unique field identifier
- `type`: Input type ('text', 'email', 'select', etc.)
- `validationOptions`: Validation rules (required, min, max, pattern, etc.)
- `shouldValidate`: Whether field should be validated
- `mask`: Input mask pattern (e.g., "##/##/####" for dates)

## Form Management

### IFormularManager

Central service for creating and managing form instances.

```typescript
interface IFormularManager {
    sm: IServiceManager
    forms: Map<string, IFormular<any>>
    readonly notificationManager?: INotificationManager

    // Form Creation Methods
    createFromDescriptors<T>(id: string, descriptor: IFieldDescriptor[]): IFormular<T> | undefined
    createFromSchema<T>(schema: IEntityScheme): IFormular<T> | undefined
    createEmpty<T>(name: string): IFormular<T> | undefined

    // Form Management
    clear<T>(formId: IFormular<T>): void
    clearAll(): void
    getForm(formId: string): IFormular<any> | undefined
    getData<T>(formId: string): T | undefined
    validate(formId: string): Promise<boolean>
}
```

**Usage Example:**

```typescript
import { FormularManager } from '@core/managers/formular-manager/formular-manager'

const formManager = new FormularManager(notificationManager, autoTracker)

// Create form from schema
const form = formManager.createFromSchema<UserData>(userSchema)

// Create form from descriptors
const form2 = formManager.createFromDescriptors<ContactData>('contact', fieldDescriptors)
```

## Field Schema & Descriptors

### IFieldSchema

Defines the structure for field definitions before conversion to descriptors.

```typescript
interface IFieldSchema extends IValidationOptions {
    readonly id: number | null
    readonly name: string | null
    readonly type: InputTypeNames
    target: string | null
    options: IOptionItem[]
    defaultValue: string | null
    expectedValue: string | null
    shouldValidate: boolean
    triggerKeyWord: EventsType[] | never[]
    mask: string | null
}
```

### FieldSchemaBuilder

Fluent API for building field schemas with validation.

```typescript
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
```

### IEntityScheme

Container for multiple field schemas representing a complete form.

```typescript
interface IEntityScheme {
    name: string
    properties: IFieldSchema[]
}
```

## Validation System

### IValidationOptions

Comprehensive validation configuration interface.

```typescript
interface IValidationOptions {
    required?: IRequired
    min?: IMin
    max?: IMax
    minLength?: IMinLength
    maxLength?: IMaxLength
    pattern?: IPattern
}
```

### Validation Builders

Pre-built validation configurations for common scenarios:

```typescript
import { Validators } from '@core/managers/validation-manager/validation-schema/validators'

// Built-in validators
const emailValidation = Validators.email('email', true).build()
const phoneValidation = Validators.phone('phone', true).build()
const nameValidation = Validators.firstName('firstName', true).build()

// Country-specific validators
const swissPhoneValidation = Validators.swissPhone('phone', true).build()
const swissNPAValidation = Validators.swissNPA('postalCode', true).build()
```

### IValidationResult

Result object returned from validation operations.

```typescript
interface IValidationResult {
    state: boolean
    code: string
    fieldName: string
    triggerEventTypes: EventsType[]
    error?: string
    guide?: string
}
```

### Custom Validation Strategies

```typescript
interface IValidationMethodStrategy {
    name: string
    validate(field: IExtendedInput): IValidationResult
    validateAsync(field: IExtendedInput): Promise<IValidationResult>
}

// Example custom validator
const customValidator: IValidationMethodStrategy = {
    name: 'CustomBusinessRuleValidator',
    validate: (field) => {
        // Custom validation logic
        return newValidationResult(
            isValid,
            field.input.name,
            'CUSTOM_ERROR',
            field.input.validationManager.triggerKeyWordType
        )
    },
    validateAsync: async (field) => {
        // Async validation logic
        return Promise.resolve(this.validate(field))
    }
}
```

## Input Engine

### IExtendedInput

Enhanced input interface with full functionality.

```typescript
interface IExtendedInput
    extends IFieldStyleProperties,
        IOptionBaseInputProperties,
        ICheckBoxBaseInputProperties,
        IClickBaseInputProperties,
        IRadioBaseInputProperties,
        ITextBaseInput,
        IDrawerBaseInputProperties,
        ISelectBaseInputProperties {
    input: IInputBase
    register(): Record<string, any>
    ref(element: HTMLElement | null): void
}
```

### Input Types

Supported input type names:

```typescript
type InputTypeNames =
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'search'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'color'
    | 'file'
    | 'hidden'
    | 'range'
    | 'checkbox'
    | 'radio'
    | 'select'
    | 'textarea'
    | 'submit'
    | 'reset'
    | 'button'
```

## Service Container

### IServiceManager

Dependency injection container with lazy resolution.

```typescript
interface IServiceManager {
    register<T>(
        identifier: ServiceIdType<T>,
        factory: ServiceFactory<T>,
        options?: ServiceOptions
    ): void
    registerClass<T>(
        identifier: ServiceIdType<T>,
        constructor: ServiceConstructor<T>,
        options?: ServiceOptions
    ): void
    resolve<T>(identifier: ServiceIdType<T>, ...parameters: any[]): T
    lazy<T>(identifier: ServiceIdType<T>, ...parameters: any[]): () => T
    createScope(): IServiceManager
    dispose(): void
}
```

**Usage Example:**

```typescript
// Register services
serviceManager.registerClass(SValidationManager, ValidationManager, {
    lifetime: 'singleton',
    dependencies: [SServiceManager]
})

// Resolve services
const validationManager = serviceManager.resolve<IValidationManager>(SValidationManager)

// Lazy resolution
const lazyValidator = serviceManager.lazy<IValidationManager>(SValidationManager)
```

## React Integration

### useFormularContext

Hook for accessing form context in React components.

```typescript
const useFormularContext = <T extends object>(): IFormularContext<T> => {
    return React.useContext(formularContext)
}

interface IFormularContext<T extends object> {
    getFields(): IExtendedInput[]
    getFormFlags(): IFormularFlags
    message: string[]
    formInstance: IFormular<T> | undefined
    getField(fieldName: string): IExtendedInput | undefined
}
```

### useField

Hook for managing individual field state.

```typescript
const useField = (field: IExtendedInput | undefined) => {
    // Returns field instance and reactive flags
    return {
        instance: field,
        flags: {
            isValid: field?.input?.isValid ?? false,
            isDirty: field?.input?.isDirty ?? false,
            isPristine: field?.input?.isPristine ?? true,
            isFocus: field?.input?.isFocus ?? false
        }
    }
}
```

### FormularForm Component

Main form wrapper component.

```typescript
interface IFormularProps<T extends object> {
    formular: IFormular<T>
    children: React.ReactNode
    isloading?: boolean
    onSubmit?: (data: Record<string, InputDataTypes>) => void
}

const FormularForm = <T extends object>({
    formular,
    children,
    isloading,
    onSubmit
}: IFormularProps<T>) => {
    // Form provider implementation
}
```

### Usage Example

```typescript
import FormularForm from '@components/formular-form/formular-form'
import InputText from '@components/input-text/input-text'

const UserForm = () => {
  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data)
  }

  return (
    <FormularForm formular={userFormInstance} onSubmit={handleSubmit}>
      <InputText fieldName="username" />
      <InputText fieldName="email" />
      <button type="submit">Submit</button>
    </FormularForm>
  )
}
```

## Error Handling

### IFieldError

Error information for form fields.

```typescript
interface IFieldError {
    name: string
    code: string
    message?: string
}
```

### IFieldGuide

Helper/guide information for form fields.

```typescript
interface IFieldGuide {
    name: string
    code: string
    message?: string
}
```

## Event System

### EventsType

Supported event types for validation triggers.

```typescript
type EventsType = 'blur' | 'focus' | 'change' | 'input' | 'keyup' | 'keydown' | 'submit' | 'reset'
```

## Performance Considerations

1. **Lazy Loading**: Services are instantiated only when needed
2. **Memoization**: Computed values are cached automatically
3. **Batched Updates**: Multiple field changes are batched for performance
4. **Proxy-based Dependencies**: Minimal overhead for dependency injection
5. **Reactive Programming**: Signals-based updates minimize re-renders

## Best Practices

1. **Use TypeScript**: Full type safety throughout the system
2. **Leverage Builders**: Use FieldSchemaBuilder for complex forms
3. **Service Registration**: Register all dependencies at application startup
4. **Error Handling**: Always handle validation results and form submission errors
5. **Memory Management**: Dispose of form instances when no longer needed
6. **Testing**: Use the provided mock utilities for unit testing

For more detailed examples and implementation guides, see the additional documentation files in this repository.
