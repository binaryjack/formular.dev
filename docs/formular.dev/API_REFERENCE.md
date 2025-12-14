# 📖 API Reference

<div style="border: 2px solid #4CAF50; border-radius: 8px; padding: 20px; margin: 20px 0; background-color: #f9f9f9;">

### 📋 Document Information

| Property | Value |
|----------|-------|
| **Author** | Piana Tadeo |
| **Library Version** | 1.0.56 |
| **Documentation Version** | 1.0.0 |
| **Last Updated** | December 14, 2025 |
| **Topic** | Complete API Reference |

</div>

**Navigation**: [🏠 Home](./HOME.md) | [← Troubleshooting](./TROUBLESHOOTING.md) | [→ Advanced Topics](./ADVANCED_TOPICS.md)

---

## 📚 Table of Contents

- [ServiceManager](#servicemanager)
- [ServiceManagerFactory](#servicemanagerfactory)
- [FormularManager](#formularmanager)
- [IFormularBase (Form Instance)](#iformularbase-form-instance)
- [IInputBase (Field Instance)](#iinputbase-field-instance)
- [Validators](#validators)
- [FormularManagerBuilder](#formularmanagerbuilder)
- [ValidationTranslationService](#validationtranslationservice)
- [NotificationManager](#notificationmanager)

---

## ServiceManager

The IoC container managing service registration and dependency injection.

### Methods

#### `registerSingleton<T>(key: string, factory: (sm: IServiceManager) => T): void`

Register a service as a singleton (single instance).

**Parameters:**
- `key` - Service identifier (e.g., 'IFormularManager')
- `factory` - Factory function to create the service

**Example:**
```typescript
serviceManager.registerSingleton(
    'IConfigurationManager',
    () => new ConfigurationManager()
)
```

#### `registerTransient<T>(key: string, factory: (sm: IServiceManager) => T): void`

Register a service as transient (new instance each time).

**Parameters:**
- `key` - Service identifier
- `factory` - Factory function to create the service

**Example:**
```typescript
serviceManager.registerTransient(
    'IInputField',
    () => new InputField()
)
```

#### `resolve<T>(key: string): T`

Resolve a registered service.

**Parameters:**
- `key` - Service identifier

**Returns:** The service instance

**Throws:** Error if service not registered

**Example:**
```typescript
const formularManager = serviceManager.resolve<IFormularManager>('IFormularManager')
```

#### `tryResolve<T>(key: string): T | null`

Try to resolve a service, returns null if not found.

**Parameters:**
- `key` - Service identifier

**Returns:** The service instance or null

**Example:**
```typescript
const manager = serviceManager.tryResolve('IFormularManager')
if (manager) {
    // Use manager
}
```

#### `has(key: string): boolean`

Check if a service is registered.

**Parameters:**
- `key` - Service identifier

**Returns:** True if service is registered

**Example:**
```typescript
if (serviceManager.has('IFormularManager')) {
    const manager = serviceManager.resolve('IFormularManager')
}
```

#### `validateNoCycles(): void`

Validate that there are no circular dependencies.

**Throws:** Error if circular dependency detected

**Example:**
```typescript
try {
    serviceManager.validateNoCycles()
    console.log('No circular dependencies')
} catch (error) {
    console.error('Circular dependency:', error)
}
```

#### `dispose(): void`

Dispose the service manager and all services.

**Example:**
```typescript
serviceManager.dispose()
```

---

## ServiceManagerFactory

Factory for creating configured ServiceManager instances.

### Methods

#### `create(options?: IServiceManagerOptions): IServiceManager`

Create a configured ServiceManager.

**Parameters:**
- `options` - Configuration options

**Options:**
```typescript
interface IServiceManagerOptions {
    includeCoreManagers?: boolean          // Default: true
    includeFormularManager?: boolean       // Default: true
    includeInputEngine?: boolean           // Default: true
    includeBaseConfigurations?: boolean    // Default: true
    customSetup?: ((sm: IServiceManager) => void)[]
    parent?: IServiceManager
}
```

**Returns:** Configured ServiceManager instance

**Example:**
```typescript
const sm = ServiceManagerFactory.create({
    includeCoreManagers: true,
    includeFormularManager: true,
    includeInputEngine: true,
    includeBaseConfigurations: true
})
```

---

## FormularManager

Central service for creating and managing form instances.

### Methods

#### `create<T extends object>(name: string): IFormularBase<T>`

Create a new form instance.

**Parameters:**
- `name` - Unique form identifier

**Returns:** Form instance

**Example:**
```typescript
const form = formularManager.create<LoginData>('login-form')
```

#### `createFromDescriptors<T extends object>(name: string, descriptors: IFieldDescriptor[]): IFormularBase<T>`

Create a form from field descriptors (declarative).

**Parameters:**
- `name` - Unique form identifier
- `descriptors` - Array of field descriptors

**Returns:** Form instance with fields

**Example:**
```typescript
const form = formularManager.createFromDescriptors('user-form', [
    {
        name: 'email',
        type: 'email',
        required: true,
        validation: { email: true }
    },
    {
        name: 'password',
        type: 'password',
        required: true,
        validation: { minLength: 8 }
    }
])
```

#### `getForm<T extends object>(name: string): IFormularBase<T> | null`

Get an existing form by name.

**Parameters:**
- `name` - Form identifier

**Returns:** Form instance or null

**Example:**
```typescript
const form = formularManager.getForm('login-form')
if (form) {
    // Use form
}
```

#### `disposeForm(name: string): void`

Dispose a form by name.

**Parameters:**
- `name` - Form identifier

**Example:**
```typescript
formularManager.disposeForm('login-form')
```

---

## IFormularBase (Form Instance)

Represents a form instance with fields and validation.

### Properties

#### `name: string` (readonly)

The unique form identifier.

#### `isValid: boolean` (readonly)

Whether all fields in the form are valid.

#### `isDirty: boolean` (readonly)

Whether any field has been modified.

#### `isTouched: boolean` (readonly)

Whether any field has been focused.

#### `isSubmitting: boolean` (readonly)

Whether the form is currently submitting.

#### `submitCount: number` (readonly)

Number of times the form has been submitted.

#### `fields: Map<string, IInputBase>` (readonly)

Map of all form fields.

### Methods

#### `createField(name: string, config: IFieldConfig): IInputBase`

Create a new field in the form.

**Parameters:**
- `name` - Field identifier
- `config` - Field configuration

**Returns:** Field instance

**Example:**
```typescript
const emailField = form.createField('email', {
    type: 'email',
    label: 'Email Address',
    required: true,
    validation: new FormularManagerBuilder()
        .addValidation(Validators.email())
        .build()
})
```

#### `getField(name: string): IInputBase | null`

Get a field by name.

**Parameters:**
- `name` - Field identifier

**Returns:** Field instance or null

**Example:**
```typescript
const emailField = form.getField('email')
if (emailField) {
    console.log('Email value:', emailField.getValue())
}
```

#### `validate(): Promise<boolean>`

Validate all fields in the form.

**Returns:** Promise resolving to true if valid

**Example:**
```typescript
const isValid = await form.validate()
if (isValid) {
    console.log('Form is valid!')
}
```

#### `submit(): Promise<T | null>`

Validate and submit the form.

**Returns:** Promise resolving to form data if valid, null if invalid

**Example:**
```typescript
const data = await form.submit()
if (data) {
    console.log('Form submitted:', data)
    // Send to API
}
```

#### `getData(): T`

Get all form data.

**Returns:** Object with all field values

**Example:**
```typescript
const data = form.getData()
console.log(data)
// { email: 'user@example.com', password: '...' }
```

#### `setData(data: Partial<T>): void`

Set multiple field values.

**Parameters:**
- `data` - Object with field values

**Example:**
```typescript
form.setData({
    email: 'user@example.com',
    password: 'secure123'
})
```

#### `reset(): void`

Reset the form to initial state.

**Example:**
```typescript
form.reset()
```

#### `dispose(): void`

Dispose the form and clean up resources.

**Example:**
```typescript
form.dispose()
```

#### `on(event: string, handler: Function): ISubscription`

Subscribe to form events.

**Parameters:**
- `event` - Event name
- `handler` - Event handler function

**Returns:** Subscription object

**Events:**
- `field:changed` - Field value changed
- `validated` - Form validated
- `submitted` - Form submitted
- `reset` - Form reset

**Example:**
```typescript
const subscription = form.on('field:changed', (fieldName, value) => {
    console.log(`${fieldName} changed to:`, value)
})

// Unsubscribe
subscription.unsubscribe()
```

---

## IInputBase (Field Instance)

Represents a form field.

### Properties

#### `name: string` (readonly)

Field identifier.

#### `type: string` (readonly)

Field type (email, password, text, etc.).

#### `value: any`

Current field value.

#### `isValid: boolean` (readonly)

Whether the field is valid.

#### `isDirty: boolean` (readonly)

Whether the field has been modified.

#### `isTouched: boolean` (readonly)

Whether the field has been focused.

#### `errors: string[]` (readonly)

Array of validation error messages.

#### `required: boolean`

Whether the field is required.

#### `disabled: boolean`

Whether the field is disabled.

#### `readonly: boolean`

Whether the field is read-only.

### Methods

#### `getValue(): any`

Get the field value.

**Returns:** Field value

**Example:**
```typescript
const email = emailField.getValue()
```

#### `setValue(value: any): void`

Set the field value.

**Parameters:**
- `value` - New field value

**Example:**
```typescript
emailField.setValue('user@example.com')
```

#### `validate(): Promise<boolean>`

Validate the field.

**Returns:** Promise resolving to true if valid

**Example:**
```typescript
const isValid = await emailField.validate()
if (!isValid) {
    console.log('Errors:', emailField.getErrors())
}
```

#### `getErrors(): string[]`

Get validation error messages.

**Returns:** Array of error messages

**Example:**
```typescript
const errors = emailField.getErrors()
console.log(errors)
// ['Email is required', 'Invalid email format']
```

#### `reset(): void`

Reset field to initial value.

**Example:**
```typescript
emailField.reset()
```

#### `setDisabled(disabled: boolean): void`

Enable or disable the field.

**Parameters:**
- `disabled` - Whether to disable the field

**Example:**
```typescript
emailField.setDisabled(true)
```

#### `setReadonly(readonly: boolean): void`

Set field as read-only.

**Parameters:**
- `readonly` - Whether field is read-only

**Example:**
```typescript
emailField.setReadonly(true)
```

---

## Validators

Built-in validation functions.

### Methods

#### `required(message?: string): IValidator`

Require a value.

**Example:**
```typescript
Validators.required('This field is required')
```

#### `email(message?: string): IValidator`

Validate email format.

**Example:**
```typescript
Validators.email('Invalid email address')
```

#### `minLength(length: number, message?: string): IValidator`

Minimum string length.

**Example:**
```typescript
Validators.minLength(8, 'Minimum 8 characters')
```

#### `maxLength(length: number, message?: string): IValidator`

Maximum string length.

**Example:**
```typescript
Validators.maxLength(100, 'Maximum 100 characters')
```

#### `min(value: number, message?: string): IValidator`

Minimum numeric value.

**Example:**
```typescript
Validators.min(0, 'Must be positive')
```

#### `max(value: number, message?: string): IValidator`

Maximum numeric value.

**Example:**
```typescript
Validators.max(100, 'Maximum value is 100')
```

#### `pattern(regex: RegExp, message?: string): IValidator`

Match regex pattern.

**Example:**
```typescript
Validators.pattern(/^[A-Z]/, 'Must start with uppercase letter')
```

#### `matchField(fieldName: string, message?: string): IValidator`

Match another field's value.

**Example:**
```typescript
Validators.matchField('password', 'Passwords must match')
```

#### `phone(countries: string[], message?: string): IValidator`

Validate phone number for countries.

**Example:**
```typescript
Validators.phone(['US', 'CA', 'CH'], 'Invalid phone number')
```

#### `postalCode(countries: string[], message?: string): IValidator`

Validate postal code for countries.

**Example:**
```typescript
Validators.postalCode(['US', 'CH'], 'Invalid postal code')
```

#### `url(message?: string): IValidator`

Validate URL format.

**Example:**
```typescript
Validators.url('Invalid URL')
```

#### `number(message?: string): IValidator`

Validate numeric value.

**Example:**
```typescript
Validators.number('Must be a number')
```

#### `integer(message?: string): IValidator`

Validate integer value.

**Example:**
```typescript
Validators.integer('Must be an integer')
```

#### `date(message?: string): IValidator`

Validate date format.

**Example:**
```typescript
Validators.date('Invalid date')
```

#### `custom(fn: (value: any) => boolean | Promise<boolean>, message?: string): IValidator`

Custom validation function.

**Example:**
```typescript
Validators.custom(
    (value) => value !== 'admin',
    'Username "admin" is reserved'
)
```

---

## FormularManagerBuilder

Builder for creating complex validation configurations.

### Methods

#### `addValidation(validator: IValidator): FormularManagerBuilder`

Add a validator.

**Parameters:**
- `validator` - Validator instance

**Returns:** Builder instance (chainable)

**Example:**
```typescript
const validation = new FormularManagerBuilder()
    .addValidation(Validators.required())
    .addValidation(Validators.email())
    .addValidation(Validators.maxLength(100))
    .build()
```

#### `build(): IValidationConfig`

Build the validation configuration.

**Returns:** Validation configuration

**Example:**
```typescript
const config = builder.build()
```

---

## ValidationTranslationService

Service for managing multilingual validation messages.

### Methods

#### `setLocale(locale: SupportedLocale): void`

Change the current locale.

**Parameters:**
- `locale` - Locale code ('en', 'fr', 'es', 'de', 'pt', 'it')

**Example:**
```typescript
validationTranslationService.setLocale('fr')
```

#### `translate(key: ValidationLocalizeKeys, ...tokens: string[]): string`

Translate a validation message.

**Parameters:**
- `key` - Validation message key
- `tokens` - Replacement tokens

**Returns:** Translated message

**Example:**
```typescript
const message = validationTranslationService.translate(
    ValidationLocalizeKeys.minLengthError,
    '8'  // Token for minimum length
)
```

#### `addCustomTranslation(locale: SupportedLocale, key: ValidationLocalizeKeys, message: string): void`

Add or override a translation.

**Parameters:**
- `locale` - Locale code
- `key` - Validation message key
- `message` - Translation message

**Example:**
```typescript
validationTranslationService.addCustomTranslation(
    'en',
    ValidationLocalizeKeys.required,
    'This field is absolutely required!'
)
```

---

## NotificationManager

Service for reactive event notifications.

### Methods

#### `subscribe(event: string, handler: Function): ISubscription`

Subscribe to an event.

**Parameters:**
- `event` - Event name
- `handler` - Event handler function

**Returns:** Subscription object

**Example:**
```typescript
const subscription = notificationManager.subscribe(
    'field:changed',
    (fieldName, value) => {
        console.log(`${fieldName} = ${value}`)
    }
)

// Unsubscribe
subscription.unsubscribe()
```

#### `publish(event: string, ...args: any[]): void`

Publish an event.

**Parameters:**
- `event` - Event name
- `args` - Event arguments

**Example:**
```typescript
notificationManager.publish('field:changed', 'email', 'user@example.com')
```

#### `startBatch(): void`

Start batching notifications.

**Example:**
```typescript
notificationManager.startBatch()

// Multiple notifications
notificationManager.publish('event1', data1)
notificationManager.publish('event2', data2)

notificationManager.endBatch()  // All sent at once
```

#### `endBatch(): void`

End batching and send all notifications.

**Example:**
```typescript
notificationManager.endBatch()
```

---

## Type Definitions

### IFieldDescriptor

```typescript
interface IFieldDescriptor {
    name: string                    // Field identifier
    type: string                    // Input type
    label?: string                  // Display label
    placeholder?: string            // Placeholder text
    defaultValue?: any              // Initial value
    required?: boolean              // Required field
    disabled?: boolean              // Disabled field
    readonly?: boolean              // Read-only field
    validation?: IValidationConfig  // Validation configuration
    cssClass?: string               // Custom CSS classes
}
```

### IValidationConfig

```typescript
interface IValidationConfig {
    validators: IValidator[]        // Array of validators
}
```

### IValidator

```typescript
interface IValidator {
    validate(value: any): Promise<IValidationResult> | IValidationResult
}
```

### IValidationResult

```typescript
interface IValidationResult {
    isValid: boolean                // Whether validation passed
    errorMessage?: string           // Error message if invalid
}
```

### SupportedLocale

```typescript
type SupportedLocale = 'en' | 'fr' | 'es' | 'de' | 'pt' | 'it'
```

---

<div align="center">

**[⬆ Back to Top](#-api-reference)** | **[🏠 Home](./HOME.md)** | **[← Troubleshooting](./TROUBLESHOOTING.md)**

</div>
