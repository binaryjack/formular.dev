# formular.dev Library

<div align="center">

[![Form Creation](https://img.shields.io/badge/100--field%20creation-70ms-brightgreen)](../../docs/PERFORMANCE_REPORT.md)
[![Validation](https://img.shields.io/badge/100--field%20validation-30ms-brightgreen)](../../docs/PERFORMANCE_REPORT.md)
[![Bundle Size](https://img.shields.io/badge/bundle%20size-45KB-brightgreen)](../../docs/PERFORMANCE_REPORT.md)
[![Performance Tests](https://img.shields.io/badge/performance%20tests-100%25%20passing-brightgreen)](../../docs/PERFORMANCE_REPORT.md)

**The only form library you'll ever need.**  
Framework-agnostic • Enterprise-ready • Lightning-fast

[📊 Performance Report](../../docs/PERFORMANCE_REPORT.md) • [📖 Documentation](../../docs/) • [🚀 Quick Start](#quick-start)

</div>

---

## Why formular.dev?

### 🎯 True Framework Agnostic

The **only** form library that works seamlessly with React, Vue, Angular, and vanilla JavaScript using the **same API**. No framework lock-in, ever.

### ⚡ Production-Ready Performance

-   **Sub-100ms** rendering for 100-field forms
-   **40-50% faster** validation with intelligent caching
-   **45KB** core bundle (12KB gzipped) with **zero runtime dependencies**

### 🌍 Enterprise Features Built-In

-   **6 languages included** - English, French, Spanish, German, Portuguese, Italian
-   **12+ country formats** - Phone, postal codes, SSN validation
-   **IoC Container** - Dependency injection for testability
-   **Full TypeScript** - Type-safe form handling

### 📊 Competitive Performance

| Feature               | formular.dev     | React Hook Form | Formik        |
| --------------------- | ---------------- | --------------- | ------------- |
| **100-field form**    | 60-80ms          | ~25ms           | ~60ms         |
| **Framework support** | ✅ All           | ❌ React only   | ❌ React only |
| **Built-in i18n**     | ✅ 6 languages   | ❌              | ❌            |
| **Multi-country**     | ✅ 12+ countries | ❌              | ❌            |
| **Zero dependencies** | ✅               | ✅              | ❌            |

[See full performance benchmarks →](../../docs/PERFORMANCE_REPORT.md)

---

## Features

-   🚀 **Framework Agnostic** - Works with React, Vue, Angular, or vanilla JavaScript
-   ✅ **Advanced Validation** - 18+ built-in validators with custom validation support
-   🌍 **Multilingual** - Built-in translations for 6 languages (EN, FR, ES, DE, PT, IT)
-   ⚡ **High Performance** - Optimized validation caching and parallel processing
-   🎯 **Type Safe** - Full TypeScript support with comprehensive type definitions
-   🔧 **IoC Container** - Flexible dependency injection system
-   📱 **Responsive** - Built-in responsive layout utilities
-   🌎 **Multi-Country** - Phone, postal, SSN validation for 12+ countries

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

## License f

MIT © 2025 Piana Tadeo
