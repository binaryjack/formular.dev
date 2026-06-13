# Vue 3 Integration

Integrating `formular.dev` with Vue 3 is exceptionally straightforward due to Vue's flexible Composition API. Since `formular.dev` relies on explicit pub/sub channels, we can bridge it to Vue's reactive system using `customRef` or standard `ref`s combined with `onMounted`/`onUnmounted` lifecycles.

## Creating a `useField` Composable

A custom composable can encapsulate the subscription logic. By wrapping the field's state in a Vue `ref`, the template will automatically re-render whenever `formular.dev` broadcasts an update on that specific field channel.

```typescript
import { ref, onUnmounted, watchEffect } from 'vue';
import type { IFormularManager, IInputBase } from 'formular.dev';

export function useField<TValue>(form: IFormularManager, fieldName: string) {
  const fieldInstance = form.getField<IInputBase<TValue>>(fieldName);
  
  // Create a Vue reactive reference initialized with the field's current state
  const state = ref(fieldInstance ? fieldInstance.getState() : null);
  
  if (!fieldInstance) {
    console.warn(`Field ${fieldName} not found in form.`);
    return { state, update: () => {} };
  }

  // Subscribe to the formular.dev channel for this specific input
  const unsubscribe = fieldInstance.subscribe(() => {
    // Whenever formular updates, trigger Vue reactivity
    state.value = fieldInstance.getState();
  });

  // Clean up the subscription when the component unmounts
  onUnmounted(() => {
    unsubscribe();
  });

  // Provide a clean update method
  const update = (newValue: TValue) => {
    form.updateField(fieldName, newValue);
  };

  return {
    state,
    update,
    field: fieldInstance
  };
}
```

## Usage in a Vue Component

Here is an example of an isolated `<TextField />` component using our composable.

```vue
<template>
  <div class="form-group" v-if="state">
    <label :for="name">{{ label }}</label>
    
    <input
      :id="name"
      type="text"
      :value="state.value"
      @input="onInput"
      @blur="onBlur"
      :class="{ 'is-invalid': state.errors.length > 0 }"
    />
    
    <div v-if="state.errors.length > 0" class="error-messages">
      <span v-for="err in state.errors" :key="err.code">
        {{ err.message }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { IFormularManager } from 'formular.dev';
import { useField } from './useField';

const props = defineProps<{
  form: IFormularManager;
  name: string;
  label: string;
}>();

const { state, update, field } = useField<string>(props.form, props.name);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  update(target.value);
};

const onBlur = () => {
  field?.blur();
};
</script>

<style scoped>
.is-invalid {
  border-color: red;
}
.error-messages {
  color: red;
  font-size: 0.8em;
}
</style>
```

## Provide / Inject

To avoid prop-drilling the `form` instance, use Vue's native `provide` and `inject`:

**Parent Component (Form Wrapper):**
```vue
<script setup>
import { provide } from 'vue';
import { formInstance } from './my-form-setup';

provide('formularManager', formInstance);
</script>
```

**Child Component (Field):**
```vue
<script setup>
import { inject } from 'vue';
import { useField } from './useField';

const props = defineProps<{ name: string }>();
const form = inject('formularManager');

const { state, update } = useField(form, props.name);
</script>
```
