# Performance Tuning

While `formular.dev` is inherently optimized (handling 100+ fields in sub-100ms initialization), massive enterprise applications with complex data grids or thousands of inputs may require explicit tuning.

## 1. Debouncing Input Streams

By default, every keystroke updates the form engine and triggers validation logic. For heavy asynchronous validations, this can cause network throttling.

You should implement UI-level debouncing before pushing values to `formular.updateField()`.

```typescript
import { debounce } from 'lodash';

// Debounce updates by 300ms
const handleInput = debounce((val) => {
  form.updateField('username', val);
}, 300);
```

> [!TIP]
> Some framework adapters may allow configuring debounce natively on the bindings.

## 2. Granular UI Subscriptions

The golden rule of `formular.dev` performance: **Never subscribe at the form root level unless absolutely necessary.**

If you subscribe to the entire form context, every single keystroke across any field will trigger a global re-render. Instead, subscribe only to individual field channels.

**❌ Bad Pattern (Global Render):**
```tsx
const state = useSyncExternalStore(form.subscribe, form.getState);
return <input value={state.fields.email.value} />;
```

**✅ Good Pattern (Isolated Render):**
```tsx
const field = form.getField('email');
const state = useSyncExternalStore(field.subscribe, field.getState);
return <input value={state.value} />;
```

## 3. Disabling Real-time Validation

If you only want to validate upon submission, you can disable real-time validation checks during standard updates. 

```typescript
const form = await createForm({
  schema: massiveSchema,
  defaultValues: data,
  config: {
    validateOnUpdate: false, // Default is true
    validateOnBlur: true
  }
});
```

By setting `validateOnUpdate: false`, the pub/sub channels will only broadcast state updates (value changes), but the heavy validation routines will be deferred until the field loses focus or the user submits the form.
