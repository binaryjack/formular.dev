# Using `IFieldInput` with Popular Frontend Frameworks and Raw HTML/JS/CSS

This document provides examples of how to use the `IFieldInput` interface with popular frontend frameworks (Angular, Vue, Solid, Svelte) and in raw HTML, JavaScript, and CSS. Examples are provided in both TypeScript and JavaScript.

---

## 1. Angular

### TypeScript Example

```typescript
import { Component } from '@angular/core'

@Component({
    selector: 'app-field-input',
    template: `<input [value]="fieldInput.value" (input)="onInput($event)" />`
})
export class FieldInputComponent {
    fieldInput = { value: '', onChange: (value: string) => console.log(value) }

    onInput(event: Event): void {
        const input = event.target as HTMLInputElement
        this.fieldInput.onChange(input.value)
    }
}
```

---

## 2. Vue

### TypeScript Example

```typescript
<template>
    <input :value="fieldInput.value" @input="onInput" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            fieldInput: { value: '', onChange: (value: string) => console.log(value) },
        };
    },
    methods: {
        onInput(event: Event) {
            const input = event.target as HTMLInputElement;
            this.fieldInput.onChange(input.value);
        },
    },
});
</script>
```

---

## 3. Solid

### TypeScript Example

```typescript
import { createSignal } from 'solid-js';

const FieldInput = () => {
    const [value, setValue] = createSignal('');
    const fieldInput = { value: value(), onChange: setValue };

    return <input value={fieldInput.value} onInput={(e) => fieldInput.onChange(e.currentTarget.value)} />;
};

export default FieldInput;
```

---

## 4. Svelte

### TypeScript Example

```typescript
<script lang="ts">
    let fieldInput = { value: '', onChange: (value: string) => console.log(value) };

    function onInput(event: Event) {
        const input = event.target as HTMLInputElement;
        fieldInput.onChange(input.value);
    }
</script>

<input bind:value={fieldInput.value} on:input={onInput} />
```

---

## 5. Raw HTML, JavaScript, and CSS

### HTML

```html
<input id="fieldInput" />
```

### JavaScript

```javascript
const fieldInput = { value: '', onChange: (value) => console.log(value) }

const inputElement = document.getElementById('fieldInput')
inputElement.value = fieldInput.value

inputElement.addEventListener('input', (event) => {
    fieldInput.onChange(event.target.value)
})
```

### CSS

```css
#fieldInput {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
```

---

This guide demonstrates how to integrate `IFieldInput` into various frameworks and raw implementations. Adjust the examples as needed for your specific use case.
