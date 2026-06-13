# Localization (i18n)

`formular.dev` ships with built-in translation assets and localized validators for 6 languages:
- English (`en`)
- French (`fr`)
- Spanish (`es`)
- German (`de`)
- Portuguese (`pt`)
- Italian (`it`)

## Setting the Global Locale

You can configure the global validation language during form creation or by interacting directly with the `ServiceManager`.

```typescript
import { createForm, f } from 'formular.dev';

const form = await createForm({
  schema: f.object({ age: f.number().min(18) }),
  defaultValues: { age: 10 },
  locale: 'fr' // Error messages will render in French
});
```

## Overriding Messages per Validator

Even with a global locale set, you can override the error message for specific fields via the options object passed to any validator.

```typescript
const schema = f.object({
  username: f.string().nonempty({ message: "Le nom d'utilisateur est obligatoire" }),
});
```

## Providing Custom Translation Maps

If you need to support a language not included by default or want to overwrite the default dictionary entirely, you can inject a custom `LocaleProvider` into the IoC container.

```typescript
import { SetupHelpers, SLocaleProvider } from 'formular.dev';

const myCustomDictionary = {
  string: {
    min: (min) => `Mora sadržavati barem ${min} znakova`, // Croatian
    email: 'Nevažeća email adresa'
  }
};

const serviceManager = SetupHelpers.forFormApplication();
const localeProvider = serviceManager.resolve(SLocaleProvider);

// Register custom translations
localeProvider.registerLocale('hr', myCustomDictionary);
localeProvider.setLocale('hr');

// Now forms created via this serviceManager will use 'hr'
```
