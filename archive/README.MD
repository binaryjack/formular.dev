# formular.dev

<div align="center">

![Form Creation](https://img.shields.io/badge/100--field%20creation-70ms-brightgreen)
![Validation](https://img.shields.io/badge/100--field%20validation-30ms-brightgreen)
![Bundle Size](https://img.shields.io/badge/bundle%20size-45KB-brightgreen)
![Performance Tests](https://img.shields.io/badge/performance%20tests-100%25%20passing-brightgreen)
![Version](https://img.shields.io/badge/version-2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)

**The only form library you'll ever need.**  
Framework-agnostic • Schema-first • Type-safe • Enterprise-ready

[🚀 Quick Start](#quick-start) • [📖 Schema API](#schema-system) • [🎯 Simple API](#simple-api-createform) • [📚 Documentation](#documentation)

</div>

---

## What's New in v2.0

- ✨ **Schema-first API** - Inspired by Zod but optimized for forms
- 🔒 **Full type inference** - TypeScript types automatically derived from schemas
- 🚫 **No magic strings** - Type-safe everything (events, validators, field types)
- 🎯 **Simple API** - One-line form creation with `createForm()`
- 🌍 **Enhanced i18n** - Country-specific validators (phone, postal codes, SSN)
- 📦 **Submission strategies** - Flexible handling for different contexts
- ⚡ **Performance** - Sub-100ms for 100-field forms

## Why formular.dev?

### 🎯 True Framework Agnostic

Works seamlessly with React, Vue, Angular, and vanilla JavaScript using the **same API**. No framework lock-in, ever.

### ⚡ Production-Ready Performance

- **60-80ms** to create 100-field forms
- **30ms** validation with intelligent caching
- **45KB** core bundle (12KB gzipped)
- **Zero runtime dependencies**

### 🌍 Enterprise Features Built-In

- **6 languages** - English, French, Spanish, German, Portuguese, Italian
- **12+ country formats** - Phone, postal codes, SSN validation
- **IoC Container** - Dependency injection for testability
- **Full TypeScript** - Complete type safety

### 📊 Competitive Advantage

| Feature                | formular.dev v2.0 | React Hook Form | Formik        | TanStack Form |
| ---------------------- | ----------------- | --------------- | ------------- | ------------- |
| **Schema system**      | ✅ Built-in       | ⚠️ External     | ⚠️ External   | ⚠️ External   |
| **Type inference**     | ✅ Automatic      | ❌ Manual       | ❌ Manual     | ✅ Valibot    |
| **Framework support**  | ✅ All (same API) | ❌ React only   | ❌ React only | ⚠️ Adapters   |
| **Built-in i18n**      | ✅ 6 languages    | ❌              | ❌            | ❌            |
| **Country validators** | ✅ 12+ countries  | ❌              | ❌            | ❌            |
| **Zero dependencies**  | ✅                | ✅              | ❌ Lodash etc | ⚠️ Optional   |
| **Bundle size**        | 45KB (12KB gz)    | ~8KB            | ~30KB         | ~15-20KB      |

---

## Features

- 🚀 **Framework Agnostic** - Works with React, Vue, Angular, or vanilla JavaScript
- 📐 **Schema-First** - Define once, type-check everywhere with automatic inference
- ✅ **Advanced Validation** - 18+ built-in validators + custom validators
- 🌍 **Multilingual** - Built-in translations for 6 languages (EN, FR, ES, DE, PT, IT)
- ⚡ **High Performance** - Optimized validation caching and parallel processing
- 🎯 **Type Safe** - Full TypeScript support with comprehensive type definitions
- 🔧 **IoC Container** - Flexible dependency injection system
- 🌎 **Multi-Country** - Phone, postal, SSN validation for 12+ countries
- 🎨 **Form Presets** - Common patterns (login, signup, contact, etc.) ready to use
- 📦 **Submission Strategies** - Flexible handling for different contexts

## Installation

```bash
npm install formular.dev
# or
pnpm add formular.dev
# or
yarn add formular.dev
```

---

## Quick Start

### Simple API (`createForm`)

The easiest way to create forms in v2.0:

```typescript
import { createForm, f } from 'formular.dev'

// Define schema with full type inference
const userSchema = f.object({
    email: f.string().email().nonempty(),
    age: f.number().min(18).max(100),
    country: f.enum(['US', 'UK', 'FR', 'DE', 'CH'])
})

// TypeScript infers: { email: string, age: number, country: 'US' | 'UK' | ... }
type User = f.infer<typeof userSchema>

// Create form (one line!)
const form = createForm({
    schema: userSchema,
    onSubmit: async (data) => {
        await api.post('/users', data) // data is fully typed!
    },
    onSuccess: (response) => console.log('Success!', response),
    onError: (error) => console.error('Failed:', error)
})

// Submit
await form.submit()
```

### Traditional API (Service Manager)

For advanced scenarios with IoC container:

```typescript
import { SetupHelpers, FormularManager } from 'formular.dev'

// Initialize service manager
const serviceManager = SetupHelpers.forFormApplication()

// Create form manager
const formularManager = serviceManager.resolve<FormularManager>(Symbol.for('IFormularManager'))

// Create form from descriptors
const form = formularManager.createFromDescriptors('user-form', [
    {
        id: 1,
        name: 'email',
        label: 'Email Address',
        type: 'email',
        validation: Validators.email('email')
    }
])

// Validate
const isValid = await formularManager.validate('user-form')
```

---

## Schema System

### Basic Types

```typescript
import { f } from 'formular.dev'

// String
const nameSchema = f.string().min(2).max(50).nonempty().trim()

// Number
const ageSchema = f.number().min(18).max(100).int().positive()

// Boolean
const termsSchema = f.boolean().refine((val) => val === true, { message: 'Must accept terms' })

// Date
const birthDateSchema = f.date().max(new Date())

// Enum
const roleSchema = f.enum(['admin', 'user', 'guest'])

// Literal
const statusSchema = f.literal('active')
```

### String Validators

```typescript
f.string()
    .email() // Email format
    .url() // URL format
    .min(5) // Min length
    .max(100) // Max length
    .length(10) // Exact length
    .pattern(/^\d+$/) // Regex
    .nonempty() // Non-empty string
    .trim() // Trim whitespace
    .toLowerCase() // Convert to lowercase
    .toUpperCase() // Convert to uppercase
```

### Number Validators

```typescript
f.number()
    .min(0) // Minimum value
    .max(100) // Maximum value
    .int() // Integer only
    .positive() // > 0
    .negative() // < 0
    .nonnegative() // >= 0
    .nonpositive() // <= 0
    .multipleOf(5) // Multiple of value
    .finite() // Not Infinity
    .safe() // Within safe integer range
```

### Country-Specific Validators

```typescript
// Phone numbers (CH, US, UK, FR, DE, IT, ES, CA, AU, JP, NL, BE, AT)
f.string().phone('CH')

// Postal codes
f.string().postalCode('US')

// Swiss AHV (social security)
f.string().ahv()

// Example: Swiss user form
const swissUserSchema = f.object({
    email: f.string().email().nonempty(),
    phone: f.string().phone('CH'),
    postalCode: f.string().postalCode('CH'),
    ahv: f.string().ahv()
})
```

### Complex Types

```typescript
// Array
const tagsSchema = f.array(f.string()).min(1).max(10).nonempty()

// Object
const addressSchema = f.object({
    street: f.string().nonempty(),
    city: f.string().nonempty(),
    postalCode: f.string().postalCode('US')
})

// Nested objects
const userSchema = f.object({
    name: f.string(),
    address: f.object({
        street: f.string(),
        city: f.string()
    })
})

// Union
const statusSchema = f.union(f.literal('active'), f.literal('inactive'), f.literal('pending'))

// Record (key-value pairs)
const preferencesSchema = f.record(f.string(), f.boolean())
```

### Optional & Nullable

```typescript
const schema = f.object({
    requiredField: f.string(),
    optionalField: f.string().optional(), // string | undefined
    nullableField: f.string().nullable(), // string | null
    bothField: f.string().optional().nullable() // string | null | undefined
})
```

### Default Values

```typescript
const schema = f.object({
    role: f.string().default('user'),
    active: f.boolean().default(true),
    count: f.number().default(0)
})
```

### Transforms

```typescript
const schema = f.object({
    email: f.string().trim().toLowerCase().email(),
    price: f
        .string()
        .transform((val) => parseFloat(val))
        .refine((val) => val > 0, { message: 'Must be positive' })
})
```

### Custom Refinements

```typescript
const passwordSchema = f
    .string()
    .min(8)
    .refine((val) => /[A-Z]/.test(val), { message: 'Must contain uppercase' })
    .refine((val) => /[0-9]/.test(val), { message: 'Must contain number' })
```

---

## Form API

### Creating Forms

```typescript
import { createForm, f } from 'formular.dev'

const form = createForm({
    schema: f.object({
        email: f.string().email(),
        password: f.string().min(8)
    }),

    defaultValues: {
        email: '',
        password: ''
    },

    onSubmit: async (data) => {
        return await api.login(data)
    },

    onSuccess: (response, data) => {
        console.log('Login successful!', response)
        navigate('/dashboard')
    },

    onError: (error) => {
        console.error('Login failed:', error)
        toast.error(error.message)
    }
})
```

### Validation

```typescript
// Validate all fields
const isValid = await form.validateForm()

// Validate single field
form.validateField('email')

// Pre-validate (before blur/change)
const canUpdate = form.preValidateField('email')

// Get errors
const errors = form.getErrors()
// { email: [{ message: 'Invalid email', code: 'invalid_email' }] }
```

### Form State

```typescript
// Check form state
form.isValid // All fields valid
form.isDirty // Form modified
form.isBusy // Form submitting
form.submitCount // Number of submissions

// Get/set field values
const email = form.getField('email')?.value
form.updateField('email', 'user@example.com')

// Reset/clear form
form.reset() // Reset to initial values
form.clear() // Clear all values
```

### Submission

```typescript
// Submit form
const result = await form.submit()
if (result) {
    console.log('Form submitted:', result)
}
```

---

## Form Presets

Common form patterns ready to use:

```typescript
import { createFormFromPreset } from 'formular.dev'

// Login form
const loginForm = createFormFromPreset('login', {
    onSubmit: async (data) => await api.login(data)
})

// Signup form
const signupForm = createFormFromPreset('signup', {
    onSubmit: async (data) => await api.signup(data)
})

// Available presets:
// - login      - Login form (email, password)
// - signup     - Signup form (email, password, confirm)
// - contact    - Contact form (name, email, message)
// - profile    - Profile form (name, bio, etc.)
// - address    - Address form (street, city, postal)
// - payment    - Payment form (card details)
// - swiss-user - Swiss-specific user form
// - newsletter - Newsletter subscription
// - search     - Search form
```

### Custom Presets

```typescript
import { presetRegistry, f } from 'formular.dev'

presetRegistry.register({
    name: 'my-form',
    description: 'Custom form preset',
    schema: f.object({
        customField: f.string().nonempty()
    }),
    fields: {
        customField: {
            label: 'Custom Field',
            placeholder: 'Enter value'
        }
    }
})
```

---

## Submission Strategies

Control submission behavior for different contexts:

### Direct Strategy (Default)

```typescript
import { createForm, DirectSubmissionStrategy } from 'formular.dev'

const form = createForm({
    schema: userSchema,
    submissionStrategy: new DirectSubmissionStrategy(async (data) => await api.post('/users', data))
})
```

### Context Strategy (For Form Providers)

```typescript
import { createForm, ContextSubmissionStrategy } from 'formular.dev'

const form = createForm({
    schema: userSchema,
    submissionStrategy: new ContextSubmissionStrategy(
        async (data) => await api.post('/users', data),
        {
            isDismissed: () => userCanceledForm(),
            onValidationStart: () => setIsValidating(true),
            onValidationComplete: (isValid) => {
                setIsValidating(false)
                if (!isValid) showErrors()
            }
        }
    )
})
```

---

## Type Inference

```typescript
const schema = f.object({
    email: f.string(),
    age: f.number(),
    active: f.boolean(),
    role: f.enum(['admin', 'user']),
    profile: f.object({
        name: f.string(),
        bio: f.string().optional()
    }),
    tags: f.array(f.string())
})

// Infer TypeScript type
type User = f.infer<typeof schema>
/*
{
  email: string
  age: number
  active: boolean
  role: 'admin' | 'user'
  profile: {
    name: string
    bio?: string
  }
  tags: string[]
}
*/

// Use with createForm - data is fully typed!
const form = createForm({
    schema,
    onSubmit: (data: User) => {
        data.email // ✅ string
        data.role // ✅ 'admin' | 'user'
        data.profile.bio // ✅ string | undefined
    }
})
```

---

## Schema Composition

```typescript
// Base schemas
const baseUserSchema = f.object({
    email: f.string().email(),
    name: f.string()
})

// Extend
const adminSchema = baseUserSchema.extend({
    role: f.literal('admin'),
    permissions: f.array(f.string())
})

// Pick specific fields
const loginSchema = baseUserSchema.pick(['email'])

// Omit fields
const publicSchema = baseUserSchema.omit(['email'])

// Make all fields optional
const updateSchema = baseUserSchema.partial()

// Make all fields required
const strictSchema = updateSchema.required()

// Merge schemas
const mergedSchema = schema1.merge(schema2)
```

---

## Error Handling

```typescript
import { SchemaValidationError } from 'formular.dev'

try {
    const result = await form.submit()
} catch (error) {
    if (error instanceof SchemaValidationError) {
        console.log(error.code) // Error code
        console.log(error.path) // Field path
        console.log(error.errors) // All validation errors
    }
}
```

---

## Traditional API (Advanced)

## Traditional API (Advanced)

For advanced use cases with IoC container and custom services:

### Service Manager

formular.dev uses an IoC (Inversion of Control) container for dependency injection:

```typescript
import { SetupHelpers } from 'formular.dev'

// Full-featured setup for form applications
const serviceManager = SetupHelpers.forFormApplication()

// Minimal setup for custom implementations
const minimalSM = SetupHelpers.forCustomImplementation()

// Testing environment setup
const testingSM = SetupHelpers.forTesting()
```

### Form Manager

### Form Manager

```typescript
const formularManager = serviceManager.resolve(Symbol.for('IFormularManager'))

// Create form from field descriptors
const form = formularManager.createFromDescriptors('my-form', fieldDescriptors)

// Create form from schema
const schemaForm = formularManager.createFromSchema(entitySchema)

// Create empty form and add fields dynamically
const emptyForm = formularManager.createEmpty('dynamic-form')

// Get form data
const formData = formularManager.getData('my-form')

// Validate specific form
const isValid = await formularManager.validate('my-form')
```

### Built-in Validators

```typescript
import { Validators } from 'formular.dev'

// Email validation
const emailValidation = Validators.email('email')

// Phone validation
const phoneValidation = Validators.phone('phone')

// Age validation
const ageValidation = Validators.age('age', 18, 100)

// Password validation
const passwordValidation = Validators.passwordStrong('password')
```

### Multilingual Validation

```typescript
import {
    createCommonLocalizedValidators,
    ValidationLocalizeKeys,
    createLocalizedValidator
} from 'formular.dev'

// Create validators with French messages
const localizedValidators = createCommonLocalizedValidators('email', {
    locale: 'fr'
})

// Use localized validator
const emailField = {
    name: 'email',
    validation: localizedValidators.pattern(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        ValidationLocalizeKeys.emailError,
        ValidationLocalizeKeys.emailGuide
    )
}
```

### Country-Specific Validators (Traditional API)

```typescript
import { phoneCountryValidator, postalCodeCountryValidator, ahvValidator } from 'formular.dev'

// Swiss phone number
const swissPhone = phoneCountryValidator('phone', 'CH')

// German postal code
const germanPostal = postalCodeCountryValidator('postal', 'DE')

// Swiss AHV (social security number)
const ahv = ahvValidator('ahv')
```

---

## Available Validators

## Available Validators

formular.dev includes 18+ built-in validators plus country-specific validators:

**Basic Validators:**

- `email` - Email validation
- `phone` - Phone number validation
- `firstName`, `lastName`, `fullName` - Name validation
- `passwordStrong`, `passwordMedium` - Password strength validation
- `url` - URL validation
- `creditCard` - Credit card validation
- `postalCode` - Postal/ZIP code validation
- `ssn` - Social security number validation
- `currency` - Currency validation
- `age` - Age range validation
- `username` - Username validation
- `time` - Time format validation
- `numeric` - Numeric value validation
- `date` - Date validation

**Country-Specific Validators:**

Support for 12+ countries including:

- 🇨🇭 Switzerland: `phone('CH')`, `postalCode('CH')`, `ahv()`
- 🇺🇸 United States: `phone('US')`, `postalCode('US')`, `ssn('US')`
- 🇬🇧 United Kingdom: `phone('UK')`, `postalCode('UK')`
- 🇫🇷 France: `phone('FR')`, `postalCode('FR')`
- 🇩🇪 Germany: `phone('DE')`, `postalCode('DE')`
- 🇮🇹 Italy: `phone('IT')`, `postalCode('IT')`
- 🇪🇸 Spain: `phone('ES')`, `postalCode('ES')`
- 🇨🇦 Canada: `phone('CA')`, `postalCode('CA')`
- 🇦🇺 Australia: `phone('AU')`, `postalCode('AU')`
- 🇯🇵 Japan: `phone('JP')`, `postalCode('JP')`
- 🇳🇱 Netherlands: `phone('NL')`, `postalCode('NL')`
- 🇧🇪 Belgium: `phone('BE')`, `postalCode('BE')`
- 🇦🇹 Austria: `phone('AT')`, `postalCode('AT')`

---

---

## Internationalization (i18n)

Built-in support for 6 languages with all translations included:

- 🇬🇧 English (en)
- 🇫🇷 French (fr)
- 🇪🇸 Spanish (es)
- 🇩🇪 German (de)
- 🇵🇹 Portuguese (pt)
- 🇮🇹 Italian (it)

**All translations are fully overridable and extensible!**

---

## Integration with Pulsar UI

```typescript
import { createForm, f, ContextSubmissionStrategy } from 'formular.dev'
import { FormProvider } from '@pulsar-framework/pulsar-formular-ui'

const userSchema = f.object({
  email: f.string().email().nonempty(),
  name: f.string().min(2).nonempty()
})

const MyForm = () => {
  const [isDismissed, setIsDismissed] = createSignal(false)
  const [isValidating, setIsValidating] = createSignal(false)

  const form = useMemo(() => createForm({
    schema: userSchema,
    submissionStrategy: new ContextSubmissionStrategy(
      async (data) => await api.post('/users', data),
      {
        isDismissed: () => isDismissed(),
        onValidationStart: () => setIsValidating(true),
        onValidationComplete: (isValid) => setIsValidating(false)
      }
    )
  }), [])

  return (
    <FormProvider
      form={form}
      data={userData}
      onSaveCallback={handleSave}
      onQuitCallback={handleQuit}
    >
      <InputField name="email" />
      <InputField name="name" />
    </FormProvider>
  )
}
```

---

## Documentation

### Comprehensive Guides

- **[Channel-Based Messaging Architecture](./ARCHITECTURE-CHANNEL-BASED-MESSAGING.md)** - Technical implementation of the message bus system
- **[Comparison with Other Libraries](./COMPARISON.md)** - Side-by-side comparison with React Hook Form, Formik, and TanStack Form
- **[Field Types UI Guide](./FIELD-TYPES-UI-GUIDE.md)** - Complete guide to available field types and UI components
- **[Form Context Integration](./FORM-CONTEXT-INTEGRATION.md)** - Integration with form providers and context
- **[Implementation Summary](./IMPLEMENTATION-SUMMARY.md)** - Summary of v2.0 implementation details

### Examples in Codebase

Comprehensive examples are available in the source code:

- **[Configuration Manager Examples](./src/core/managers/configuration-manager/examples.ts)** - 9 detailed examples
- **[Service Manager Examples](./src/core/managers/service-manager/examples/)** - IoC container usage
- **[Country Validator Demo](./src/core/managers/validation-manager/validation-schema/validators/country-validator-demo.ts)** - 280+ lines of country-specific validation examples
- **[Test Suite](./src/__tests__/)** - Extensive test coverage with real-world patterns

---

## Performance

- **Form Creation**: 60-80ms for 100-field forms
- **Validation**: ~30ms with intelligent caching (40-50% faster)
- **Bundle Size**: 45KB (12KB gzipped)
- **Dependencies**: Zero runtime dependencies
- **Memory**: 40-50% reduction with channel-based architecture

---

## Main Exports

### Simple API (v2.0)

```typescript
// Form creation
import { createForm, createFormFromPreset, f } from 'formular.dev'

// Submission strategies
import { DirectSubmissionStrategy, ContextSubmissionStrategy } from 'formular.dev'

// Error handling
import { SchemaValidationError } from 'formular.dev'
```

### Traditional API

```typescript
// Service Manager Setup
import { SetupHelpers, ServiceManagerFactory } from 'formular.dev'

// Form Management
import { FormularManager, Formular } from 'formular.dev'

// Validators
import { Validators } from 'formular.dev'

// Localization
import {
    createCommonLocalizedValidators,
    createLocalizedValidator,
    ValidationLocalizeKeys
} from 'formular.dev'

// Schema & Types
import { FieldDescriptor, FieldSchemaBuilder } from 'formular.dev'
import type { IFormularManager, IFormular, IServiceManager } from 'formular.dev'
```

---

## Architecture

formular.dev v2.0 uses a **channel-based message bus architecture** for optimal field isolation and memory efficiency:

### Key Benefits

- **Field Isolation** - Channel-based routing prevents cross-field contamination
- **Memory Efficient** - Singleton managers instead of N instances per field (40-50% reduction)
- **Observable Pattern** - Built on `ObservableSubject` with weak/strong reference support
- **Standard Patterns** - Familiar pub-sub pattern
- **Backward Compatible** - Supports both legacy and channel-based APIs

### Channel-Based Messaging

```typescript
// Field managers subscribe to specific channels
notificationManager.observers.subscribe('field-123', callback, useWeak)

// Triggers only affect subscribers of that channel
notificationManager.observers.trigger('field-123')

// Supports debounced triggers per channel
notificationManager.observers.debounceTrigger('field-123', 300)
```

This architecture enables formular.dev to handle **100+ field forms** with sub-100ms rendering while maintaining complete field isolation and type safety.

See [Channel-Based Messaging Architecture](./ARCHITECTURE-CHANNEL-BASED-MESSAGING.md) for more details.

---

## Dependencies

This package has **zero runtime dependencies** for maximum compatibility and minimal bundle size. Development dependencies include TypeScript and testing tools.

The optional `shared-assets` package provides logo icons and other shared resources when needed.

---

## License

MIT © 2025 Piana Tadeo
