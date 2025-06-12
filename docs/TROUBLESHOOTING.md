# FORMULAR Troubleshooting & FAQ

## Table of Contents

- [Common Issues](#common-issues)
- [Error Messages](#error-messages)
- [Performance Issues](#performance-issues)
- [Debugging Tools](#debugging-tools)
- [Migration Guide](#migration-guide)
- [Frequently Asked Questions](#frequently-asked-questions)

## Common Issues

### Form Instance Not Found

**Problem**: Component shows "Unable to locate form instance" or similar error.

**Causes**:

- Form schema not properly defined
- FormularManager not initialized
- ServiceManager dependencies missing
- Form instance not passed to FormularForm component

**Solutions**:

```tsx
// 1. Ensure form schema is complete
const schema: IEntityScheme = {
    name: 'user-form',
    properties: [
        InputTextBuilder.setId(1)
            .setName('username')  // This name must match fieldName prop
            .setLabel('Username')
            .build()
    ]
}

// 2. Create form instance properly
const formManager = serviceManager.resolve<IFormularManager>(SFormularManager)
const formInstance = formManager.createFromSchema<UserData>('user-form', schema)

// 3. Verify FormularForm wrapper
<FormularForm formular={formInstance}>
    <InputText fieldName="username" />  {/* Must match schema name */}
</FormularForm>
```

### Field Validation Not Working

**Problem**: Validation rules are defined but not triggering.

**Common Causes**:

- Validation not properly registered in schema
- ValidationManager not initialized
- Trigger events not configured

**Solutions**:

```tsx
// 1. Ensure validation is properly set in schema
InputTextBuilder.setId(1)
    .setName('email')
    .setValidationData(
        true, // Enable validation
        Validators.email('email', true) // Required email validation
            .minLength(5)
            .build()
    )
    .build()

// 2. Check validation triggers in form setup
const formInstance = formManager.createFromSchema<UserData>('form-id', schema)
formInstance.setTriggerKeyWord(['onChange', 'onBlur']) // Set when to validate

// 3. Manually trigger validation if needed
await formInstance.checkAllFieldsAreValid()
```

### TypeScript Type Errors

**Problem**: TypeScript compilation errors with FORMULAR types.

**Common Issues**:

```tsx
// ❌ Incorrect - missing generic type
const formInstance = formManager.createFromSchema('form-id', schema)

// ✅ Correct - with proper generic type
const formInstance = formManager.createFromSchema<UserData>('form-id', schema)

// ❌ Incorrect - wrong interface implementation
interface UserForm {
    name: string
    email: string
}

// ✅ Correct - matching schema and interface
interface UserData {
    username: string // Must match schema field names
    email: string
}
```

### Circular Dependency Errors

**Problem**: "Circular dependency detected" error during development.

**Causes**:

- Services depending on each other cyclically
- Incorrect dependency registration
- Missing lazy resolution

**Solutions**:

```tsx
// 1. Use lazy resolution for circular dependencies
const lazyService = serviceManager.lazy<IMyService>(SMyService)
const service = lazyService() // Resolve only when needed

// 2. Check dependency validation
if (process.env.NODE_ENV === 'development') {
    serviceManager.validateNoCycles() // This will throw if cycles exist
}

// 3. Restructure dependencies to avoid cycles
// Instead of A -> B -> A, use A -> C <- B pattern
```

## Error Messages

### "MISSING ID! Component requires an id"

**Cause**: Field component cannot find the field definition in the form schema.

**Solution**:

```tsx
// Ensure fieldName matches schema definition exactly
const schema = {
    properties: [
        InputTextBuilder.setName('firstName').build()  // Schema defines 'firstName'
    ]
}

// Component must use exact same name
<InputText fieldName="firstName" />  // ✅ Correct
<InputText fieldName="firstname" />  // ❌ Wrong - case mismatch
```

### "ServiceManager is not provided"

**Cause**: Service not properly registered or dependency injection failing.

**Solution**:

```tsx
// 1. Ensure ServiceManager is initialized
const serviceManager = new ServiceManager()

// 2. Register all required services
setupManagers(serviceManager)
setupFormularManager(serviceManager)
setupBaseInputClasses(serviceManager)

// 3. Verify service registration
serviceManager.registerClass(SMyService, MyService, {
    lifetime: 'singleton',
    dependencies: [SServiceManager] // Include required dependencies
})
```

### "Field validation strategy not found"

**Cause**: Validation strategy not registered or incorrect validator reference.

**Solution**:

```tsx
// 1. Register validation strategies
const validationStrategy = serviceManager.resolve<IValidationStrategyService>(
    SValidationStrategyService
)
validationStrategy.strategies = [
    emailValidationStrategy,
    phoneValidationStrategy,
    customValidationStrategy
]

// 2. Use correct validator references
Validators.email('email', true).build() // ✅ Correct
Validators.emailValidator('email', true).build() // ❌ Wrong method name
```

## Performance Issues

### Slow Form Rendering

**Symptoms**: Form takes long time to render, especially with many fields.

**Solutions**:

1. **Use Lazy Loading for Complex Components**:

```tsx
const HeavyComponent = lazy(() => import('./heavy-component'))

// Use Suspense wrapper
<Suspense fallback={<div>Loading...</div>}>
    <HeavyComponent fieldName="complexField" />
</Suspense>
```

2. **Optimize Validation Triggers**:

```tsx
// Instead of validating on every change
formInstance.setTriggerKeyWord(['onChange'])

// Validate only on blur and submit
formInstance.setTriggerKeyWord(['onBlur', 'onSubmit'])
```

3. **Batch Notifications**:

```tsx
// Configure notification batching for better performance
const notificationManager = serviceManager.resolve<INotificationManager>(SNotificationManager)
notificationManager.setBatchConfig({
    maxBatchSize: 100,
    batchDelay: 8,
    enablePriority: true,
    strategy: 'microtask'
})
```

### Memory Leaks

**Symptoms**: Memory usage increases over time, especially in SPAs.

**Solutions**:

1. **Proper Form Cleanup**:

```tsx
useEffect(() => {
    return () => {
        // Clean up form when component unmounts
        formManager.clear(formInstance)
    }
}, [])
```

2. **Service Manager Disposal**:

```tsx
// In application cleanup
serviceManager.dispose() // Cleans up all singleton services
```

3. **Unsubscribe from Observables**:

```tsx
useEffect(() => {
    const subscription = field.observers.subscribe(handleChange)

    return () => {
        subscription.unsubscribe() // Prevent memory leaks
    }
}, [])
```

## Debugging Tools

### Form State Inspector

```tsx
// Add to your component for debugging
const FormDebugger = ({ formInstance }: { formInstance: IFormular<any> }) => {
    const [debugData, setDebugData] = useState({})

    useEffect(() => {
        const updateDebugData = () => {
            setDebugData({
                fields: formInstance.fields.map((f) => ({
                    name: f.input.name,
                    value: f.input.value,
                    isValid: f.input.isValid,
                    isDirty: f.input.isDirty,
                    errors: f.input.validationResults
                })),
                formData: formInstance.getData(),
                formFlags: formInstance.getFormFlags()
            })
        }

        updateDebugData()
        const interval = setInterval(updateDebugData, 1000)
        return () => clearInterval(interval)
    }, [formInstance])

    if (process.env.NODE_ENV !== 'development') return null

    return (
        <div className="debug-panel">
            <h3>Form Debug Info</h3>
            <pre>{JSON.stringify(debugData, null, 2)}</pre>
        </div>
    )
}
```

### Service Container Inspector

```tsx
// Debug service registrations
const debugServices = () => {
    const services = serviceManager.services
    console.table(
        Array.from(services.entries()).map(([key, descriptor]) => ({
            service: key.toString(),
            lifetime: descriptor.lifetime,
            dependencies: descriptor.dependencies?.map((d) => d.toString()) || []
        }))
    )
}
```

### Performance Profiler

```tsx
// Add performance monitoring
const PerformanceMonitor = () => {
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            performance.mark('form-render-start')

            return () => {
                performance.mark('form-render-end')
                performance.measure('form-render', 'form-render-start', 'form-render-end')

                const measure = performance.getEntriesByName('form-render')[0]
                console.log(`Form render time: ${measure.duration}ms`)
            }
        }
    }, [])

    return null
}
```

## Migration Guide

### From Version 1.x to 2.x

**Breaking Changes**:

- Service registration API changed
- Validation API restructured
- Form creation methods updated

**Migration Steps**:

1. **Update Service Registration**:

```tsx
// Old API (v1.x)
serviceManager.register('ValidationManager', ValidationManager)

// New API (v2.x)
serviceManager.registerClass(SValidationManager, ValidationManager, {
    lifetime: 'singleton'
})
```

2. **Update Form Creation**:

```tsx
// Old API
const form = FormularManager.create(schema)

// New API
const formManager = serviceManager.resolve<IFormularManager>(SFormularManager)
const form = formManager.createFromSchema<DataType>('form-id', schema)
```

3. **Update Validation Syntax**:

```tsx
// Old API
.setValidation(Validators.required(), Validators.email())

// New API
.setValidationData(true, Validators.required().email().build())
```

### Legacy Component Migration

```tsx
// Old component pattern
const OldComponent = ({ field }) => {
    return <input value={field.value} onChange={field.onChange} />
}

// New component pattern
const NewComponent = ({ fieldName }) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    return (
        <FieldSet flags={flags}>
            <input {...instance?.register()} />
        </FieldSet>
    )
}
```

## Frequently Asked Questions

### Q: Can I use FORMULAR with other form libraries?

**A**: FORMULAR is designed to be the primary form management solution. However, you can integrate it with other libraries by:

- Using FORMULAR for validation and state management
- Creating adapter components that bridge to other UI libraries
- Utilizing the headless nature of FORMULAR's core engine

### Q: How do I handle file uploads with FORMULAR?

**A**: Create a custom file upload component:

```tsx
const FileUpload = ({ fieldName }) => {
    const { instance } = useField(formInstance?.getField(fieldName))

    const handleFileChange = (files: FileList) => {
        instance?.input?.valueManager?.setValue(instance, Array.from(files))
    }

    return (
        <FieldSet>
            <input type="file" onChange={(e) => handleFileChange(e.target.files)} />
        </FieldSet>
    )
}
```

### Q: Can I create multi-step forms?

**A**: Yes, use multiple form instances or conditional rendering:

```tsx
const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(1)

    return (
        <FormularForm formular={formInstance}>
            {currentStep === 1 && <Step1Fields />}
            {currentStep === 2 && <Step2Fields />}
            {currentStep === 3 && <Step3Fields />}
        </FormularForm>
    )
}
```

### Q: How do I implement custom validation rules?

**A**: Create custom validation strategies:

```tsx
const customValidator: IValidationMethodStrategy = {
    validate: (value, field) => {
        const isValid = /* your validation logic */
        return {
            isValid,
            errors: isValid ? [] : ['Custom error message'],
            fieldName: field.name
        }
    },
    validateAsync: async (value, field) => {
        // Async validation logic
    }
}

// Register the strategy
validationStrategy.strategies = [customValidator]
```

### Q: Can I use FORMULAR in a React Native app?

**A**: The core FORMULAR engine is framework-agnostic. You would need to:

- Use the core engine (`@core` modules)
- Create React Native-specific adapters
- Implement platform-specific components

### Q: How do I handle form submission errors?

**A**: Use the form's notification system:

```tsx
const handleSubmit = async (data) => {
    try {
        await submitToAPI(data)
    } catch (error) {
        // Show error notification
        formInstance.notificationManager?.notify('error', {
            message: 'Submission failed',
            details: error.message
        })
    }
}
```

### Q: Can I conditionally show/hide fields?

**A**: Yes, use conditional rendering based on form state:

```tsx
const ConditionalFields = () => {
    const { formInstance } = useFormularContext()
    const showAdvanced = formInstance?.getField('showAdvanced')?.input?.value

    return (
        <>
            <CheckInput fieldName="showAdvanced" />
            {showAdvanced && (
                <>
                    <InputText fieldName="advancedField1" />
                    <InputText fieldName="advancedField2" />
                </>
            )}
        </>
    )
}
```

### Q: How do I implement real-time validation?

**A**: Configure validation triggers and debouncing:

```tsx
// Set real-time validation
formInstance.setTriggerKeyWord(['onChange'])

// With debouncing for performance
const debouncedValidation = debounce(async () => {
    await formInstance.checkAllFieldsAreValid()
}, 300)

// Apply to specific field changes
field.input.onChange = (value) => {
    field.input.value = value
    debouncedValidation()
}
```

## Need More Help?

- Check the [API Documentation](./API_DOCUMENTATION.md)
- Review [Component Documentation](./COMPONENT_DOCUMENTATION.md)
- Look at [Examples](./EXAMPLES_DOCUMENTATION.md)
- Create an issue on the project repository
- Join our community discussions

## Contributing to Documentation

If you encounter issues not covered here, please:

1. Document your solution
2. Submit a pull request with updates to this guide
3. Help improve the documentation for other developers
