# Multilingual Validation Guide

Complete guide to implementing multilingual validation messages in formular.dev applications.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Supported Languages](#supported-languages)
- [Translation Service](#translation-service)
- [Localized Validator Factory](#localized-validator-factory)
- [Integration Patterns](#integration-patterns)
- [Custom Translations](#custom-translations)
- [Advanced Usage](#advanced-usage)
- [API Reference](#api-reference)

---

## Overview

Formular.dev provides comprehensive multilingual support for validation messages through:

- **Built-in translations** for 6 languages (EN, FR, ES, DE, PT, IT)
- **60+ pre-translated validation keys** covering all common scenarios
- **Token replacement** for dynamic values in messages
- **Runtime locale switching** without application restart
- **Custom translation override** capability
- **Framework-agnostic** integration patterns

### Architecture

```
ValidationLocalizeKeys (enum)
    ↓
Translation Service (locale.{lang}.json)
    ↓
ValidationConstraintBuilder (messages)
    ↓
IValidationResult (user-facing errors)
```

---

## Quick Start

### 1. Basic Translation

```typescript
import { 
  ValidationTranslationService, 
  ValidationLocalizeKeys 
} from 'formular.dev';

// Initialize with desired locale
const translationService = new ValidationTranslationService({ 
  defaultLocale: 'fr' 
});

// Translate a validation key
const message = translationService.translate(
  ValidationLocalizeKeys.emailError
);
// Result: "Le format de l'email n'est pas correct"
```

### 2. Localized Validators

```typescript
import { 
  createCommonLocalizedValidators,
  ValidationLocalizeKeys 
} from 'formular.dev';

// Create validators with French messages
const validators = createCommonLocalizedValidators('email', { 
  locale: 'fr' 
});

const emailValidator = new GenericValidationBuilder().setConstraints([
  validators.required(),
  validators.minLength(5),
  validators.maxLength(100),
  validators.pattern(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    ValidationLocalizeKeys.emailError,
    ValidationLocalizeKeys.emailGuide
  )
]);
```

### 3. Complete Form Validation

```typescript
import { createLocalizedFormValidators } from 'formular.dev';

const formValidators = createLocalizedFormValidators(
  { locale: 'es' },
  {
    email: (v) => [v.required(), v.pattern(/email-regex/)],
    age: (v) => [v.required(), v.min(18), v.max(100)],
    username: (v) => [v.required(), v.minLength(3)]
  }
);
```

---

## Supported Languages

| Locale Code | Language | Status |
|-------------|----------|--------|
| `en` | English | ✅ Complete (60+ keys) |
| `fr` | French | ✅ Complete (60+ keys) |
| `es` | Spanish | ✅ Complete (60+ keys) |
| `de` | German | ✅ Complete (60+ keys) |
| `pt` | Portuguese | ✅ Complete (60+ keys) |
| `it` | Italian | ✅ Complete (60+ keys) |

All translations include:
- Field-specific validations (email, phone, name, etc.)
- Generic constraints (min, max, length, pattern)
- Country-specific formats (Switzerland, multi-country)
- Token placeholders for dynamic values

---

## Translation Service

### Initialization

```typescript
import { ValidationTranslationService } from 'formular.dev';

// Default English locale
const service = new ValidationTranslationService();

// Custom default locale
const serviceFr = new ValidationTranslationService({ 
  defaultLocale: 'fr' 
});

// With custom translations
const serviceCustom = new ValidationTranslationService({
  defaultLocale: 'en',
  customTranslations: new Map([
    ['en', {
      locale: 'en',
      validations: [
        { 
          key: 'VALIDATION.CUSTOM.ERROR', 
          value: 'Custom error message' 
        }
      ]
    }]
  ])
});
```

### Core Methods

#### `translate(key, data?, data2?, locale?)`

Translate a validation key to a localized message.

```typescript
// Basic translation
const msg1 = service.translate(ValidationLocalizeKeys.requiredError);
// "This field is required"

// With dynamic data
const msg2 = service.translate(
  ValidationLocalizeKeys.minError, 
  10
);
// "The value should be higher than 10"

// With two dynamic values
const msg3 = service.translate(
  ValidationLocalizeKeys.betweenMaxMinError,
  5,
  20
);
// "The value must be between 5 and 20"

// Override locale for single translation
const msg4 = service.translate(
  ValidationLocalizeKeys.emailError,
  undefined,
  undefined,
  'de'
);
// "Das E-Mail-Format ist nicht korrekt"
```

#### `setLocale(locale)`

Change the active locale at runtime.

```typescript
service.setLocale('fr');
// All subsequent translations use French

service.translate(ValidationLocalizeKeys.requiredError);
// "Ce champ est requis"
```

#### `addCustomTranslation(locale, translation)`

Add or override translations for a locale.

```typescript
service.addCustomTranslation('en', {
  locale: 'en',
  validations: [
    {
      key: 'VALIDATION.EMAIL.ERROR',
      value: 'Please provide a valid email address'
    }
  ]
});
```

#### `getTranslationBuilder(locale?)`

Get a curried translation function for efficient repeated use.

```typescript
const t = service.getTranslationBuilder('it');

const errors = {
  email: t(ValidationLocalizeKeys.emailError),
  required: t(ValidationLocalizeKeys.requiredError),
  min: t(ValidationLocalizeKeys.minError, 5)
};
```

---

## Localized Validator Factory

### createCommonLocalizedValidators

Creates pre-configured validator builders with localized messages.

```typescript
import { createCommonLocalizedValidators } from 'formular.dev';

const validators = createCommonLocalizedValidators('age', { 
  locale: 'de' 
});

// Use individual validators
const ageConstraints = [
  validators.required(),           // German: "Dieses Feld ist erforderlich"
  validators.min(18),              // German: "Der Wert muss größer als 18 sein"
  validators.max(100),             // German: "Der Wert muss kleiner als 100 sein"
];
```

Available validators:
- `required(value?: boolean)`
- `min(value: number)`
- `max(value: number)`
- `minLength(value: number)`
- `maxLength(value: number)`
- `pattern(regex: RegExp, errorKey?, guideKey?)`

### createLocalizedFormValidators

Batch create validators for entire forms.

```typescript
const formValidators = createLocalizedFormValidators(
  { locale: 'pt' },
  {
    // Email field
    email: (v) => [
      v.required(),
      v.minLength(5),
      v.pattern(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        ValidationLocalizeKeys.emailError,
        ValidationLocalizeKeys.emailGuide
      )
    ],
    
    // Password field
    password: (v) => [
      v.required(),
      v.minLength(8),
      v.maxLength(128)
    ],
    
    // Age field
    age: (v) => [
      v.required(),
      v.min(18),
      v.max(120)
    ]
  }
);

// Access individual validators
const emailValidator = formValidators.email;
const passwordValidator = formValidators.password;
```

### withLocalization

Wrap existing validators with localized messages.

```typescript
import { withLocalization } from 'formular.dev';

// Existing validator
const baseValidator = new ValidationConstraintBuilder('min')
  .setConstraint(10)
  .setName('age');

// Add French localization
const localizedValidator = withLocalization(
  baseValidator,
  ValidationLocalizeKeys.minError,
  ValidationLocalizeKeys.minGuide,
  { locale: 'fr' },
  '10'  // Dynamic data for |data| token
);
```

---

## Integration Patterns

### Pattern 1: React Hook

```typescript
// hooks/useValidationMessages.ts
import { useMemo } from 'react';
import { 
  ValidationTranslationService,
  createCommonLocalizedValidators 
} from 'formular.dev';

export function useValidationMessages(locale: string) {
  const service = useMemo(
    () => new ValidationTranslationService({ defaultLocale: locale as any }),
    [locale]
  );

  const createValidators = useMemo(
    () => (fieldName: string) => 
      createCommonLocalizedValidators(fieldName, { locale: locale as any }),
    [locale]
  );

  return { service, createValidators };
}

// Component usage
function RegistrationForm() {
  const { locale } = useI18n(); // Your i18n hook
  const { createValidators } = useValidationMessages(locale);
  
  const emailValidators = createValidators('email');
  const constraints = [
    emailValidators.required(),
    emailValidators.pattern(/email-regex/)
  ];
}
```

### Pattern 2: Global Service Instance

```typescript
// services/validation.ts
import { 
  ValidationTranslationService,
  validationTranslationService // Singleton
} from 'formular.dev';

// Initialize on app startup
export function initializeValidationService(locale: string) {
  validationTranslationService.setLocale(locale as any);
}

// Use globally
import { translateValidation } from 'formular.dev';

const message = translateValidation(ValidationLocalizeKeys.emailError);
```

### Pattern 3: Vue Composition API

```typescript
// composables/useValidation.ts
import { ref, watch } from 'vue';
import { 
  ValidationTranslationService,
  createLocalizedFormValidators 
} from 'formular.dev';

export function useValidation(locale: Ref<string>) {
  const service = ref(
    new ValidationTranslationService({ defaultLocale: locale.value })
  );

  watch(locale, (newLocale) => {
    service.value.setLocale(newLocale as any);
  });

  const createFormValidators = (definitions: any) => {
    return createLocalizedFormValidators(
      { locale: locale.value as any },
      definitions
    );
  };

  return { service, createFormValidators };
}
```

### Pattern 4: Angular Service

```typescript
// services/validation-i18n.service.ts
import { Injectable } from '@angular/core';
import { 
  ValidationTranslationService,
  SupportedLocale 
} from 'formular.dev';

@Injectable({ providedIn: 'root' })
export class ValidationI18nService {
  private service: ValidationTranslationService;

  constructor() {
    this.service = new ValidationTranslationService();
  }

  setLocale(locale: SupportedLocale) {
    this.service.setLocale(locale);
  }

  translate(key: string, ...args: any[]) {
    return this.service.translate(key, ...args);
  }
}
```

### Pattern 5: Display Layer Resolution

```typescript
// Let validators use keys, resolve in UI
import { ValidationLocalizeKeys } from 'formular.dev';

// Validator uses keys
const constraint = new ValidationConstraintBuilder('required')
  .setErrorMessage(ValidationLocalizeKeys.requiredError);

// In your React component
function ErrorDisplay({ validationResult }: any) {
  const { t } = useTranslation(); // Your i18n library
  
  // Treat validation key as i18n key
  return (
    <div className="error">
      {t(validationResult.error)}
    </div>
  );
}
```

---

## Custom Translations

### Override Built-in Messages

```typescript
const service = new ValidationTranslationService({ defaultLocale: 'en' });

// Override English email error
service.addCustomTranslation('en', {
  locale: 'en',
  validations: [
    {
      key: 'VALIDATION.EMAIL.ERROR',
      value: 'Oops! That email looks wrong 🤔'
    }
  ]
});
```

### Add New Locale

```typescript
service.addCustomTranslation('ja', {
  locale: 'ja',
  validations: [
    { key: 'VALIDATION.EMAIL.ERROR', value: 'メールアドレスの形式が正しくありません' },
    { key: 'VALIDATION.REQUIRED.ERROR', value: 'この項目は必須です' },
    // ... more translations
  ]
});

service.setLocale('ja' as any);
```

### Custom Validation Keys

```typescript
// Define your own keys
enum CustomValidationKeys {
  customBusinessRule = 'VALIDATION.CUSTOM.BUSINESS_RULE.ERROR'
}

// Add translations
service.addCustomTranslation('en', {
  locale: 'en',
  validations: [
    {
      key: CustomValidationKeys.customBusinessRule,
      value: 'This violates our business rule: |data|'
    }
  ]
});

// Use in validators
const constraint = new ValidationConstraintBuilder('custom')
  .setErrorMessage(
    service.translate(CustomValidationKeys.customBusinessRule, 'No duplicates')
  );
```

---

## Advanced Usage

### Dynamic Token Replacement

The translation system supports two token placeholders: `|data|` and `|data2|`.

```typescript
// Single token
service.translate(ValidationLocalizeKeys.minError, 5);
// "The value should be higher than 5"

// Two tokens
service.translate(ValidationLocalizeKeys.betweenMaxMinError, 10, 50);
// "The value must be between 10 and 50"

// Custom tokens in configuration
const customService = new ValidationTranslationService({
  defaultLocale: 'en',
  tokens: ['{{value}}', '{{max}}']  // Custom token format
});
```

### Batch Translation

```typescript
const keys = [
  ValidationLocalizeKeys.emailError,
  ValidationLocalizeKeys.passwordError,
  ValidationLocalizeKeys.requiredError
];

const translations = service.translateBatch(keys, 'fr');
// Map<ValidationLocalizeKeys, string>

translations.forEach((message, key) => {
  console.log(`${key}: ${message}`);
});
```

### Runtime Locale Switching

```typescript
// Application state
let currentLocale = 'en';

function changeLocale(newLocale: SupportedLocale) {
  currentLocale = newLocale;
  validationTranslationService.setLocale(newLocale);
  
  // Re-validate all forms with new locale
  formManager.revalidateAll();
}

// User clicks language selector
changeLocale('fr');
```

### Conditional Localization

```typescript
function createValidator(fieldName: string, userLocale: string) {
  // Use localized validators only for certain locales
  if (['fr', 'de', 'es'].includes(userLocale)) {
    return createCommonLocalizedValidators(fieldName, { 
      locale: userLocale as SupportedLocale 
    });
  }
  
  // Fall back to default validators
  return createStandardValidators(fieldName);
}
```

---

## API Reference

### ValidationTranslationService

#### Constructor

```typescript
constructor(config?: IValidationTranslationConfig)
```

**Parameters:**
- `config.defaultLocale?: SupportedLocale` - Initial locale (default: 'en')
- `config.customTranslations?: Map<SupportedLocale, IValidationLocalize>` - Custom translations
- `config.tokens?: [string, string]` - Token identifiers (default: ['|data|', '|data2|'])

#### Methods

##### `translate(key, data?, data2?, locale?): string`

Translate a validation key to localized message.

##### `setLocale(locale: SupportedLocale): void`

Set the active locale.

##### `getLocale(): SupportedLocale`

Get the current active locale.

##### `addCustomTranslation(locale, translation): void`

Add or override translations for a locale.

##### `getTranslationBuilder(locale?): Function`

Get curried translation function.

##### `translateBatch(keys, locale?): Map`

Translate multiple keys at once.

##### `getAvailableLocales(): SupportedLocale[]`

Get list of all loaded locales.

##### `isLocaleSupported(locale): boolean`

Check if a locale is supported.

---

### Factory Functions

#### `createLocalizedConstraint<T>(type, errorKey, guideKey, config, data?, data2?)`

Create a single localized ValidationConstraintBuilder.

#### `createLocalizedValidatorFactory(config)`

Returns a factory function for creating localized constraints.

#### `withLocalization<T>(builder, errorKey, guideKey, config, data?, data2?)`

Wrap existing builder with localized messages.

#### `createCommonLocalizedValidators(name, config)`

Create set of common validators with localization.

**Returns object with:**
- `required(value?: boolean)`
- `min(value: number)`
- `max(value: number)`
- `minLength(value: number)`
- `maxLength(value: number)`
- `pattern(regex: RegExp, errorKey?, guideKey?)`

#### `createLocalizedValidator(constraints)`

Create GenericValidationBuilder from constraint array.

#### `createLocalizedFormValidators(config, definitions)`

Batch create validators for multiple fields.

---

### Types

#### `SupportedLocale`

```typescript
type SupportedLocale = 'en' | 'fr' | 'es' | 'de' | 'pt' | 'it'
```

#### `ILocalizedValidatorConfig`

```typescript
interface ILocalizedValidatorConfig {
  locale: SupportedLocale
  translationService?: ValidationTranslationService
}
```

#### `IValidationLocalize`

```typescript
interface IValidationLocalize {
  locale: string
  validations: ILocalize[]
}

interface ILocalize {
  key: string
  value: string
}
```

---

## Best Practices

### 1. Initialize Once

```typescript
// ✅ Good: Initialize service once
const service = new ValidationTranslationService({ defaultLocale: 'fr' });

// ❌ Bad: Creating new service repeatedly
function validateEmail() {
  const service = new ValidationTranslationService(); // Wasteful
}
```

### 2. Use Singleton for Global State

```typescript
// ✅ Good: Use provided singleton
import { validationTranslationService } from 'formular.dev';

validationTranslationService.setLocale('de');
```

### 3. Leverage Factory Functions

```typescript
// ✅ Good: Use factory for consistent validators
const validators = createCommonLocalizedValidators('email', { locale: 'es' });

// ❌ Bad: Manually creating each validator
const req = new ValidationConstraintBuilder('required')
  .setErrorMessage(service.translate(...));
```

### 4. Separate Concerns

```typescript
// ✅ Good: Translation service separate from validation logic
const service = new ValidationTranslationService();
const validator = createEmailValidator();
const message = service.translate(ValidationLocalizeKeys.emailError);

// ❌ Bad: Mixing concerns
const validator = createEmailValidator('Le format email...');
```

### 5. Type Safety

```typescript
// ✅ Good: Use enum for keys
import { ValidationLocalizeKeys } from 'formular.dev';
service.translate(ValidationLocalizeKeys.emailError);

// ❌ Bad: String literals
service.translate('VALIDATION.EMAIL.ERROR'); // No autocomplete
```

---

## Troubleshooting

### Messages Not Translating

**Problem:** Validation messages still show in English.

**Solution:**
```typescript
// Ensure locale is set
service.setLocale('fr');

// Check locale is loaded
console.log(service.getAvailableLocales());

// Verify translation exists
const msg = service.translate(ValidationLocalizeKeys.emailError);
console.log(msg); // Should be French
```

### Custom Translations Not Working

**Problem:** Custom translations not overriding built-ins.

**Solution:**
```typescript
// Add custom translations AFTER service initialization
const service = new ValidationTranslationService({ defaultLocale: 'en' });

// Then override
service.addCustomTranslation('en', {
  locale: 'en',
  validations: [/* your custom translations */]
});
```

### Tokens Not Replacing

**Problem:** Messages show `|data|` instead of actual values.

**Solution:**
```typescript
// Ensure you pass data parameters
service.translate(
  ValidationLocalizeKeys.minError,
  10  // ← Don't forget this!
);
```

---

## Migration Guide

### From Custom i18n to Built-in Translations

**Before:**
```typescript
const errorMessage = i18n.t('validation.email.error');
```

**After:**
```typescript
import { validationTranslationService, ValidationLocalizeKeys } from 'formular.dev';

const errorMessage = validationTranslationService.translate(
  ValidationLocalizeKeys.emailError
);
```

### From Hardcoded Messages

**Before:**
```typescript
const validator = new ValidationConstraintBuilder('required')
  .setErrorMessage('This field is required');
```

**After:**
```typescript
const validators = createCommonLocalizedValidators('fieldName', { 
  locale: currentLocale 
});
const validator = validators.required();
```

---

## Examples Repository

For complete working examples, see:
- React + formular.dev: `/examples/react-multilingual`
- Vue + formular.dev: `/examples/vue-multilingual`
- Angular + formular.dev: `/examples/angular-multilingual`
- Vanilla JS: `/examples/vanilla-multilingual`

---

## Support

- **Issues:** [GitHub Issues](https://github.com/binaryjack/formular.dev/issues)
- **Discussions:** [GitHub Discussions](https://github.com/binaryjack/formular.dev/discussions)
- **Documentation:** [formular.dev/docs](https://formular.dev/docs)

---

**Version:** 1.0.0  
**Last Updated:** December 2025  
**License:** MIT
