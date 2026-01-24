# formular.dev v2.0 - Schema-First Form Management

**Zero dependencies • Type-safe • Framework-agnostic**

## What's New in v2.0

- ✨ **Schema-first API** inspired by Zod but optimized for forms
- 🔒 **Full type inference** - TypeScript types automatically derived from schemas
- 🚫 **No magic strings** - Type-safe everything (events, validators, field types)
- 🌍 **Built-in i18n** with country-specific validators (phone, postal, SSN)
- 🎯 **Strategy pattern** for flexible submission handling
- 📦 **45KB** (12KB gzipped), zero runtime dependencies
- ⚡ **Performance** - Sub-100ms for 100-field forms

## Quick Start

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
    }
})

// Submit
await form.submit()
```

## Schema System

### Basic Types

```typescript
import { f } from 'formular.dev'

// String
const nameSchema = f.string().min(2).max(50).nonempty().trim()

// Number
const ageSchema = f.number().min(18).max(100).int().positive()

// Boolean
const termsSchema = f.boolean().refine((val) => val === true, { message: 'You must accept terms' })

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

### Country-Specific Validators

```typescript
// Phone numbers (CH, US, UK, FR, DE, IT, ES, CA, AU, JP)
f.string().phone('CH')

// Postal codes
f.string().postalCode('US')

// Swiss AHV (social security)
f.string().ahv()

// Example: Swiss user form
const swissUserSchema = f.object({
    email: f.string().email(),
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

// Record
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
// Transform input
const schema = f.object({
    email: f.string().trim().toLowerCase().email(),

    price: f
        .string()
        .transform((val) => parseFloat(val))
        .refine((val) => val > 0)
})
```

### Custom Refinements

```typescript
const passwordSchema = f
    .string()
    .min(8)
    .refine((val) => /[A-Z]/.test(val), { message: 'Must contain uppercase letter' })
    .refine((val) => /[0-9]/.test(val), { message: 'Must contain a number' })
```

## Form API

### Basic Form Creation

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
        await api.login(data)
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

// Get/set field values
const email = form.getField('email')?.value
form.updateField('email', 'user@example.com')

// Reset form
form.reset()

// Clear form
form.clear()
```

### Submission

```typescript
// Submit form
const result = await form.submit()
if (result) {
    console.log('Form submitted:', result)
}

// Submission count
console.log(`Submitted ${form.submitCount} times`)
```

## Presets

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
// - login
// - signup
// - contact
// - profile
// - address
// - payment
// - swiss-user
// - newsletter
// - search
```

### Custom Presets

```typescript
import { presetRegistry, f } from 'formular.dev'

presetRegistry.register({
    name: 'my-form',
    description: 'Custom form preset',
    schema: f.object({
        // your schema
    }),
    fields: {}
})
```

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

### Context Strategy (For FormProvider)

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

## Integration with FormContext (Pulsar)

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

// Use with createForm
const form = createForm({
    schema,
    onSubmit: (data: User) => {
        data.email // ✅ string
        data.role // ✅ 'admin' | 'user'
        data.profile.bio // ✅ string | undefined
    }
})
```

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

## Advanced Usage

### Schema Composition

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

// Pick
const loginSchema = baseUserSchema.pick(['email'])

// Omit
const publicSchema = baseUserSchema.omit(['email'])

// Partial (all fields optional)
const updateSchema = baseUserSchema.partial()
```

### Conditional Validation

```typescript
const schema = f
    .object({
        country: f.enum(['US', 'UK', 'FR']),
        phone: f.string()
    })
    .refine(
        (data) => {
            if (data.country === 'US') {
                return /^\d{10}$/.test(data.phone)
            }
            return true
        },
        { message: 'Invalid US phone number' }
    )
```

## Performance

```typescript
import { createForm, f } from 'formular.dev'

// 100-field form: ~70ms
const largeSchema = f.object({
    field1: f.string(),
    field2: f.string()
    // ... 100 fields
})

const form = createForm({ schema: largeSchema })
// Validation: ~30ms
await form.validateForm()
```

## Comparison

| Feature                   | formular.dev v2.0 | Zod  | TanStack Forms |
| ------------------------- | ----------------- | ---- | -------------- |
| **Type Inference**        | ✅                | ✅   | ✅             |
| **Zero Dependencies**     | ✅                | ❌   | ✅             |
| **Framework Agnostic**    | ✅                | ✅   | ⚠️             |
| **Country Validators**    | ✅ (12+)          | ❌   | ❌             |
| **Built-in i18n**         | ✅ (6 langs)      | ❌   | ❌             |
| **Form Presets**          | ✅                | ❌   | ❌             |
| **Bundle Size**           | 45KB              | 15KB | 15-20KB        |
| **Submission Strategies** | ✅                | ❌   | ⚠️             |

## License

MIT © Piana Tadeo
