# SolidJS Integration

SolidJS uses fine-grained reactivity via Signals. Since `formular.dev` already uses a pub/sub pattern internally to isolate field updates, mapping it to SolidJS Signals offers the absolute pinnacle of form performance.

## Creating a `createField` primitive

We can build a reactive primitive using Solid's `createSignal` and `onCleanup`.

```typescript
import { createSignal, onCleanup } from 'solid-js';
import type { IFormularManager, IInputBase } from 'formular.dev';

export function createField<TValue>(form: IFormularManager, fieldName: string) {
  const fieldInstance = form.getField<IInputBase<TValue>>(fieldName);
  
  if (!fieldInstance) {
    throw new Error(`Field ${fieldName} not found.`);
  }

  // Create a Solid signal
  const [state, setState] = createSignal(fieldInstance.getState());

  // Subscribe to formular.dev updates
  const unsubscribe = fieldInstance.subscribe(() => {
    setState(fieldInstance.getState());
  });

  // Automatically clean up when the component unmounts
  onCleanup(() => {
    unsubscribe();
  });

  return {
    state,
    update: (val: TValue) => form.updateField(fieldName, val),
    blur: () => fieldInstance.blur()
  };
}
```

## Component Usage

SolidJS will track where `state()` is called in the JSX and update specifically those DOM text nodes or attributes without running the entire component function again.

```tsx
import { createField } from './createField';
import { formManager } from './formSetup';

export function EmailInput() {
  const { state, update, blur } = createField<string>(formManager, 'email');

  return (
    <div class="form-group">
      <label for="email">Email</label>
      <input 
        id="email"
        type="email"
        // Solid automatically tracks state().value here
        value={state().value}
        onInput={(e) => update(e.currentTarget.value)}
        onBlur={blur}
        classList={{ 'is-error': state().errors.length > 0 }}
      />
      
      <Show when={state().errors.length > 0}>
        <div class="error-msg">
          <For each={state().errors}>
            {(err) => <span>{err.message}</span>}
          </For>
        </div>
      </Show>
    </div>
  );
}
```
