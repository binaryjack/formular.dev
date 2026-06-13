# Custom Validators

While `formular.dev` provides extensive built-in validation methods (like `.email()`, `.min()`, `.pattern()`), complex business logic often requires custom cross-field or asynchronous validation.

## The `.refine()` Method

The easiest way to add custom validation to a specific schema field is via `.refine()`. This method takes a predicate function and returns `true` if valid, or `false` if invalid.

```typescript
import { f } from 'formular.dev';

const userSchema = f.object({
  username: f.string()
    .min(3)
    .refine((val) => val !== 'admin', {
      message: 'The username "admin" is reserved.',
      code: 'reserved_username'
    }),
});
```

### Asynchronous Refinements

You can also pass asynchronous predicates for things like database lookups:

```typescript
const emailSchema = f.string()
  .email()
  .refine(async (val) => {
    const isAvailable = await api.checkEmailAvailability(val);
    return isAvailable;
  }, {
    message: 'This email is already registered.'
  });
```

> [!WARNING]
> Async validators will suspend the submission until they resolve. Be sure to handle debouncing if running async validators on every keystroke.

## Cross-Field Validation

For validation that depends on multiple fields (e.g., "Confirm Password" matching "Password"), you apply `.refine()` at the object level rather than the field level.

```typescript
const passwordSchema = f.object({
  password: f.string().min(8),
  confirmPassword: f.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'] // Attaches the error to the confirmPassword field specifically
});
```

## Creating Custom Base Types

If you find yourself repeatedly using a complex refinement, you can wrap it in a custom factory function extending the base builder APIs.

```typescript
// Define it once
function fCurrency() {
  return f.string().pattern(/^\d+(\.\d{2})?$/, {
    message: 'Must be a valid currency amount (e.g. 10.50)'
  });
}

// Use it anywhere
const paymentSchema = f.object({
  amount: fCurrency(),
});
```
