# FormContext Integration Analysis

## Overview

The new schema-based API integrates seamlessly with `pulsar-formular-ui`'s `FormContext` through the **submission strategy pattern**. This ensures that form validation, state management, and submission flow work correctly within the Pulsar reactive context.

## Architecture Integration

### Current FormContext Flow

```typescript
// pulsar-formular-ui/src/components/form-provider/FormProvider.tsx
<function_calls>const FormProvider = ({ form, data, onSaveCallback, onQuitCallback }) => {
  // FormProvider manages:
  // 1. Form lifecycle (parse data on mount, clear on unmount)
  // 2. Field updates with pre-validation
  // 3. Form submission with full validation
  // 4. Quit confirmation with dirty state check
  // 5. Modal interactions for user confirmations

  const handleSaveData = () => {
    if (!form.validateForm()) {
      return // Block submission if invalid
    }
    onSaveCallback()
  }

  const handleQuit = () => {
    if (form.isDirty) {
      openModale('form.quit.confirm') // User must confirm
      return
    }
    onQuitCallback()
  }

  return (
    <FormContext.Provider value={formContextData}>
      {/* Form fields access context via useFormContext() */}
    </FormContext.Provider>
  )
}
```

### New Schema API Integration

The new API provides two integration points:

#### 1. Direct Usage (Simple Apps)

```typescript
import { createForm, f } from 'formular.dev'

const userSchema = f.object({
    email: f.string().email().nonempty(),
    age: f.number().min(18)
})

const form = createForm({
    schema: userSchema,
    onSubmit: async (data) => {
        await api.post('/users', data)
    }
})
```

#### 2. FormContext Usage (Pulsar Apps)

```typescript
import { createForm, f, ContextSubmissionStrategy } from 'formular.dev'

const userSchema = f.object({
  email: f.string().email().nonempty(),
  age: f.number().min(18)
})

// Create form with context-aware strategy
const form = createForm({
  schema: userSchema,
  submissionStrategy: new ContextSubmissionStrategy(
    async (data) => await api.post('/users', data),
    {
      isDismissed: () => dismissSignal(),
      onValidationStart: () => setIsValidating(true),
      onValidationComplete: (isValid) => {
        setIsValidating(false)
        setErrors(isValid ? {} : form.getErrors())
      }
    }
  )
})

// Use with FormProvider
<FormProvider
  form={form}
  data={userData}
  onSaveCallback={handleSave}
  onQuitCallback={handleQuit}
>
  <InputField name="email" />
  <InputField name="age" />
</FormProvider>
```

## Submission Strategy Pattern

### Strategy Interface

```typescript
export interface IFormSubmissionStrategy<T extends object> {
    submit(data: T, form: IFormular<T>): Promise<unknown>
}
```

### DirectSubmissionStrategy

**Use Case**: Simple forms without complex state management

```typescript
const strategy = new DirectSubmissionStrategy(async (data) => {
    return await api.post('/endpoint', data)
})
```

**Behavior**:

- Submits data immediately
- No additional validation checks
- No context awareness

### ContextSubmissionStrategy

**Use Case**: Forms within FormProvider/FormContext

```typescript
const strategy = new ContextSubmissionStrategy(async (data) => await api.post('/endpoint', data), {
    isDismissed: () => userDismissedForm(),
    onValidationStart: () => showLoadingSpinner(),
    onValidationComplete: (isValid) => hideLoadingSpinner()
})
```

**Behavior**:

1. Calls `onValidationStart` → UI shows loading state
2. Validates all fields via `form.validateForm()`
3. Calls `onValidationComplete(isValid)` → UI updates
4. Checks `isDismissed()` → Blocks submission if user canceled
5. Submits data only if valid and not dismissed

## FormProvider Updates Required

### Option 1: Update FormProvider to Use Schema API (Recommended)

```typescript
// pulsar-formular-ui/src/components/form-provider/FormProvider.tsx

import { createForm, ContextSubmissionStrategy, type IObjectSchema } from 'formular.dev'

interface IFormProviderProps<T extends object> {
  schema: IObjectSchema<any> // NEW: Accept schema instead of form
  data?: T
  onSaveCallback: (data: T) => void
  onQuitCallback: () => void
  children: JSX.Element
}

const FormProvider = <T extends object>({
  schema,
  data,
  onSaveCallback,
  onQuitCallback,
  children
}: IFormProviderProps<T>) => {
  const [isDismissed, setIsDismissed] = createSignal(false)
  const [isValidating, setIsValidating] = createSignal(false)

  // Create form with context strategy
  const form = useMemo(() => {
    return createForm({
      schema,
      submissionStrategy: new ContextSubmissionStrategy(
        async (formData) => {
          onSaveCallback(formData as T)
        },
        {
          isDismissed: () => isDismissed(),
          onValidationStart: () => setIsValidating(true),
          onValidationComplete: (isValid) => {
            setIsValidating(false)
            if (!isValid) {
              // Show validation errors in modal
              openValidationModal(form.getErrors())
            }
          }
        }
      )
    })
  }, [schema])

  // Parse data on mount
  useEffect(() => {
    if (data) {
      form.parse(data)
    }
    return () => form.clear()
  }, [data, form])

  const handleSave = async () => {
    try {
      await form.submit() // Strategy handles everything
    } catch (error) {
      console.error('Submission failed:', error)
    }
  }

  const handleQuit = () => {
    if (form.isDirty) {
      openModale('form.quit.confirm')
      return
    }
    onQuitCallback()
  }

  // FormContext value (no changes needed here)
  const formContextData: IFormContext<T> = {
    form,
    updateField: (name, value) => {
      if (!form.preValidateField(name)) return
      form.updateField(name, value)
    },
    clearField: (name) => form.clearField(name),
    reset: () => form.reset(),
    getField: (name) => form.getField(name),
    validateField: (name) => form.validateField(name),
    preValidateField: (name) => form.preValidateField(name),
    validateForm: () => form.validateForm(),
    getErrors: () => form.getErrors()
  }

  return (
    <FormContext.Provider value={formContextData}>
      {/* ... */}
    </FormContext.Provider>
  )
}
```

### Option 2: Keep Current API, Add Schema Support (Backward Compatible)

```typescript
interface IFormProviderProps<T extends object> {
    form?: IFormular<T> // OLD: Optional now
    schema?: IObjectSchema<any> // NEW: Alternative to form
    data?: T
    onSaveCallback: (data: T) => void
    onQuitCallback: () => void
    children: JSX.Element
}

const FormProvider = <T extends object>(props: IFormProviderProps<T>) => {
    // Create form from schema if provided, otherwise use form prop
    const form = useMemo(() => {
        if (props.schema) {
            return createForm({
                schema: props.schema,
                submissionStrategy: new ContextSubmissionStrategy(/* ... */)
            })
        }
        if (props.form) {
            return props.form
        }
        throw new Error('Either form or schema must be provided')
    }, [props.schema, props.form])

    // Rest remains the same...
}
```

## Benefits

### 1. Type Safety

```typescript
const userSchema = f.object({
    email: f.string().email(),
    age: f.number().min(18)
})

type User = f.infer<typeof userSchema>
// { email: string, age: number }

// TypeScript enforces types
const form = createForm({
    schema: userSchema,
    onSubmit: async (data: User) => {
        data.email // ✅ Type-safe
        data.name // ❌ Error: property doesn't exist
    }
})
```

### 2. No Magic Strings

```typescript
// OLD: Magic strings everywhere
validators: {
  email: 'required|email', // ❌ No autocomplete, typo-prone
  age: 'required|min:18'
}

// NEW: Type-safe schema
schema: f.object({
  email: f.string().email().nonempty(), // ✅ Autocomplete, compile-time checks
  age: f.number().min(18)
})
```

### 3. Validation Separation

Validation logic is in the schema, not coupled to FormProvider:

```typescript
// Reusable schema
export const userSchema = f.object({
    email: f.string().email().nonempty(),
    age: f.number().min(18).max(100)
})

// Use in multiple places
const form1 = createForm({ schema: userSchema /* ... */ })
const form2 = createForm({ schema: userSchema /* ... */ })
```

### 4. FormContext Compatibility

The strategy pattern ensures FormProvider's validation flow works correctly:

- ✅ Validation waits for completion
- ✅ User can dismiss during validation
- ✅ Modal interactions preserved
- ✅ Dirty state tracking works
- ✅ Field-level validation works

## Migration Path

1. **Phase 1**: Add schema support alongside existing API
2. **Phase 2**: Update examples to use schema API
3. **Phase 3**: Deprecate old descriptor-based API (optional)

## Conclusion

The new schema API integrates perfectly with FormContext through:

1. **Submission Strategy Pattern**: Allows FormProvider to control submission flow
2. **Type Safety**: Schema provides compile-time type checking
3. **Backward Compatible**: Can coexist with current API
4. **Zero Dependencies**: Lightweight, no external libs

FormContext requires **no breaking changes** - the strategy pattern acts as an adapter between the new schema system and existing FormProvider logic.
