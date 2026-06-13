# Quick Start

The Simple API allows you to create fully-functional forms in a single step, hiding the underlying Dependency Injection setup while maintaining complete type safety.

## 1. Define the Schema

Use the `f` schema builder to declare your data structure and validation rules declaratively. This is very similar to popular libraries like Zod or Yup.

```typescript
import { f } from 'formular.dev';

const signUpSchema = f.object({
  username: f.string().min(3).max(30).nonempty(),
  email: f.string().email().nonempty(),
  age: f.number().min(18).max(120),
  acceptTerms: f.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions'
  })
});
```

## 2. Infer Types

You don't need to duplicate your data interfaces. `formular.dev` can automatically infer the TypeScript type directly from your schema.

```typescript
type SignUpData = f.infer<typeof signUpSchema>;
// { username: string; email: string; age: number; acceptTerms: boolean }
```

## 3. Create the Form

Use the `createForm` function to instantiate the form, providing the schema, default values, and submission handlers.

```typescript
import { createForm } from 'formular.dev';

const form = await createForm({
  schema: signUpSchema,
  defaultValues: {
    username: '',
    email: '',
    age: 18,
    acceptTerms: false
  },
  onSubmit: async (data: SignUpData) => {
    // `data` is strongly typed and fully validated!
    await api.post('/register', data);
  },
  onSuccess: (response, data) => {
    console.log('Registration successful!');
  },
  onError: (error) => {
    console.error('Registration failed:', error);
  }
});
```

## 4. Programmatic Control

The form instance provides programmatic methods to interact with fields, trigger validation, and submit the form.

```typescript
// Update field values directly
form.updateField('username', 'alex_dev');

// Read current field state
const userField = form.getField('username');
console.log(userField?.value); // 'alex_dev'

// Trigger submission (runs full schema validation)
const success = await form.submit();
if (success) {
  console.log('Form validated and submitted successfully!');
}

// Clean up resources when the form is unmounted
form.destroy();
```
