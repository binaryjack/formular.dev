# FORMULAR

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

FORMULAR is built using a combination of design patterns and modular architecture to provide a robust and extensible framework for form management. Below, we detail how to define form schemas, convert them into usable forms, and the patterns used in the library.

### Defining Form Schemas

FORMULAR uses schema definitions to describe the structure and behavior of forms. These schemas are defined using builders, which allow for a declarative and flexible approach.

#### Example: Defining a Form Schema

```ts
// filepath: src/demo/form-demo/form-demo.schema.ts
import { IEntityScheme } from '@core/framework/schema/entity-schema/entity.schema.types'
import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'
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

We welcome contributions to FORMULAR! The core module is now stable and ready for community contributions. Here's how you can get involved:

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

---

## Roadmap

- **Version 1.0** ✅ **COMPLETED**:

    - Core form and field mechanics ✅
    - Basic validation strategies ✅
    - React integration and components ✅
    - Country-specific validation system ✅
    - Switzerland-focused validation (NPA, AHV) ✅
    - Multi-country validation support ✅
    - Comprehensive validator library (20+ validators) ✅

- **Version 2.0** 🚧 **IN PROGRESS**:

    - Enhanced debugging and developer tools
    - Framework adapters for Angular and Vue.js
    - Advanced form lifecycle management
    - Performance optimizations
    - Extended country support
    - Form state persistence

- **Version 3.0** 📋 **PLANNED**:
    - Full-featured website with documentation and live examples
    - Community-driven plugins and extensions
    - Visual form builder
    - Advanced conditional validation
    - Real-time collaboration features

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

For more information, visit [https://formular.dev/](https://formular.dev/).
