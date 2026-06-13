# Presets

Formular provides a system of pre-built validation schemas for common form patterns, saving time and ensuring best practices.

## Using Pre-configured Schemas
You can quickly create a form instance using a built-in preset via `createFormFromPreset`.
```typescript
import { createFormFromPreset } from 'formular.dev';

// Initializes a standard login form (email, password, rememberMe)
const loginForm = await createFormFromPreset('login', {
    onSubmit: async (data) => {
        await auth.login(data.email, data.password);
    }
});
```

Available built-in presets include:
- `login`: Email, password, rememberMe
- `signup`: Name, email, password, confirmPassword, acceptTerms
- `contact`: Name, email, subject, message
- `profile`: User details like firstName, bio, avatar
- `address`: International address fields
- `payment`: Credit card and CVV
- `swiss-user`: Swiss localized profile including AHV
- `newsletter`: Email and preferences
- `search`: Query and filters

## Registering Custom Presets
You can register your own reusable schemas globally via the `presetRegistry`.

```typescript
import { presetRegistry, f } from 'formular.dev';

presetRegistry.register({
    name: 'organization-registration',
    description: 'Custom organization signup form',
    schema: f.object({
        orgName: f.string().nonempty(),
        taxId: f.string().pattern(/^\d{2}-\d{7}$/).nonempty()
    }),
    fields: {}
});

// Later in your application:
const orgForm = await createFormFromPreset('organization-registration', {
    onSubmit: async (data) => { /* ... */ }
});
```
