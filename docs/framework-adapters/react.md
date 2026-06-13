# React Integration

`formular.dev` is framework-agnostic. Because it relies on a high-performance pub/sub event bus rather than deep object proxying, integrating it into React is incredibly efficient. Instead of re-rendering an entire form context on every keystroke, you can subscribe individual inputs to their specific field channels.

## Using `useSyncExternalStore`

The most idiomatic way to integrate `formular.dev` reactive state in React 18+ is via `useSyncExternalStore`. This ensures that field updates tear down cleanly without concurrent rendering tearing.

### 1. Create a `useField` Hook

```typescript
import { useSyncExternalStore, useCallback } from 'react';
import type { IFormularManager, IInputBase } from 'formular.dev';

export function useField<TValue>(form: IFormularManager, fieldName: string) {
  // 1. Retrieve the underlying vanilla input instance
  const fieldInstance = form.getField<IInputBase<TValue>>(fieldName);

  // 2. Subscribe to the specific field's event channel
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!fieldInstance) return () => {};
      
      // Assume DataMutationObserverSubject or similar subscription
      const unsubscribe = fieldInstance.subscribe(onStoreChange);
      return () => unsubscribe();
    },
    [fieldInstance]
  );

  // 3. Extract the current state slice
  const getSnapshot = useCallback(() => {
    return fieldInstance ? fieldInstance.getState() : null;
  }, [fieldInstance]);

  // Sync with React
  const state = useSyncExternalStore(subscribe, getSnapshot);

  return {
    state,
    field: fieldInstance,
    onChange: (val: TValue) => form.updateField(fieldName, val),
    onBlur: () => fieldInstance?.blur()
  };
}
```

### 2. Building an Isolated Input Component

By wrapping our hook in an atomic component, typing into this input will *only* re-render this specific input, bypassing the rest of the React tree.

```tsx
import React from 'react';

export const TextField = ({ form, name, label }) => {
  const { state, onChange, onBlur } = useField<string>(form, name);

  if (!state) return null;

  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="text"
        value={state.value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={state.errors.length > 0 ? 'error' : ''}
      />
      {state.errors.map(err => (
        <span key={err.code} className="error-text">{err.message}</span>
      ))}
    </div>
  );
};
```

## Accessing the Form Manager via Context

Instead of passing the `form` instance directly to every component, you can use React Context. Because the field components only subscribe to specific field mutations, changing a field value will not trigger a context re-render!

```tsx
import React, { createContext, useContext } from 'react';
import type { IFormularManager } from 'formular.dev';

const FormularContext = createContext<IFormularManager | null>(null);

export const FormularProvider = ({ form, children }) => (
  <FormularContext.Provider value={form}>
    {children}
  </FormularContext.Provider>
);

export const useFormular = () => {
  const context = useContext(FormularContext);
  if (!context) throw new Error("useFormular must be used within FormularProvider");
  return context;
};
```

Now your components can grab the `form` seamlessly:

```tsx
export const TextField = ({ name, label }) => {
  const form = useFormular();
  const { state, onChange } = useField<string>(form, name);
  // ...
};
```
