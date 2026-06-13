# Vanilla JS Integration

`formular.dev` has zero dependencies and is explicitly designed to work flawlessly in Vanilla JS environments. You don't need a Virtual DOM to achieve incredible performance.

## Standard Integration

In a Vanilla JS environment, you query your DOM elements and manually attach listeners and subscribers.

```javascript
import { createForm, f } from 'formular.dev';

// 1. Define Schema
const schema = f.object({
  email: f.string().email().nonempty()
});

async function init() {
  // 2. Initialize Form
  const form = await createForm({
    schema,
    defaultValues: { email: '' },
    onSubmit: async (data) => console.log('Submit', data)
  });

  const emailInput = document.getElementById('email-input');
  const errorContainer = document.getElementById('email-errors');
  const submitBtn = document.getElementById('submit-btn');

  const field = form.getField('email');

  // 3. Listen to DOM events -> Update Formular
  emailInput.addEventListener('input', (e) => {
    form.updateField('email', e.target.value);
  });
  
  emailInput.addEventListener('blur', () => {
    field.blur();
  });

  // 4. Subscribe to Formular events -> Update DOM
  field.subscribe(() => {
    const state = field.getState();
    
    // Formular isolates updates, so this only runs when 'email' actually changes
    if (state.errors.length > 0) {
      emailInput.classList.add('invalid');
      errorContainer.innerHTML = state.errors.map(err => err.message).join('<br>');
    } else {
      emailInput.classList.remove('invalid');
      errorContainer.innerHTML = '';
    }
  });

  // 5. Submit Handling
  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await form.submit();
  });
}

init();
```

## Using Web Components

If you are building vanilla Web Components (Custom Elements), `formular.dev` fits perfectly inside the `connectedCallback` and `disconnectedCallback` lifecycles.

```javascript
class FormularField extends HTMLElement {
  connectedCallback() {
    this.name = this.getAttribute('name');
    this.form = window.GlobalFormManager; // Example of accessing the manager
    
    this.field = this.form.getField(this.name);
    
    this.input = document.createElement('input');
    this.append(this.input);

    this.input.addEventListener('input', (e) => this.form.updateField(this.name, e.target.value));
    
    this.unsubscribe = this.field.subscribe(() => this.render());
    this.render();
  }

  render() {
    const state = this.field.getState();
    this.input.value = state.value;
    if (state.errors.length) {
      this.input.style.borderColor = 'red';
    } else {
      this.input.style.borderColor = 'black';
    }
  }

  disconnectedCallback() {
    if (this.unsubscribe) this.unsubscribe();
  }
}

customElements.define('formular-field', FormularField);
```
