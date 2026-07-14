# formular.dev

[![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)](https://github.com/binaryjack/formular.dev)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/binaryjack/formular.dev)
[![Test Suite](https://img.shields.io/badge/tests-450%20passing-brightgreen.svg)](https://github.com/binaryjack/formular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue.svg)](https://github.com/binaryjack/formular.dev)
[![License](https://img.shields.io/badge/license-AGPLv3-green.svg)](LICENSE)

An advanced, high-performance, schema-first form management and validation engine for modern TypeScript and JavaScript applications.

This framework is framework-agnostic, type-safe, and optimized for complex enterprise-grade forms with zero runtime dependencies.

## Key Features

* **Framework Agnostic**: Core business logic and validation run independently of UI frameworks. Works seamlessly with React, Vue, Svelte, Angular, or Vanilla JS.
* **Schema-First Design**: Define forms using a declarative, fluent schema builder (similar to Zod) and automatically infer complete TypeScript types.
* **Performance-First Architecture**: Features a channel-based event bus that isolates field updates, minimizing dirty checks and maximizing responsiveness (sub-100ms initialization for 100+ fields, ~30ms validation).
* **Inversion of Control (IoC)**: Built on a robust Dependency Injection container (`ServiceManager`), allowing developers to swap or extend core services (validation, configurations, events) seamlessly.
* **Prototype-Based Classes**: Leverages explicit prototype manipulation instead of ES6 class syntax sugar. This yields highly optimized execution speed and minimal bundle footprints.
* **Built-in Localization (i18n)**: Ships with translation assets and localized validators for 6 languages: English, French, Spanish, German, Portuguese, and Italian.
* **Country-Specific Validation**: Includes out-of-the-box validation rules for 12+ countries, including specialized format checks like Swiss AHV/social security and US SSN.
* **Submission Strategies**: Extensible submission handling (e.g. `DirectSubmissionStrategy`, `ContextSubmissionStrategy`) to adapt to different runtime contexts and state managers.

---

## Installation

Install the package via your preferred package manager:

```bash
pnpm add formular.dev
```

Or using npm or Yarn:

```bash
npm install formular.dev
# or
yarn add formular.dev
```

---

## Quick Start (Simple API)

The Simple API allows you to create fully-functional forms in a single step, hiding the underlying Dependency Injection setup while keeping complete type safety.

```typescript
import { createForm, f } from 'formular.dev';

// 1. Define your schema with type-safe constraints
const signUpSchema = f.object({
    username: f.string().min(3).max(30).nonempty(),
    email: f.string().email().nonempty(),
    age: f.number().min(18).max(120),
    acceptTerms: f.boolean().refine((val) => val === true, {
        message: 'You must accept the terms and conditions'
    })
});

// 2. Infer TypeScript types automatically from the schema
type SignUpData = f.infer<typeof signUpSchema>;

// 3. Create the form instance (asynchronous operation)
const form = await createForm({
    schema: signUpSchema,
    defaultValues: {
        username: '',
        email: '',
        age: 18,
        acceptTerms: false
    },
    onSubmit: async (data: SignUpData) => {
        // data is strongly typed here
        await api.post('/register', data);
    },
    onSuccess: (response, data) => {
        console.log('Registration successful:', response);
    },
    onError: (error) => {
        console.error('Registration failed:', error.message);
    }
});

// 4. Introspect and update values programmatically
form.updateField('username', 'alex_dev');
console.log(form.getField('username')?.value); // 'alex_dev'

// 5. Run form submission (triggers schema validation automatically)
const success = await form.submit();
if (success) {
    console.log('Form validated and submitted successfully');
}

// 6. Clean up resources and dispose of the IoC container
form.destroy();
```

---

## Schema Builder API

The schema builder `f` provides a fluent, zero-dependency interface to build complex validation structures.

### Supported Data Types

* `f.string()`: Matches string values.
* `f.number()`: Matches numeric values.
* `f.boolean()`: Matches boolean values.
* `f.date()`: Matches Date objects.
* `f.literal(value)`: Matches an exact literal value (string, number, or boolean).
* `f.enum([val1, val2])`: Matches any value in the provided read-only list.
* `f.array(schema)`: Matches an array of elements conforming to the child schema.
* `f.object(shape)`: Matches an object conforming to the given shape.
* `f.union(schema1, schema2)`: Matches any of the provided sub-schemas.
* `f.record(keySchema, valueSchema)`: Matches an object map of key-value pairs.

### Built-in Modifiers and Constraints

Every schema type supports standard modifiers:

* `.optional()`: Allows `undefined` values.
* `.nullable()`: Allows `null` values.
* `.default(value)`: Sets a fallback value when the field is empty or undefined.
* `.transform(fn)`: Transforms the output value.
* `.refine(predicate, options)`: Applies a custom validation function with custom error messages.

#### String Constraints
```typescript
f.string()
    .email()             // Format check for email
    .url()               // Format check for URL
    .min(length)         // Minimum character length
    .max(length)         // Maximum character length
    .length(exact)       // Exact character length
    .pattern(regex)      // Custom regular expression match
    .nonempty()          // Requires a non-empty string
    .trim()              // Trims whitespace (transformation)
    .toLowerCase()       // Converts to lowercase (transformation)
    .toUpperCase();      // Converts to uppercase (transformation)
```

#### Number Constraints
```typescript
f.number()
    .min(value)          // Minimum value
    .max(value)          // Maximum value
    .int()               // Requires an integer
    .positive()          // Greater than zero
    .negative()          // Less than zero
    .nonnegative()       // Greater than or equal to zero
    .nonpositive()       // Less than or equal to zero
    .multipleOf(step)    // Must be a multiple of the step value
    .finite()            // Prevents Infinity / -Infinity
    .safe();             // Within Number.MIN_SAFE_INTEGER and MAX_SAFE_INTEGER
```

### Country-Specific Validation

Validation for country-specific fields is built into the string schema builder:

```typescript
// Phone number validation (CH, US, UK, FR, DE, IT, ES, CA, AU, JP, NL, BE, AT)
f.string().phone('CH');

// Postal/ZIP code validation
f.string().postalCode('US');

// Swiss AHV (social security number) validation
f.string().ahv();
```

---

## Form Presets

Pre-configured schemas and layouts for standard forms are registered in the global registry and can be loaded directly:

```typescript
import { createFormFromPreset } from 'formular.dev';

const loginForm = await createFormFromPreset('login', {
    onSubmit: async (data) => {
        await auth.login(data.email, data.password);
    }
});
```

### Built-in Presets

| Preset Name | Purpose | Fields Included |
|---|---|---|
| `login` | Standard authentication | `email`, `password`, `rememberMe` |
| `signup` | User registration | `name`, `email`, `password`, `confirmPassword`, `acceptTerms` |
| `contact` | Feedback or contact queries | `name`, `email`, `subject`, `message` |
| `profile` | User profile details | `firstName`, `lastName`, `email`, `phone`, `bio`, `avatar` |
| `address` | Shipping/Billing locations | `street`, `city`, `postalCode`, `country` |
| `payment` | Credit card credentials | `cardNumber`, `cardHolder`, `expiryMonth`, `expiryYear`, `cvv` |
| `swiss-user`| Switzerland-localized profile | `firstName`, `lastName`, `email`, `phone`, `postalCode`, `ahv` |
| `newsletter`| Newsletter subscription | `email`, `preferences` |
| `search` | Content querying and filtering | `query`, `category`, `sortBy`, `dateFrom`, `dateTo` |

Custom presets can be registered programmatically:
```typescript
import { presetRegistry, f } from 'formular.dev';

presetRegistry.register({
    name: 'custom-preset',
    description: 'A custom organization form',
    schema: f.object({
        orgName: f.string().nonempty(),
        taxId: f.string().nonempty()
    }),
    fields: {}
});
```

---

## Advanced API (Dependency Injection)

For complex, dynamic, or highly customized validation structures, you can interact directly with the Inversion of Control (IoC) container.

```typescript
import { SetupHelpers, SFormularManager } from 'formular.dev';
import type { IFormularManager } from 'formular.dev';

// 1. Initialize a full-featured container
const serviceManager = SetupHelpers.forFormApplication();

// 2. Resolve the form manager service using its unique symbol
const formularManager = serviceManager.resolve<IFormularManager>(SFormularManager);

// 3. Create a form from field descriptors
const form = await formularManager.createFromDescriptors('advanced-form', [
    {
        id: 1,
        name: 'email',
        label: 'Email Address',
        type: 'email',
        value: '',
        defaultValue: '',
        isValid: false,
        isDirty: false,
        isPristine: true,
        isFocus: false,
        shouldValidate: true,
        errors: [],
        guides: [],
        options: [],
        validationOptions: {
            required: { value: true, error: { message: 'Email is required', code: 'required' } }
        }
    }
]);

// 4. Validate the form by its registered key
const isValid = await formularManager.validate('advanced-form');
```

---

## Submission Strategies

Submission strategies control form behaviors like validation callbacks and submission states:

### Direct Submission Strategy

The default strategy, which submits form data directly to a handler:

```typescript
import { DirectSubmissionStrategy } from 'formular.dev';

const directStrategy = new DirectSubmissionStrategy(async (data) => {
    return await api.submit(data);
});
```

### Context Submission Strategy

A strategy designed for integration with stateful wrappers (like component providers) that need hooks for validation start/complete and dismissal checks:

```typescript
import { ContextSubmissionStrategy } from 'formular.dev';

const contextStrategy = new ContextSubmissionStrategy(
    async (data) => {
        return await api.submit(data);
    },
    {
        isDismissed: () => checkUserCanceled(),
        onValidationStart: () => setValidationIndicator(true),
        onValidationComplete: (isValid) => {
            setValidationIndicator(false);
            if (!isValid) reportFailures();
        }
    }
);
```

---

## Error Handling

Validation failures throw a specialized `SchemaValidationError` containing context about the failing paths:

```typescript
import { SchemaValidationError } from 'formular.dev';

try {
    await form.submit();
} catch (error) {
    if (error instanceof SchemaValidationError) {
        console.error('Validation failed code:', error.code);
        console.error('Validation error path:', error.path); // e.g. ['address', 'postalCode']
        console.error('List of errors:', error.errors);
    }
}
```

---

## Architecture and Performance

### Channel-Based Messaging

Traditional form engines validate by traversing entire object trees or triggering global context re-renders. `formular.dev` isolates fields through a channel-based pub-sub messaging system. 

```
[Field Component] --(updates)--> [Notification Channel] --(triggers)--> [Specific Validator]
```

When a field changes or blurs:
1. It publishes a notification to its specific channel key (e.g. `field_name`).
2. Only managers and observers subscribed to that channel key execute validation or update states.
3. Debouncing and weak reference retention are handled natively, preventing memory leaks and UI thread blockages.

This architecture ensures constant-time `O(1)` validation dispatching, even in forms with hundreds of inputs.

---

## License

This project is licensed under the AGPLv3 License - see the [LICENSE](LICENSE) file for details.

