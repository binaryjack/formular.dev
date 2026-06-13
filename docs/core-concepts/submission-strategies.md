# Form Submission Strategies

The project implements a Strategy Pattern for form submissions (`src/submission-strategy.ts`) using the `IFormSubmissionStrategy<T>` interface. This decouples the core submission logic from context-specific checks like UI dismissals or validation lifecycles.

## Direct Submission Strategy

`DirectSubmissionStrategy` immediately executes the submission function without any preemptive checks. It is ideal for programmatic submissions, tests, or simple forms where validation guarantees are handled externally.

```typescript
const directStrategy = new DirectSubmissionStrategy((data) => {
    return api.post('/submit', data);
});

// Bypasses validation, calls the submitFn directly
await directStrategy.submit(data, form);
```

## Context-Aware Submission Strategy

`ContextSubmissionStrategy` is tailored for integrated UI contexts (like `FormProvider` or `FormContext` in `pulsar-formular-ui`). It ensures validation completes and gives the surrounding context a chance to intercept or dismiss the submission.

### Lifecycle 
When `submit(data, form)` is called on a Context strategy:
1. Calls `onValidationStart` hook.
2. Awaits `form.validateForm()`.
3. Calls `onValidationComplete(isValid)` hook.
4. Throws `FormSubmissionError` if validation failed.
5. Checks `isDismissed()` hook; throws `FormDismissedError` if the user dismissed the form.
6. Executes the actual `submitFn`.

```typescript
const contextStrategy = new ContextSubmissionStrategy(
    (data) => api.post('/submit', data),
    {
        onValidationStart: () => setLoading(true),
        onValidationComplete: (isValid) => console.log('Valid:', isValid),
        isDismissed: () => userCancelled
    }
);
```
