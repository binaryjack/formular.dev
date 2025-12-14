# 🚀 Getting Started with FORMULAR.dev

<div style="border: 2px solid #4CAF50; border-radius: 8px; padding: 20px; margin: 20px 0; background-color: #f9f9f9;">

### 📋 Document Information

| Property | Value |
|----------|-------|
| **Author** | Piana Tadeo |
| **Library Version** | 1.0.56 |
| **Documentation Version** | 1.0.0 |
| **Last Updated** | December 14, 2025 |
| **Topic** | Getting Started Guide |

</div>

**Navigation**: [🏠 Home](./HOME.md) | [→ Core Concepts](./CORE_CONCEPTS.md) | [📖 API Reference](./API_REFERENCE.md)

---

## 📚 Table of Contents

- [Installation](#-installation)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Basic Concepts](#-basic-concepts)
- [Framework Integration](#-framework-integration)
- [Next Steps](#-next-steps)

---

## 📦 Installation

### Using npm

```bash
npm install formular.dev.lib
```

### Using pnpm (recommended)

```bash
pnpm add formular.dev.lib
```

### Using yarn

```bash
yarn add formular.dev.lib
```

### Framework-Specific Packages

#### React (Available Now)

```bash
npm install formular.dev.lib formular.components
# or
pnpm add formular.dev.lib formular.components
```

#### Vue.js (Planned v2.0)

```bash
# Coming soon
npm install formular.dev.lib formular.vue
```

#### Angular (Planned v2.0)

```bash
# Coming soon
npm install formular.dev.lib @formular/angular
```

#### Web Components (Experimental)

```bash
npm install formular.dev.lib webcomponents.formular.dev
```

---

## ✅ Prerequisites

### Required

- **Node.js**: 16.x or higher
- **TypeScript**: 4.9.x or higher (if using TypeScript)

### Recommended

- **Package Manager**: pnpm 8.x or higher
- **IDE**: VS Code with TypeScript support
- **Browser**: Modern browsers with ES6+ support

### Knowledge Requirements

- Basic understanding of JavaScript/TypeScript
- Familiarity with forms and validation concepts
- Understanding of your chosen framework (React, Vue, etc.)

---

## 🏃 Quick Start

### 1. Create a Service Manager

The ServiceManager is the IoC container that manages all services and dependencies.

```typescript
import { ServiceManagerFactory } from 'formular.dev.lib'

// Create service manager with default configuration
const serviceManager = ServiceManagerFactory.create({
    includeCoreManagers: true,      // DOM, Style, Configuration managers
    includeFormularManager: true,    // Form management service
    includeInputEngine: true,        // Input field factories
    includeBaseConfigurations: true  // Default field configurations
})
```

### 2. Get the FormularManager

```typescript
// Resolve the FormularManager service
const formularManager = serviceManager.resolve('IFormularManager')
```

### 3. Create Your First Form

```typescript
// Create a simple form with email validation
const formular = formularManager.createFromDescriptors('login-form', [
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: true,
        validation: {
            email: true
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

### 4. Validate and Submit

```typescript
// Validate the form
const isValid = await formular.validate()

if (isValid) {
    // Get the form data
    const data = formular.getData()
    console.log('Form data:', data)
    // { email: '...', password: '...' }
}
```

---

## 💡 Basic Concepts

### Service Manager (IoC Container)

The ServiceManager is the core of FORMULAR.dev's dependency injection system.

```typescript
// Different ways to create service managers

// 1. Full-featured (recommended for most apps)
const sm = ServiceManagerFactory.create({
    includeCoreManagers: true,
    includeFormularManager: true,
    includeInputEngine: true,
    includeBaseConfigurations: true
})

// 2. Using SetupHelpers
import { SetupHelpers } from 'formular.dev.lib'

const sm = SetupHelpers.forFormApplication()  // Same as above
const testSm = SetupHelpers.forTesting()      // For unit tests
const customSm = SetupHelpers.forCustomImplementation()  // Minimal setup

// 3. Manual configuration
const sm = new ServiceManager()
// Register services manually...
```

### FormularManager

The FormularManager creates and manages form instances.

```typescript
const formularManager = serviceManager.resolve('IFormularManager')

// Create from descriptors (declarative)
const form1 = formularManager.createFromDescriptors('form-id', descriptors)

// Create programmatically
const form2 = formularManager.create('form-id')
form2.createField('email', { type: 'email', required: true })
form2.createField('name', { type: 'text', required: true })
```

### Field Descriptors

Field descriptors define the structure and behavior of form fields.

```typescript
const fieldDescriptor = {
    name: 'email',              // Field identifier (required)
    label: 'Email Address',     // Display label
    type: 'email',              // Input type
    required: true,             // Required field
    placeholder: 'you@example.com',
    defaultValue: '',
    validation: {               // Validation rules
        email: true,
        required: true
    },
    cssClass: 'form-input',     // Custom CSS classes
    disabled: false,
    readonly: false
}
```

### Validation

FORMULAR.dev provides comprehensive validation with 18+ built-in validators.

```typescript
import { Validators } from 'formular.dev.lib'

// Using the builder pattern
import { FormularManagerBuilder } from 'formular.dev.lib'

const validationConfig = new FormularManagerBuilder()
    .addValidation(Validators.required())
    .addValidation(Validators.email())
    .addValidation(Validators.minLength(5))
    .addValidation(Validators.maxLength(100))
    .build()

// Using in field descriptor
{
    name: 'email',
    validation: validationConfig
}
```

---

## 🎨 Framework Integration

### React Integration

#### 1. Setup Service Container

```typescript
// src/services/service-manager.ts
import { ServiceManagerFactory } from 'formular.dev.lib'

export const serviceManager = ServiceManagerFactory.create({
    includeCoreManagers: true,
    includeFormularManager: true,
    includeInputEngine: true,
    includeBaseConfigurations: true
})
```

#### 2. Create Service Context

```typescript
// src/contexts/ServiceContext.tsx
import React, { createContext, useContext } from 'react'
import { serviceManager } from '../services/service-manager'

const ServiceContext = createContext(serviceManager)

export function ServiceProvider({ children }) {
    return (
        <ServiceContext.Provider value={serviceManager}>
            {children}
        </ServiceContext.Provider>
    )
}

export function useService() {
    const sm = useContext(ServiceContext)
    return {
        getService: (key: string) => sm.resolve(key)
    }
}
```

#### 3. Use in Components

```tsx
import React, { useState, useEffect } from 'react'
import { useService } from './contexts/ServiceContext'
import { FormularForm, InputText } from 'formular.components'

function LoginForm() {
    const { getService } = useService()
    const formularManager = getService('IFormularManager')
    
    const [formular, setFormular] = useState(null)
    
    useEffect(() => {
        const form = formularManager.createFromDescriptors('login', [
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
        setFormular(form)
        
        return () => form.dispose()  // Cleanup
    }, [])
    
    const handleSubmit = async (data) => {
        console.log('Login data:', data)
        // Send to API...
    }
    
    if (!formular) return <div>Loading...</div>
    
    return (
        <FormularForm formular={formular} onSubmit={handleSubmit}>
            <InputText fieldName="email" />
            <InputText fieldName="password" />
            <button type="submit">Login</button>
        </FormularForm>
    )
}
```

### Vanilla JavaScript

```javascript
import { ServiceManagerFactory } from 'formular.dev.lib'

// Create service manager
const serviceManager = ServiceManagerFactory.create({
    includeCoreManagers: true,
    includeFormularManager: true,
    includeInputEngine: true
})

// Get FormularManager
const formularManager = serviceManager.resolve('IFormularManager')

// Create form
const formular = formularManager.createFromDescriptors('contact-form', [
    {
        name: 'name',
        type: 'text',
        required: true
    },
    {
        name: 'email',
        type: 'email',
        required: true,
        validation: { email: true }
    },
    {
        name: 'message',
        type: 'textarea',
        required: true,
        validation: { minLength: 10 }
    }
])

// Handle form submission
document.querySelector('#contact-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const isValid = await formular.validate()
    
    if (isValid) {
        const data = formular.getData()
        console.log('Form data:', data)
        // Submit to API...
    } else {
        console.error('Form has validation errors')
    }
})
```

### Web Components (Experimental)

```html
<!DOCTYPE html>
<html>
<head>
    <script type="module" src="webcomponents.formular.dev"></script>
</head>
<body>
    <formular-form id="user-form">
        <formular-input 
            name="email" 
            type="email" 
            label="Email Address"
            required>
        </formular-input>
        
        <formular-input 
            name="password" 
            type="password" 
            label="Password"
            required>
        </formular-input>
        
        <button type="submit">Submit</button>
    </formular-form>
    
    <script>
        const form = document.querySelector('#user-form')
        form.addEventListener('submit', (e) => {
            console.log('Form data:', e.detail.data)
        })
    </script>
</body>
</html>
```

---

## 🎯 Next Steps

### Learn More

1. **[Core Concepts](./CORE_CONCEPTS.md)** - Deep dive into architecture and patterns
2. **[Validation System](./VALIDATION_SYSTEM.md)** - Master validation rules and custom validators
3. **[Components Guide](./COMPONENTS.md)** - Explore all available components
4. **[Quick Reference](./QUICK_REFERENCE.md)** - Cheat sheet for common tasks

### Try Examples

1. **[Basic Examples](./examples/basic/)** - Simple form scenarios
2. **[Validation Examples](./examples/validation/)** - Various validation patterns
3. **[Advanced Examples](./examples/advanced/)** - Complex forms and custom implementations

### Get Help

- **[Troubleshooting Guide](./TROUBLESHOOTING.md)** - Common issues and solutions
- **[FAQ](./FAQ.md)** - Frequently asked questions
- **[GitHub Issues](https://github.com/binaryjack/formular.dev/issues)** - Report bugs or request features

---

## 📝 Complete Example

Here's a complete example combining all concepts:

```typescript
import { ServiceManagerFactory, Validators, FormularManagerBuilder } from 'formular.dev.lib'

// 1. Create service manager
const serviceManager = ServiceManagerFactory.create({
    includeCoreManagers: true,
    includeFormularManager: true,
    includeInputEngine: true,
    includeBaseConfigurations: true
})

// 2. Get FormularManager
const formularManager = serviceManager.resolve('IFormularManager')

// 3. Define validation
const emailValidation = new FormularManagerBuilder()
    .addValidation(Validators.required())
    .addValidation(Validators.email())
    .build()

const passwordValidation = new FormularManagerBuilder()
    .addValidation(Validators.required())
    .addValidation(Validators.minLength(8))
    .addValidation(Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain uppercase, lowercase, and number'
    ))
    .build()

// 4. Create form with descriptors
const formular = formularManager.createFromDescriptors('registration-form', [
    {
        name: 'username',
        label: 'Username',
        type: 'text',
        required: true,
        placeholder: 'Enter username',
        validation: new FormularManagerBuilder()
            .addValidation(Validators.required())
            .addValidation(Validators.minLength(3))
            .addValidation(Validators.maxLength(20))
            .build()
    },
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: true,
        placeholder: 'you@example.com',
        validation: emailValidation
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        placeholder: 'Enter secure password',
        validation: passwordValidation
    },
    {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        required: true,
        placeholder: 'Re-enter password',
        validation: new FormularManagerBuilder()
            .addValidation(Validators.required())
            .addValidation(Validators.matchField('password', 'Passwords must match'))
            .build()
    },
    {
        name: 'agreeToTerms',
        label: 'I agree to the Terms and Conditions',
        type: 'checkbox',
        required: true,
        validation: new FormularManagerBuilder()
            .addValidation(Validators.required())
            .build()
    }
])

// 5. Handle submission
async function handleSubmit() {
    // Validate
    const isValid = await formular.validate()
    
    if (isValid) {
        // Get data
        const data = formular.getData()
        console.log('Registration data:', data)
        
        try {
            // Submit to API
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            
            if (response.ok) {
                console.log('Registration successful!')
                // Reset form
                formular.reset()
            }
        } catch (error) {
            console.error('Registration failed:', error)
        }
    } else {
        console.error('Form has validation errors')
        // Errors are automatically displayed in the UI
    }
}

// 6. Cleanup when done
// formular.dispose()
```

---

<div align="center">

**[⬆ Back to Top](#-getting-started-with-formuladev)** | **[🏠 Home](./HOME.md)** | **[→ Core Concepts](./CORE_CONCEPTS.md)**

</div>
