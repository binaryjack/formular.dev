# 🆘 Troubleshooting Guide

<div style="border: 2px solid #4CAF50; border-radius: 8px; padding: 20px; margin: 20px 0; background-color: #f9f9f9;">

### 📋 Document Information

| Property | Value |
|----------|-------|
| **Author** | Piana Tadeo |
| **Library Version** | 1.0.56 |
| **Documentation Version** | 1.0.0 |
| **Last Updated** | December 14, 2025 |
| **Topic** | Troubleshooting & Common Issues |

</div>

**Navigation**: [🏠 Home](./HOME.md) | [← Quick Reference](./QUICK_REFERENCE.md) | [→ API Reference](./API_REFERENCE.md)

---

## 📚 Table of Contents

- [Installation Issues](#-installation-issues)
- [Service Manager Issues](#-service-manager-issues)
- [Form Creation Issues](#-form-creation-issues)
- [Validation Issues](#-validation-issues)
- [React Integration Issues](#-react-integration-issues)
- [Performance Issues](#-performance-issues)
- [Memory Leaks](#-memory-leaks)
- [TypeScript Issues](#-typescript-issues)
- [Build Issues](#-build-issues)

---

## 📦 Installation Issues

### Issue: Package Not Found

**Problem:**
```bash
npm ERR! 404 Not Found - GET https://registry.npmjs.org/formular.dev.lib
```

**Solution:**
```bash
# Make sure you're using the correct package name
npm install formular.dev.lib

# Or try with exact version
npm install formular.dev.lib@1.0.56

# Clear npm cache if needed
npm cache clean --force
npm install formular.dev.lib
```

### Issue: Peer Dependency Warnings

**Problem:**
```bash
npm WARN ERESOLVE overriding peer dependency
```

**Solution:**
```bash
# Use --legacy-peer-deps flag
npm install --legacy-peer-deps

# Or use --force (not recommended)
npm install --force

# Better: Update peer dependencies
npm install react@latest react-dom@latest
```

### Issue: TypeScript Version Mismatch

**Problem:**
```
error TS2307: Cannot find module 'formular.dev.lib'
```

**Solution:**
```bash
# Ensure TypeScript version is 4.9+
npm install typescript@latest --save-dev

# Check TypeScript version
npx tsc --version

# Update tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "resolveJsonModule": true
  }
}
```

---

## 🔧 Service Manager Issues

### Issue: Circular Dependency Detected

**Problem:**
```typescript
Error: Circular dependency detected: IServiceA → IServiceB → IServiceA
```

**Solution:**
```typescript
// Bad: Circular dependency
serviceManager.registerSingleton('IServiceA', (sm) => {
    const serviceB = sm.resolve('IServiceB')  // B depends on A
    return new ServiceA(serviceB)
})

serviceManager.registerSingleton('IServiceB', (sm) => {
    const serviceA = sm.resolve('IServiceA')  // A depends on B - CIRCULAR!
    return new ServiceB(serviceA)
})

// Good: Break the cycle with interface injection
serviceManager.registerSingleton('IServiceA', (sm) => {
    return new ServiceA()  // No dependency
})

serviceManager.registerSingleton('IServiceB', (sm) => {
    const serviceA = sm.resolve('IServiceA')
    return new ServiceB(serviceA)  // One-way dependency
})
```

### Issue: Service Not Registered

**Problem:**
```typescript
Error: Service 'IFormularManager' is not registered
```

**Solution:**
```typescript
// Check if service is registered
if (!serviceManager.has('IFormularManager')) {
    console.error('FormularManager not registered!')
}

// Make sure you include it in setup
const sm = ServiceManagerFactory.create({
    includeCoreManagers: true,
    includeFormularManager: true,  // ← Make sure this is true
    includeInputEngine: true
})

// Or register manually
import { setupFormularManager } from 'formular.dev.lib/setup'
setupFormularManager(serviceManager)
```

### Issue: Service Resolved Too Early

**Problem:**
```typescript
const formularManager = serviceManager.resolve('IFormularManager')
// TypeError: Cannot read property 'create' of undefined
```

**Solution:**
```typescript
// Bad: Resolving before registration
const fm = serviceManager.resolve('IFormularManager')
setupFormularManager(serviceManager)  // Too late!

// Good: Register first, resolve second
setupFormularManager(serviceManager)
const fm = serviceManager.resolve('IFormularManager')

// Better: Use factory pattern
const sm = ServiceManagerFactory.create({
    includeFormularManager: true  // Registers automatically
})
const fm = sm.resolve('IFormularManager')
```

---

## 📋 Form Creation Issues

### Issue: Form Not Updating

**Problem:**
```typescript
form.createField('email', { type: 'email' })
// Field not appearing in UI
```

**Solution:**
```typescript
// In React, make sure you're using state
const [formular, setFormular] = useState(null)

useEffect(() => {
    const form = formularManager.create('my-form')
    form.createField('email', { type: 'email' })
    setFormular(form)  // ← Trigger re-render
    
    return () => form.dispose()
}, [])

// Or use createFromDescriptors
const form = formularManager.createFromDescriptors('my-form', [
    { name: 'email', type: 'email' }
])
```

### Issue: Field Value Not Persisting

**Problem:**
```typescript
field.setValue('test@example.com')
console.log(field.getValue())  // Returns empty string
```

**Solution:**
```typescript
// Make sure field is properly initialized
const field = form.getField('email')

if (!field) {
    console.error('Field not found!')
    return
}

// Set value
field.setValue('test@example.com')

// Verify
console.log(field.getValue())  // Should return 'test@example.com'

// Check field state
console.log({
    value: field.getValue(),
    isValid: field.isValid,
    isDirty: field.isDirty
})
```

### Issue: Form Data Missing Fields

**Problem:**
```typescript
const data = form.getData()
console.log(data)  // { email: '...' } - missing password field
```

**Solution:**
```typescript
// Check if all fields are created
console.log('Fields:', form.fields.keys())

// Make sure all fields have values (or defaults)
form.createField('password', {
    type: 'password',
    defaultValue: ''  // ← Ensure default value
})

// Or check field existence before getData
const passwordField = form.getField('password')
if (!passwordField) {
    console.error('Password field missing!')
    form.createField('password', { type: 'password' })
}

const data = form.getData()
```

---

## ✅ Validation Issues

### Issue: Validation Not Running

**Problem:**
```typescript
await form.validate()
console.log(form.isValid)  // Always true, even with invalid data
```

**Solution:**
```typescript
// Make sure validation is configured
const field = form.getField('email')

// Check if validation exists
if (!field.validation) {
    console.error('No validation configured!')
    
    // Add validation
    field.setValidation(
        new FormularManagerBuilder()
            .addValidation(Validators.required())
            .addValidation(Validators.email())
            .build()
    )
}

// Now validate
await form.validate()
```

### Issue: Custom Validator Not Working

**Problem:**
```typescript
const customValidator = {
    validate: (value) => {
        return value.length > 5
    }
}
// Validator not being called
```

**Solution:**
```typescript
// Custom validator must return proper format
const customValidator = {
    validate: (value: any) => {
        if (value.length <= 5) {
            return {
                isValid: false,
                errorMessage: 'Value must be longer than 5 characters'
            }
        }
        return {
            isValid: true
        }
    }
}

// Use in builder
const validation = new FormularManagerBuilder()
    .addValidation(customValidator)
    .build()
```

### Issue: Validation Messages Not Showing

**Problem:**
```typescript
// Error messages not displayed in UI
```

**Solution:**
```tsx
// In React, make sure you're using error display component
import { InputText } from 'formular.components'

<InputText 
    fieldName="email"
    showErrors={true}  // ← Enable error display
/>

// Or access errors manually
const errors = emailField.getErrors()
console.log(errors)

// Subscribe to validation changes
emailField.on('validationChanged', (isValid) => {
    if (!isValid) {
        const errors = emailField.getErrors()
        console.log('Validation errors:', errors)
    }
})
```

### Issue: Async Validation Not Working

**Problem:**
```typescript
// Async validation never completes
```

**Solution:**
```typescript
// Make sure to use async/await properly
const asyncValidator = {
    validate: async (value: any) => {
        // Async operation
        const exists = await checkEmailExists(value)
        
        if (exists) {
            return {
                isValid: false,
                errorMessage: 'Email already exists'
            }
        }
        
        return { isValid: true }
    }
}

// Use with await
await form.validate()  // ← Must use await for async validators
```

---

## ⚛️ React Integration Issues

### Issue: "Cannot read property 'resolve' of undefined"

**Problem:**
```tsx
const { getService } = useService()
const formularManager = getService('IFormularManager')
// Error: Cannot read property 'resolve' of undefined
```

**Solution:**
```tsx
// Make sure ServiceProvider wraps your component
// App.tsx
import { ServiceProvider } from './contexts/ServiceContext'

function App() {
    return (
        <ServiceProvider>
            <YourComponent />  {/* ← Now has access to context */}
        </ServiceProvider>
    )
}

// YourComponent.tsx
function YourComponent() {
    const { getService } = useService()  // Works now!
    const formularManager = getService('IFormularManager')
    // ...
}
```

### Issue: Form Not Re-rendering on Changes

**Problem:**
```tsx
// Form updates but UI doesn't reflect changes
```

**Solution:**
```tsx
import { useState, useEffect } from 'react'

function MyForm() {
    const { getService } = useService()
    const formularManager = getService('IFormularManager')
    const [formData, setFormData] = useState({})
    
    useEffect(() => {
        const form = formularManager.create('my-form')
        
        // Subscribe to changes
        form.on('field:changed', (fieldName, value) => {
            setFormData(form.getData())  // ← Trigger re-render
        })
        
        return () => form.dispose()
    }, [])
    
    return (
        <div>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
    )
}
```

### Issue: Memory Leaks in React

**Problem:**
```
Warning: Can't perform a React state update on an unmounted component
```

**Solution:**
```tsx
useEffect(() => {
    let mounted = true
    const form = formularManager.create('my-form')
    
    form.on('field:changed', (fieldName, value) => {
        if (mounted) {  // ← Check if still mounted
            setFormData(form.getData())
        }
    })
    
    return () => {
        mounted = false  // ← Prevent updates after unmount
        form.dispose()   // ← Clean up resources
    }
}, [])
```

---

## 🚀 Performance Issues

### Issue: Slow Validation

**Problem:**
```typescript
// Form validation takes too long
await form.validate()  // Takes 2+ seconds
```

**Solution:**
```typescript
// 1. Use batch validation
const notificationManager = serviceManager.resolve('INotificationManager')

notificationManager.startBatch()

// Validate all fields
await form.validate()

notificationManager.endBatch()

// 2. Debounce validation
import { debounce } from 'lodash'

const debouncedValidate = debounce(
    () => form.validate(),
    300  // Wait 300ms after last change
)

form.on('field:changed', () => {
    debouncedValidate()
})

// 3. Validate only changed fields
field.on('changed', async () => {
    await field.validate()  // Validate single field
})
```

### Issue: Too Many Re-renders

**Problem:**
```
Warning: Maximum update depth exceeded
```

**Solution:**
```tsx
// Bad: Creating new form on every render
function MyForm() {
    const formularManager = useService().getService('IFormularManager')
    const form = formularManager.create('my-form')  // ← Creates new form every render!
    
    return <FormularForm formular={form} />
}

// Good: Create form once
function MyForm() {
    const formularManager = useService().getService('IFormularManager')
    const [formular, setFormular] = useState(null)
    
    useEffect(() => {
        const form = formularManager.create('my-form')
        setFormular(form)
        return () => form.dispose()
    }, [])  // ← Empty deps - run once
    
    if (!formular) return null
    return <FormularForm formular={formular} />
}
```

---

## 🧹 Memory Leaks

### Issue: Forms Not Being Garbage Collected

**Problem:**
```typescript
// Memory usage keeps growing
```

**Solution:**
```typescript
// Always dispose forms when done
const form = formularManager.create('my-form')

// Use the form...

// Dispose when done
form.dispose()  // ← Clean up resources

// In React
useEffect(() => {
    const form = formularManager.create('my-form')
    
    return () => {
        form.dispose()  // ← Cleanup on unmount
    }
}, [])
```

### Issue: Event Listeners Not Removed

**Problem:**
```typescript
// Event listeners accumulating
```

**Solution:**
```typescript
// Store subscription reference
const subscription = form.on('field:changed', (name, value) => {
    console.log('Changed:', name, value)
})

// Remove listener when done
subscription.unsubscribe()

// Or use dispose (removes all listeners)
form.dispose()
```

---

## 📘 TypeScript Issues

### Issue: Type Errors with ServiceManager

**Problem:**
```typescript
const fm = serviceManager.resolve('IFormularManager')
// Type 'unknown' is not assignable to type 'IFormularManager'
```

**Solution:**
```typescript
// Use type assertion
const fm = serviceManager.resolve<IFormularManager>('IFormularManager')

// Or import types
import type { IFormularManager } from 'formular.dev.lib'

const fm: IFormularManager = serviceManager.resolve('IFormularManager')
```

### Issue: Generic Type Inference Failed

**Problem:**
```typescript
const form = formularManager.create('my-form')
// Type 'IFormularBase<object>' lacks proper typing
```

**Solution:**
```typescript
// Define your data type
interface LoginFormData {
    email: string
    password: string
}

// Use generic type
const form = formularManager.create<LoginFormData>('login-form')

// Now getData() returns LoginFormData
const data: LoginFormData = form.getData()
```

---

## 🔨 Build Issues

### Issue: Module Not Found in Build

**Problem:**
```
Module not found: Error: Can't resolve 'formular.dev.lib'
```

**Solution:**
```javascript
// webpack.config.js
module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            'formular.dev.lib': path.resolve(__dirname, 'node_modules/formular.dev.lib')
        }
    }
}

// Or in tsconfig.json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "paths": {
            "formular.dev.lib": ["node_modules/formular.dev.lib"]
        }
    }
}
```

### Issue: Build Size Too Large

**Problem:**
```
WARNING in asset size limit: The following asset(s) exceed the recommended size limit
```

**Solution:**
```javascript
// Use tree-shaking - import only what you need
// Bad:
import * as Formular from 'formular.dev.lib'

// Good:
import { ServiceManagerFactory, Validators } from 'formular.dev.lib'

// Enable code splitting
// webpack.config.js
module.exports = {
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}
```

---

## 🔍 Debugging Tips

### Enable Debug Logging

```typescript
// Enable debug mode
const sm = ServiceManagerFactory.create({
    includeCoreManagers: true,
    includeFormularManager: true,
    debug: true  // ← Enable logging
})

// Or manually
if (process.env.NODE_ENV === 'development') {
    window.FORMULAR_DEBUG = true
}
```

### Inspect Form State

```typescript
// Log form state
console.log({
    isValid: form.isValid,
    isDirty: form.isDirty,
    data: form.getData(),
    fields: Array.from(form.fields.keys()),
    errors: form.getErrors()
})

// Log field state
const field = form.getField('email')
console.log({
    value: field.getValue(),
    isValid: field.isValid,
    isDirty: field.isDirty,
    isTouched: field.isTouched,
    errors: field.getErrors()
})
```

### Validate Service Registration

```typescript
// Check registered services
console.log('Registered services:', serviceManager.getRegisteredKeys())

// Validate no circular dependencies
try {
    serviceManager.validateNoCycles()
    console.log('No circular dependencies')
} catch (error) {
    console.error('Circular dependency detected:', error)
}
```

---

## 📞 Getting Help

### Still Having Issues?

1. **Check Documentation**: Review [Getting Started](./GETTING_STARTED.md) and [API Reference](./API_REFERENCE.md)
2. **Search Issues**: Look for similar problems in [GitHub Issues](https://github.com/binaryjack/formular.dev/issues)
3. **Ask Community**: Post in [GitHub Discussions](https://github.com/binaryjack/formular.dev/discussions)
4. **Report Bug**: Create a [new issue](https://github.com/binaryjack/formular.dev/issues/new) with:
   - Library version
   - Code sample reproducing the issue
   - Expected vs actual behavior
   - Error messages and stack traces

### Contact

- **Email**: [admin@formular.dev](mailto:admin@formular.dev)
- **GitHub**: [github.com/binaryjack/formular.dev](https://github.com/binaryjack/formular.dev)

---

<div align="center">

**[⬆ Back to Top](#-troubleshooting-guide)** | **[🏠 Home](./HOME.md)** | **[→ API Reference](./API_REFERENCE.md)**

</div>
