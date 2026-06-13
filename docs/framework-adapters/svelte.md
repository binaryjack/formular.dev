# Svelte Integration

Svelte's reactive contract is based on the store contract (an object with a `subscribe` method). Because `formular.dev` fields emit updates via their own `subscribe` method, converting a field to a native Svelte Store is trivial.

## Creating a Svelte Store

We can write a generic utility function to wrap a `formular.dev` field instance into a readable Svelte store.

```typescript
// formularStore.ts
import { readable } from 'svelte/store';
import type { IFormularManager, IInputBase } from 'formular.dev';

export function createFieldStore<TValue>(form: IFormularManager, fieldName: string) {
  const fieldInstance = form.getField<IInputBase<TValue>>(fieldName);

  if (!fieldInstance) {
    throw new Error(`Field ${fieldName} not found.`);
  }

  // The 'readable' store takes an initial value and a start function
  const store = readable(fieldInstance.getState(), (set) => {
    // Subscribe to formular.dev updates
    const unsubscribe = fieldInstance.subscribe(() => {
      set(fieldInstance.getState());
    });

    // Svelte runs this when the store has no more subscribers
    return () => unsubscribe();
  });

  return {
    subscribe: store.subscribe,
    update: (val: TValue) => form.updateField(fieldName, val),
    blur: () => fieldInstance.blur()
  };
}
```

## Component Usage

In your Svelte components, you can use the auto-subscription syntax (`$`) to magically bind to the field.

```svelte
<script lang="ts">
  import { createFieldStore } from './formularStore';
  import { formManager } from './formSetup'; // Your initialized form

  // Create the store
  const emailField = createFieldStore<string>(formManager, 'email');
</script>

<div class="form-group">
  <label for="email">Email</label>
  <input 
    id="email"
    type="email" 
    value={$emailField.value} 
    on:input={(e) => emailField.update(e.target.value)}
    on:blur={() => emailField.blur()}
    class:error={$emailField.errors.length > 0}
  />
  
  {#if $emailField.errors.length > 0}
    <div class="error-msg">
      {#each $emailField.errors as err}
        <span>{err.message}</span>
      {/each}
    </div>
  {/if}
</div>
```

Because Svelte's compiler analyzes `$emailField` dependencies, when `formular.dev` fires an update for the 'email' channel, Svelte surgically updates only the DOM nodes referencing it.
