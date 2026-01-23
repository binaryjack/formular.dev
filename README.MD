# formular.dev Library

<div align="center">

![Form Creation](https://img.shields.io/badge/100--field%20creation-70ms-brightgreen)
![Validation](https://img.shields.io/badge/100--field%20validation-30ms-brightgreen)
![Bundle Size](https://img.shields.io/badge/bundle%20size-45KB-brightgreen)
![Performance Tests](https://img.shields.io/badge/performance%20tests-100%25%20passing-brightgreen)

**The only form library you'll ever need.**  
Framework-agnostic • Enterprise-ready • Lightning-fast

[🚀 Quick Start](#quick-start) • [📖 Core Concepts](#core-concepts) • [📋 Examples](#examples-in-codebase)

</div>

---

## Why formular.dev?

### 🎯 True Framework Agnostic

The **only** form library that works seamlessly with React, Vue, Angular, and vanilla JavaScript using the **same API**. No framework lock-in, ever.

### ⚡ Production-Ready Performance

- **Sub-100ms** rendering for 100-field forms
- **40-50% faster** validation with intelligent caching
- **45KB** core bundle (12KB gzipped) with **zero runtime dependencies**

### 🌍 Enterprise Features Built-In

- **6 languages included** - English, French, Spanish, German, Portuguese, Italian
- **12+ country formats** - Phone, postal codes, SSN validation
- **IoC Container** - Dependency injection for testability
- **Full TypeScript** - Type-safe form handling

### 📊 Competitive Performance

| Feature               | formular.dev     | React Hook Form | Formik        |
| --------------------- | ---------------- | --------------- | ------------- |
| **100-field form**    | 60-80ms          | ~25ms           | ~60ms         |
| **Framework support** | ✅ All           | ❌ React only   | ❌ React only |
| **Built-in i18n**     | ✅ 6 languages   | ❌              | ❌            |
| **Multi-country**     | ✅ 12+ countries | ❌              | ❌            |
| **Zero dependencies** | ✅               | ✅              | ❌            |

---

## Features

- 🚀 **Framework Agnostic** - Works with React, Vue, Angular, or vanilla JavaScript
- ✅ **Advanced Validation** - 18+ built-in validators with custom validation support
- 🌍 **Multilingual** - Built-in translations for 6 languages (EN, FR, ES, DE, PT, IT)
- ⚡ **High Performance** - Optimized validation caching and parallel processing
- 🎯 **Type Safe** - Full TypeScript support with comprehensive type definitions
- 🔧 **IoC Container** - Flexible dependency injection system
- 📱 **Responsive** - Built-in responsive layout utilities
- 🌎 **Multi-Country** - Phone, postal, SSN validation for 12+ countries

## Installation

```bash
npm install formular.dev
# or
pnpm add formular.dev
# or
yarn add formular.dev
```

## Quick Start

### Setup

First, initialize the formular.dev service container:

```typescript
import { SetupHelpers } from 'formular.dev'

// Create service manager with all form features
const serviceManager = SetupHelpers.forFormApplication()
```

### Basic Form with Validation

```typescript
import { SetupHelpers, FormularManager, Validators } from 'formular.dev'
import { FieldDescriptor } from 'formular.dev'

// Initialize service manager
const serviceManager = SetupHelpers.forFormApplication()

// Create form manager
const formularManager = serviceManager.resolve<FormularManager>(Symbol.for('IFormularManager'))

// Define form fields
const fieldDescriptors: FieldDescriptor[] = [
    {
        id: 1,
        name: 'email',
        label: 'Email Address',
        type: 'email',
        validation: Validators.email('email')
    }
]

// Create form from descriptors
const form = formularManager.createFromDescriptors('user-form', fieldDescriptors)

// Validate form
const isValid = await formularManager.validate('user-form')

if (isValid) {
    const data = formularManager.getData('user-form')
    console.log('Form is valid!', data)
}
```

### Using Built-in Validators

```typescript
import { Validators } from 'formular.dev'

// Email validation
const emailValidation = Validators.email('email')

// Phone validation
const phoneValidation = Validators.phone('phone')

// Age validation
const ageValidation = Validators.age('age', 18, 100)

// Custom validators can be combined
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

### Country-Specific Validation

```typescript
import { phoneCountryValidator, postalCodeCountryValidator, ahvValidator } from 'formular.dev'

// Swiss phone number
const swissPhone = phoneCountryValidator('phone', 'CH')

// German postal code
const germanPostal = postalCodeCountryValidator('postal', 'DE')

// Swiss AHV (social security number)
const ahv = ahvValidator('ahv')
```

## Core Concepts

### Service Manager

formular.dev uses an IoC (Inversion of Control) container for dependency injection. The `ServiceManager` manages all services and dependencies:

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

The `FormularManager` is the central service for creating and managing forms:

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

### Available Validators

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

- `phoneCountry`, `phoneMultiCountry`, `phoneSwitzerland`
- `postalCodeCountry`, `postalCodeMultiCountry`, `npa` (Swiss postal)
- `ssnCountry`, `ssnMultiCountry`, `ahv` (Swiss SSN)
- Support for 12+ countries: CH, DE, AT, FR, IT, ES, UK, US, CA, AU, NL, BE

## Documentation

- Examples in Codebase

Comprehensive examples are available in the source code:

- **[Configuration Manager Examples](./src/core/managers/configuration-manager/examples.ts)** - 9 detailed examples covering:
    - Basic setup and default configuration
    - Creating custom configurations
    - Loading configuration from JSON
    - Multi-environment setups
    - Localization configuration
    - Validation patterns
    - Runtime configuration updates
    - Error handling

- **[Service Manager Examples](./src/core/managers/service-manager/examples/)** - IoC container usage:
    - Lazy resolution patterns
    - Integration examples
    - Dependency injection

- **[Country Validator Demo](./src/core/managers/validation-manager/validation-schema/validators/country-validator-demo.ts)** - Country-specific validation:
    - Swiss phone, postal, and AHV validation
    - Multi-country validation patterns
    - Pattern management utilities
    - 280+ lines of comprehensive examples

- **[Test Suite](./src/__tests__/)** - Extensive test coverage demonstrating:
    - Real-world usage patterns
    - Edge cases and validation
    - Integration scenario

- 🇬🇧 English (en)
- 🇫🇷 French (fr)
- 🇪🇸 Spanish (es)
- 🇩🇪 German (de)
- 🇵🇹 Portuguese (pt)
- 🇮🇹 Italian (it)

**All translations are fully overridable and extensible!**

## Main Exports

### Core Services

```typescript
// Service Manager Setup
import { SetupHelpers, ServiceManagerFactory } from 'formular.dev'

// Form Management
import { FormularManager, Formular } from 'formular.dev'

// Configuration Management
import { ConfigurationManager } from 'formular.dev'
```

### Validators

```typescript
// Built-in validators object
import { Validators } from 'formular.dev'

// Individual validator imports
import {
    eMailValidator,
    phoneValidator,
    passwordStrongValidator,
    ageValidator
    // ... and more
} from 'formular.dev'

// Country-specific validators
import {
    phoneCountryValidator,
    postalCodeCountryValidator,
    ahvValidator,
    npaValidator
} from 'formular.dev'
```

### Localization

```typescript
// Localized validator creation
import {
    createCommonLocalizedValidators,
    createLocalizedValidator,
    ValidationLocalizeKeys,
    ValidationTranslationService
} from 'formular.dev'
```

### Schema & Types

```typescript
// Field descriptors and schemas
import { FieldDescriptor, FieldSchemaBuilder, IEntityScheme } from 'formular.dev'

// Type definitions
import type { IFormularManager, IFormular, IServiceManager } from 'formular.dev'
```

## Dependencies

This package depends on `shared-assets` for logo icons and other shared resources. Ensure `shared-assets` is installed and referenced correctly.

## License

MIT © 2025 Piana Tadeo
