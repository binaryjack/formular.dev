# 🏠 FORMULAR.dev Documentation

<div align="center">

![FORMULAR.dev](https://img.shields.io/badge/formular.dev-v1.0.56-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)

**A sophisticated, framework-agnostic form and input management library**

[Get Started](#-quick-links) • [API Reference](./API_REFERENCE.md) • [GitHub](https://github.com/binaryjack/formular.dev)

</div>

---

<div style="border: 2px solid #4CAF50; border-radius: 8px; padding: 20px; margin: 20px 0; background-color: #f9f9f9;">

### 📋 Document Information

| Property | Value |
|----------|-------|
| **Author** | Piana Tadeo |
| **Library Version** | 1.0.56 |
| **Documentation Version** | 1.0.0 |
| **Last Updated** | December 14, 2025 |
| **License** | MIT |
| **Repository** | [github.com/binaryjack/formular.dev](https://github.com/binaryjack/formular.dev) |

</div>

---

## 📚 Documentation Navigation

### 🚀 Getting Started

- **[Getting Started Guide](./GETTING_STARTED.md)** - Installation, setup, and your first form
- **[Quick Reference](./QUICK_REFERENCE.md)** - Cheat sheet with common patterns and examples
- **[Examples by Topic](./examples/)** - Hands-on examples organized by use case

### 📖 Core Documentation

- **[Core Concepts](./CORE_CONCEPTS.md)** - Architecture, ServiceManager, IoC Container
- **[Validation System](./VALIDATION_SYSTEM.md)** - Validators, rules, multilingual support
- **[Components Guide](./COMPONENTS.md)** - React components, Web Components, integration
- **[Form Management](./FORM_MANAGEMENT.md)** - Creating forms, field management, state handling
- **[API Reference](./API_REFERENCE.md)** - Complete API documentation

### 🔧 Advanced Topics

- **[Advanced Usage](./ADVANCED_TOPICS.md)** - Custom services, performance, testing
- **[Architecture Deep Dive](./ARCHITECTURE.md)** - Design patterns, internal workings
- **[Migration Guides](./MIGRATION.md)** - Upgrading versions, migrating from other libraries
- **[Best Practices](./BEST_PRACTICES.md)** - Recommended patterns and conventions

### 🆘 Help & Troubleshooting

- **[Troubleshooting Guide](./TROUBLESHOOTING.md)** - Common issues and solutions
- **[FAQ](./FAQ.md)** - Frequently asked questions
- **[Contributing](../../CONTRIBUTING.md)** - How to contribute to the project

---

## 🎯 What is FORMULAR.dev?

FORMULAR.dev is a modern, framework-agnostic form management library that provides:

- ✅ **Comprehensive Validation** - 18+ built-in validators with multi-country support
- 🌍 **Multilingual Support** - Built-in translations for 6 languages (EN, FR, ES, DE, PT, IT)
- 🔧 **IoC Container** - Advanced dependency injection with ServiceManagerFactory
- ⚛️ **Framework Adapters** - React (available), Vue.js & Angular (planned)
- 🎨 **Web Components** - Experimental vanilla Custom Elements implementation
- 🚀 **High Performance** - Prototype-based architecture, batched notifications
- 💪 **TypeScript First** - Full type safety with comprehensive definitions
- 🏗️ **Enterprise Ready** - Production-tested with memory management and error handling

---

## 🏃 Quick Start

### Installation

```bash
npm install formular.dev.lib
# or
pnpm add formular.dev.lib
# or
yarn add formular.dev.lib
```

### Your First Form

```typescript
import { ServiceManagerFactory } from 'formular.dev.lib'

// Create service manager with all features
const serviceManager = ServiceManagerFactory.create({
    includeCoreManagers: true,
    includeFormularManager: true,
    includeInputEngine: true
})

// Get the FormularManager
const formularManager = serviceManager.resolve('IFormularManager')

// Create a form with validation
const formular = formularManager.createFromDescriptors('user-form', [
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        validation: {
            required: true,
            email: true
        }
    }
])

// Validate and submit
await formular.validate()
if (formular.isValid) {
    const data = formular.getData()
    console.log('Form data:', data)
}
```

**[→ Continue to Getting Started Guide](./GETTING_STARTED.md)**

---

## 📦 Package Structure

```
formular.dev/
├── packages/
│   ├── lib/                    # Core library (framework-agnostic)
│   ├── formular.components/    # React components
│   ├── web-components/         # Web Components (experimental)
│   └── formular.design.system/ # Design system & Tailwind config
├── docs/                       # This documentation
└── examples/                   # Example projects
```

---

## 🔑 Key Features by Topic

### Validation
- [18+ Built-in Validators](./VALIDATION_SYSTEM.md#built-in-validators)
- [Multi-Country Support](./VALIDATION_SYSTEM.md#multi-country-validation)
- [Custom Validators](./VALIDATION_SYSTEM.md#custom-validators)
- [Multilingual Messages](./MULTILINGUAL_VALIDATION_GUIDE.md)

### Architecture
- [Service Manager & IoC](./CORE_CONCEPTS.md#service-manager)
- [FormularManager](./CORE_CONCEPTS.md#formular-manager)
- [Notification System](./CORE_CONCEPTS.md#notification-system)
- [Memory Management](./ADVANCED_TOPICS.md#memory-management)

### Components
- [React Components](./COMPONENTS.md#react-components)
- [Web Components](./COMPONENTS.md#web-components)
- [Custom Components](./COMPONENTS.md#creating-custom-components)

### Integration
- [React Integration](./GETTING_STARTED.md#react-integration)
- [Vue.js Integration](./MIGRATION.md#vuejs-adapter-planned)
- [Angular Integration](./MIGRATION.md#angular-adapter-planned)
- [Vanilla JavaScript](./GETTING_STARTED.md#vanilla-javascript)

---

## 🎓 Learning Path

### For Beginners
1. Read [Getting Started Guide](./GETTING_STARTED.md)
2. Try [Basic Examples](./examples/basic/)
3. Explore [Quick Reference](./QUICK_REFERENCE.md)
4. Review [Troubleshooting](./TROUBLESHOOTING.md)

### For Intermediate Users
1. Study [Core Concepts](./CORE_CONCEPTS.md)
2. Learn [Validation System](./VALIDATION_SYSTEM.md)
3. Understand [Form Management](./FORM_MANAGEMENT.md)
4. Practice with [Advanced Examples](./examples/advanced/)

### For Advanced Users
1. Master [Advanced Topics](./ADVANCED_TOPICS.md)
2. Review [Architecture](./ARCHITECTURE.md)
3. Explore [API Reference](./API_REFERENCE.md)
4. Contribute via [Contributing Guide](../../CONTRIBUTING.md)

---

## 🔗 External Resources

- **Website**: [formular.dev](https://formular.dev)
- **GitHub**: [github.com/binaryjack/formular.dev](https://github.com/binaryjack/formular.dev)
- **NPM**: [npmjs.com/package/formular.dev.lib](https://www.npmjs.com/package/formular.dev.lib)
- **Issues**: [GitHub Issues](https://github.com/binaryjack/formular.dev/issues)
- **Discussions**: [GitHub Discussions](https://github.com/binaryjack/formular.dev/discussions)

---

## 📧 Support

- **Email**: [admin@formular.dev](mailto:admin@formular.dev)
- **GitHub Issues**: [Report a bug or request a feature](https://github.com/binaryjack/formular.dev/issues)
- **Discussions**: [Ask questions or share ideas](https://github.com/binaryjack/formular.dev/discussions)

---

## 📄 License

FORMULAR.dev is licensed under the MIT License. See [LICENSE](../../LICENSE) for details.

---

<div align="center">

**[⬆ Back to Top](#-formuladev-documentation)** | **[→ Getting Started](./GETTING_STARTED.md)** | **[📖 API Reference](./API_REFERENCE.md)**

---

Made with ❤️ by [Piana Tadeo](https://github.com/binaryjack)

</div>
