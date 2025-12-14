# ⚡ Quick Reference Guide

<div style="border: 2px solid #4CAF50; border-radius: 8px; padding: 20px; margin: 20px 0; background-color: #f9f9f9;">

### 📋 Document Information

| Property | Value |
|----------|-------|
| **Author** | Piana Tadeo |
| **Library Version** | 1.0.56 |
| **Documentation Version** | 1.0.0 |
| **Last Updated** | December 14, 2025 |
| **Topic** | Quick Reference & Cheat Sheet |

</div>

**Navigation**: [🏠 Home](./HOME.md) | [← Core Concepts](./CORE_CONCEPTS.md) | [→ Troubleshooting](./TROUBLESHOOTING.md)

---

## 📚 Table of Contents

- [Setup & Initialization](#-setup--initialization)
- [Form Creation](#-form-creation)
- [Field Management](#-field-management)
- [Validation](#-validation)
- [Event Handling](#-event-handling)
- [React Integration](#-react-integration)
- [Common Patterns](#-common-patterns)

---

## 🚀 Setup & Initialization

### Quick Setup

```typescript
import { ServiceManagerFactory } from 'formular.dev.lib'

const sm = ServiceManagerFactory.create({
    includeCoreManagers: true,
    includeFormularManager: true,
    includeInputEngine: true,
    includeBaseConfigurations: true
})

const formularManager = sm.resolve('IFormularManager')
```

### Using Helpers

```typescript
import { SetupHelpers } from 'formular.dev.lib'

const sm = SetupHelpers.forFormApplication()
const formularManager = sm.resolve('IFormularManager')
```

---

## 📋 Form Creation

### Simple Form

```typescript
const form = formularManager.createFromDescriptors('my-form', [
    { name: 'email', type: 'email', required: true },
    { name: 'password', type: 'password', required: true }
])
```

### With Validation

```typescript
import { Validators, FormularManagerBuilder } from 'formular.dev.lib'

const form = formularManager.createFromDescriptors('my-form', [
    {
        name: 'email',
        type: 'email',
        required: true,
        validation: new FormularManagerBuilder()
            .addValidation(Validators.required())
            .addValidation(Validators.email())
            .build()
    }
])
```

### Programmatic Creation

```typescript
const form = formularManager.create('my-form')
form.createField('email', { type: 'email', required: true })
form.createField('password', { type: 'password', required: true })
```

---

## 🔧 Field Management

### Get Field

```typescript
const emailField = form.getField('email')
```

### Set Value

```typescript
emailField.setValue('user@example.com')
```

### Get Value

```typescript
const value = emailField.getValue()
```

### Check Field State

```typescript
if (emailField.isValid) { /* ... */ }
if (emailField.isDirty) { /* ... */ }
if (emailField.isTouched) { /* ... */ }
```

### Get All Form Data

```typescript
const data = form.getData()
// { email: '...', password: '...' }
```

---

## ✅ Validation

### Built-in Validators

```typescript
import { Validators } from 'formular.dev.lib'

// Required
Validators.required()

// Email
Validators.email()

// Min/Max Length
Validators.minLength(5)
Validators.maxLength(100)

// Min/Max Value
Validators.min(0)
Validators.max(100)

// Pattern (Regex)
Validators.pattern(/^[A-Z]/, 'Must start with uppercase')

// Match Field
Validators.matchField('password', 'Passwords must match')

// Phone (Multi-country)
Validators.phone(['US', 'CA', 'CH'])

// Postal Code
Validators.postalCode(['US', 'CA', 'CH'])
```

### Validate Form

```typescript
// Validate entire form
const isValid = await form.validate()

if (isValid) {
    console.log('Form is valid!')
}
```

### Validate Single Field

```typescript
const isValid = await emailField.validate()
```

### Custom Validator

```typescript
const customValidator = {
    validate: (value: any) => {
        if (value.includes('test')) {
            return {
                isValid: false,
                errorMessage: 'Cannot contain "test"'
            }
        }
        return { isValid: true }
    }
}

// Use in builder
new FormularManagerBuilder()
    .addValidation(customValidator)
    .build()
```

### Multilingual Validation

```typescript
import { 
    createCommonLocalizedValidators,
    ValidationLocalizeKeys 
} from 'formular.dev.lib'

// Create validators with French messages
const validators = createCommonLocalizedValidators('email', {
    locale: 'fr'
})

const emailValidator = validators.pattern(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    ValidationLocalizeKeys.emailError,
    ValidationLocalizeKeys.emailGuide
)
```

---

## 🔔 Event Handling

### Form Events

```typescript
// Field changed
form.on('field:changed', (fieldName, value) => {
    console.log(`${fieldName} changed to:`, value)
})

// Form validated
form.on('validated', (isValid) => {
    console.log('Form validated:', isValid)
})

// Form submitted
form.on('submitted', (data) => {
    console.log('Form submitted:', data)
})

// Form reset
form.on('reset', () => {
    console.log('Form reset')
})
```

### Field Events

```typescript
// Value changed
emailField.on('changed', (value) => {
    console.log('Email changed:', value)
})

// Validation changed
emailField.on('validationChanged', (isValid) => {
    console.log('Email validation:', isValid)
})
```

---

## ⚛️ React Integration

### Setup Context

```typescript
// ServiceContext.tsx
import { createContext, useContext } from 'react'
import { ServiceManagerFactory } from 'formular.dev.lib'

const sm = ServiceManagerFactory.create({
    includeCoreManagers: true,
    includeFormularManager: true,
    includeInputEngine: true
})

const ServiceContext = createContext(sm)

export function ServiceProvider({ children }) {
    return (
        <ServiceContext.Provider value={sm}>
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

### Use in Component

```tsx
import { useService } from './ServiceContext'
import { useState, useEffect } from 'react'
import { FormularForm, InputText } from 'formular.components'

function MyForm() {
    const { getService } = useService()
    const formularManager = getService('IFormularManager')
    const [formular, setFormular] = useState(null)
    
    useEffect(() => {
        const form = formularManager.createFromDescriptors('my-form', [
            { name: 'email', type: 'email', required: true }
        ])
        setFormular(form)
        return () => form.dispose()
    }, [])
    
    const handleSubmit = async (data) => {
        console.log('Form data:', data)
    }
    
    if (!formular) return null
    
    return (
        <FormularForm formular={formular} onSubmit={handleSubmit}>
            <InputText fieldName="email" />
            <button type="submit">Submit</button>
        </FormularForm>
    )
}
```

---

## 🎨 Common Patterns

### Login Form

```typescript
const loginForm = formularManager.createFromDescriptors('login', [
    {
        name: 'email',
        type: 'email',
        label: 'Email',
        required: true,
        validation: new FormularManagerBuilder()
            .addValidation(Validators.required())
            .addValidation(Validators.email())
            .build()
    },
    {
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        validation: new FormularManagerBuilder()
            .addValidation(Validators.required())
            .addValidation(Validators.minLength(8))
            .build()
    },
    {
        name: 'rememberMe',
        type: 'checkbox',
        label: 'Remember me'
    }
])
```

### Registration Form

```typescript
const registrationForm = formularManager.createFromDescriptors('register', [
    {
        name: 'username',
        type: 'text',
        required: true,
        validation: new FormularManagerBuilder()
            .addValidation(Validators.required())
            .addValidation(Validators.minLength(3))
            .addValidation(Validators.maxLength(20))
            .build()
    },
    {
        name: 'email',
        type: 'email',
        required: true,
        validation: new FormularManagerBuilder()
            .addValidation(Validators.required())
            .addValidation(Validators.email())
            .build()
    },
    {
        name: 'password',
        type: 'password',
        required: true,
        validation: new FormularManagerBuilder()
            .addValidation(Validators.required())
            .addValidation(Validators.minLength(8))
            .addValidation(Validators.pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                'Must contain uppercase, lowercase, and number'
            ))
            .build()
    },
    {
        name: 'confirmPassword',
        type: 'password',
        required: true,
        validation: new FormularManagerBuilder()
            .addValidation(Validators.required())
            .addValidation(Validators.matchField('password'))
            .build()
    }
])
```

### Contact Form

```typescript
const contactForm = formularManager.createFromDescriptors('contact', [
    {
        name: 'name',
        type: 'text',
        label: 'Full Name',
        required: true
    },
    {
        name: 'email',
        type: 'email',
        label: 'Email',
        required: true,
        validation: new FormularManagerBuilder()
            .addValidation(Validators.required())
            .addValidation(Validators.email())
            .build()
    },
    {
        name: 'phone',
        type: 'tel',
        label: 'Phone',
        validation: new FormularManagerBuilder()
            .addValidation(Validators.phone(['US', 'CA']))
            .build()
    },
    {
        name: 'subject',
        type: 'text',
        label: 'Subject',
        required: true
    },
    {
        name: 'message',
        type: 'textarea',
        label: 'Message',
        required: true,
        validation: new FormularManagerBuilder()
            .addValidation(Validators.required())
            .addValidation(Validators.minLength(10))
            .build()
    }
])
```

### Dynamic Field Addition

```typescript
const form = formularManager.create('dynamic-form')

// Add field dynamically
function addEmailField(index: number) {
    form.createField(`email_${index}`, {
        type: 'email',
        label: `Email ${index}`,
        validation: new FormularManagerBuilder()
            .addValidation(Validators.email())
            .build()
    })
}

// Remove field dynamically
function removeField(fieldName: string) {
    const field = form.getField(fieldName)
    field.dispose()
}
```

### Conditional Validation

```typescript
// Enable/disable validation based on conditions
const form = formularManager.create('conditional-form')

form.createField('country', { type: 'select' })
form.createField('postalCode', { type: 'text' })

form.on('field:changed', (fieldName, value) => {
    if (fieldName === 'country') {
        const postalCodeField = form.getField('postalCode')
        
        // Update validation based on country
        const validation = new FormularManagerBuilder()
            .addValidation(Validators.postalCode([value]))
            .build()
        
        postalCodeField.setValidation(validation)
    }
})
```

### Form Submission with API

```typescript
async function handleSubmit() {
    const isValid = await form.validate()
    
    if (!isValid) {
        console.error('Form has errors')
        return
    }
    
    const data = form.getData()
    
    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        
        if (response.ok) {
            console.log('Submission successful')
            form.reset()
        } else {
            console.error('Submission failed')
        }
    } catch (error) {
        console.error('Network error:', error)
    }
}
```

### Reset and Clear

```typescript
// Reset to initial values
form.reset()

// Clear all values
form.clearValues()

// Reset specific field
emailField.reset()
```

### Disable/Enable Fields

```typescript
// Disable field
emailField.setDisabled(true)

// Enable field
emailField.setDisabled(false)

// Disable entire form
form.setDisabled(true)
```

---

## 🌍 Multilingual Support

### Change Locale

```typescript
import { validationTranslationService } from 'formular.dev.lib'

// Change to French
validationTranslationService.setLocale('fr')

// Change to Spanish
validationTranslationService.setLocale('es')

// Supported: 'en', 'fr', 'es', 'de', 'pt', 'it'
```

### Custom Translation

```typescript
import { ValidationLocalizeKeys } from 'formular.dev.lib'

validationTranslationService.addCustomTranslation(
    'en',
    ValidationLocalizeKeys.required,
    'This field is absolutely required!'
)
```

---

## 🧹 Cleanup

### Dispose Form

```typescript
form.dispose()  // Clean up resources
```

### Dispose Service Manager

```typescript
serviceManager.dispose()  // Clean up all services
```

### React Cleanup

```tsx
useEffect(() => {
    const form = formularManager.create('my-form')
    
    return () => {
        form.dispose()  // Cleanup on unmount
    }
}, [])
```

---

## 📊 Performance Tips

### Batch Notifications

```typescript
const notificationManager = serviceManager.resolve('INotificationManager')

notificationManager.startBatch()

// Multiple operations
field1.setValue('value1')
field2.setValue('value2')
field3.setValue('value3')

notificationManager.endBatch()  // Single notification
```

### Lazy Validation

```typescript
// Only validate when needed
form.validateOnChange = false
form.validateOnBlur = false
form.validateOnFirstSubmit = true
```

### Field Reuse

```typescript
// Reuse field configurations
const emailConfig = {
    type: 'email',
    validation: new FormularManagerBuilder()
        .addValidation(Validators.email())
        .build()
}

form.createField('email1', emailConfig)
form.createField('email2', emailConfig)
```

---

<div align="center">

**[⬆ Back to Top](#-quick-reference-guide)** | **[🏠 Home](./HOME.md)** | **[→ Troubleshooting](./TROUBLESHOOTING.md)**

</div>
