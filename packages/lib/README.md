# formular.dev Library

Advanced, framework-agnostic form management library with comprehensive validation, multilingual support, and reactive state management.

## Features

-   🚀 **Framework Agnostic** - Works with React, Vue, Angular, or vanilla JavaScript
-   ✅ **Advanced Validation** - 18+ built-in validators with custom validation support
-   🌍 **Multilingual** - Built-in translations for 6 languages (EN, FR, ES, DE, PT, IT)
-   ⚡ **High Performance** - Optimized validation with minimal overhead
-   🎯 **Type Safe** - Full TypeScript support with comprehensive type definitions
-   🔧 **IoC Container** - Flexible dependency injection system
-   📱 **Responsive** - Built-in responsive layout utilities

## Installation

```bash
npm install formular.dev
# or
pnpm add formular.dev
# or
yarn add formular.dev
```

## Quick Start

### Basic Form

```typescript
import { FormularEngine, emailValidator } from 'formular.dev'

const form = new FormularEngine()

// Create a field with validation
form.createField('email', {
    validation: emailValidator('email')
})

// Validate
await form.validate()

if (form.isValid) {
    console.log('Form is valid!', form.getValues())
}
```

### Multilingual Validation

```typescript
import { createCommonLocalizedValidators, ValidationLocalizeKeys } from 'formular.dev'

// Create validators with French messages
const validators = createCommonLocalizedValidators('email', {
    locale: 'fr'
})

const emailValidator = validators.pattern(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    ValidationLocalizeKeys.emailError,
    ValidationLocalizeKeys.emailGuide
)
```

## Documentation

-   **[📖 Multilingual Validation Guide](../../docs/MULTILINGUAL_VALIDATION_GUIDE.md)** - Complete guide to internationalization
-   **[📋 API Reference](../../docs/API_REFERENCE.md)** - Comprehensive API documentation
-   **[🚀 Usage Examples](../../docs/USAGE_EXAMPLES.md)** - Real-world usage patterns
-   **[🏁 Quick Start](../../docs/QUICK_START.md)** - Get started in minutes

## Supported Languages

-   🇬🇧 English (en)
-   🇫🇷 French (fr)
-   🇪🇸 Spanish (es)
-   🇩🇪 German (de)
-   🇵🇹 Portuguese (pt)
-   🇮🇹 Italian (it)

**All translations are fully overridable and extensible!**

## Dependencies

This package depends on `shared-assets` for logo icons and other shared resources. Ensure `shared-assets` is installed and referenced correctly.

## License

MIT © 2025 Piana Tadeo
