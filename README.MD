# FORMULAR

**Author:** Piana Tadeo  
**License:** MIT  
**Website:** [https://formular.dev/](https://formular.dev/)

## Overview

FORMULAR is a framework-agnostic library designed to simplify the implementation of forms with validations. It is highly portable and can be used with popular JavaScript libraries like React, Vue.js, Angular, or even with plain vanilla JavaScript.

This library provides a robust foundation for managing forms, fields, and validations, making it easier to build dynamic and interactive user interfaces.

## Features

- **Framework Agnostic**: Works seamlessly with React, Vue.js, Angular, or plain JavaScript.
- **Validation Support**: Built-in support for field-level and form-level validations.
- **Extensibility**: Easily extendable to support custom validation strategies and field types.
- **Modular Design**: Designed with modularity in mind, allowing developers to pick and choose components as needed.
- **Work in Progress**: This project is actively being developed, and more features are planned.

---

## How FORMULAR Works

FORMULAR is built using a combination of design patterns and modular architecture to provide a robust and extensible framework for form management. Below, we detail how to define form schemas, convert them into usable forms, and the patterns used in the library.

### Defining Form Schemas

FORMULAR uses schema definitions to describe the structure and behavior of forms. These schemas are defined using builders, which allow for a declarative and flexible approach.

#### Example: Defining a Form Schema

```ts
// filepath: src/demo/form-demo/form-demo.schema.ts
import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'
import { InputTextBuilder } from '@core/framework/schema/field-schema/settings/input-text-builder'
import { Validators } from '@core/framework/schema/validation-schema/validators'

export const controlsDemoSchema: IEntityScheme = {
    name: 'demo-schema',
    properties: [
        InputTextBuilder.setValidationData(true, Validators.baseRequiredNameValidator).build(),
        InputTextBuilder.setValidationData(true, Validators.eMailRequiredValidator).build()
    ]
}
```

### Converting Schemas to Forms

Schemas are converted into forms using the `FormularManager`. This manager handles the initialization of fields, validation, and other dependencies.

#### Example: Creating a Form Instance

```ts
// filepath: src/demo/form-demo/form-demo.instance.ts
import { FormularManager } from '@core/formular-manager/formular-manager'
import { controlsDemoSchema } from './form-demo.schema'
import {
    defaultInitializationDependencies,
    defaultInitializationParameters
} from '@core/input-engine/generator/builder/settings/input-dependency-configuration.ts'

const fm = new FormularManager()

export const demoFormInstance = fm.createFromSchema(
    controlsDemoSchema,
    defaultInitializationParameters,
    defaultInitializationDependencies
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

2. **Factory Pattern**: Used to create validation schemas dynamically.

    - Example: `validationSchemaFactory`.

3. **Observer Pattern**: Enables reactive updates to form fields and validation states.

    - Example: Signals used in `useField`.

4. **Strategy Pattern**: Allows for interchangeable validation strategies.

    - Example: Validators like `baseRequiredValidator`, `eMailRequiredValidator`.

5. **Modular Design**: Components and utilities are designed to be reusable and composable.
    - Example: `FormularManager`, `InputsProvider`.

### Advanced Example: Validation with Custom Rules

FORMULAR supports custom validation rules through the `ValidationSchemaBuilder`.

```ts
// filepath: src/demo/validation-demo/validation-demo.tsx
import { validationSchemaFactory } from '@core/framework/schema/validation-schema/schema/factory/validation.schema.factory'

const customValidator = validationSchemaFactory
    .createValidationSchemaBuilder()
    .isRequired(true)
    .hasPattern(/^[a-zA-Z]+$/)
    .hasCustomError('Only alphabets are allowed')
    .build()
```

This custom validator can then be applied to a field in the schema.

---

By combining these patterns and modular components, FORMULAR provides a powerful framework for managing forms in any JavaScript application.

## Examples

### Example 1: Using FORMULAR with React

```tsx
import React from 'react'
import FormularForm from '@components/formular-form/formular-form'
import InputText from '@components/input-text/input-text'

const MyForm = () => {
    const handleSubmit = (data) => {
        console.log('Form Data:', data)
    }

    return (
        <FormularForm onSubmit={handleSubmit}>
            <InputText fieldName="username" />
            <InputText fieldName="email" />
            <button type="submit">Submit</button>
        </FormularForm>
    )
}

export default MyForm
```

### Example 2: Using FORMULAR with Vanilla JavaScript

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <script src="formular.min.js"></script>
    </head>
    <body>
        <form id="myForm">
            <input type="text" id="username" name="username" placeholder="Username" />
            <input type="email" id="email" name="email" placeholder="Email" />
            <button type="submit">Submit</button>
        </form>

        <script>
            const form = new Formular('myForm')
            form.addFields([
                { id: 'username', name: 'username', required: true },
                { id: 'email', name: 'email', required: true, pattern: /^[^@]+@[^@]+\.[^@]+$/ }
            ])

            document.getElementById('myForm').addEventListener('submit', (e) => {
                e.preventDefault()
                if (form.validateAll()) {
                    console.log('Form is valid:', form.getData())
                } else {
                    console.log('Form is invalid')
                }
            })
        </script>
    </body>
</html>
```

---

## Contributing

Contributions will open soon, We are currently WIP the core module that should be ready in a few days.

We welcome contributions to FORMULAR! Here’s how you can get involved:

1. **Fork the Repository**: Start by forking the repository on GitHub.
2. **Explore the Codebase**: Familiarize yourself with the project structure and mechanics.
3. **Report Issues**: Found a bug or have a feature request? Open an issue on GitHub.
4. **Submit Pull Requests**: Implement a feature or fix a bug and submit a pull request.
5. **Write Documentation**: Help improve the documentation for better usability.

### Planned Contributions

- **New Field Types**: Add support for additional field types like sliders, toggles, and date pickers.
- **Validation Enhancements**: Implement more advanced validation strategies.
- **Framework Integrations**: Create adapters for popular frameworks like Angular and Vue.js.
- **Unit Tests**: Improve test coverage to ensure reliability.
- **Examples and Tutorials**: Provide more examples and tutorials for developers.

---

## Roadmap

- **Version 1.0**:

    - Core form and field mechanics.
    - Basic validation strategies.
    - React and Vanilla JavaScript examples. 

- **Version 2.0**:

    - Advanced validation strategies.
    - Framework adapters for Angular and Vue.js.
    - Improved developer experience with better debugging tools.

- **Version 3.0**:
    - Full-featured website with documentation and live examples.
    - Community-driven plugins and extensions.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

For more information, visit [https://formular.dev/](https://formular.dev/).
