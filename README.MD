# FORMULAR.DEV

<div align="center">

![Development Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)
![Version](https://img.shields.io/badge/Version-1.0-blue?style=flat-square)
![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript)

</div>

**Author:** Piana Tadeo  
**License:** MIT  
**Repository:** [GitHub](https://github.com/binaryjack/formular.dev)

---

## Overview

FORMULAR is a **framework-agnostic**, TypeScript-based form management library built on modern architectural patterns including dependency injection, reactive state management, and modular design.

This repository contains the **core library** (`formular.dev.lib`) and its **design system** (`formular.design.system`). 

Framework-specific integrations (React, Vue, Angular, etc.), web components, and experimental packages are maintained separately in the **[R-D-Labs repository](https://github.com/binaryjack/R-D-Labs)**.

---

## 📦 Repository Contents

### 1. **formular.dev.lib** - Core Form Management Library
The framework-agnostic form management library featuring:
- Advanced IoC container with dependency injection
- Comprehensive validation system (18+ validators)
- Reactive state management
- Builder pattern for form configuration
- TypeScript-first design with full type safety

### 2. **formular.design.system** - Design System
TailwindCSS-based design system providing:
- Design tokens (colors, typography, spacing, shadows)
- Component styling utilities
- Theme configuration
- Shared styling infrastructure

---

## 🚀 Quick Start

> **⚠️ Note**: NPM packages are not yet published. The library is in active development.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/binaryjack/formular.dev
cd formular.dev

# Install dependencies (PNPM required)
pnpm install

# Build all packages
pnpm build

# Watch mode for development
pnpm dev:lib
```

### Available Scripts

```bash
# Build library and design system
pnpm build

# Build only the core library
pnpm build:lib

# Build only the design system
pnpm build:design-system

# Development mode (watch)
pnpm dev

# Run tests
pnpm test

# Security audit
pnpm security:check
```

---

## ✨ Core Library Features

### 🎯 Form Management
- **ServiceManagerFactory**: Advanced IoC container with dependency injection, lazy resolution, and lifecycle management
- **FormularManager**: Central form management service with builder pattern and descriptor-based form creation
- **Field Management**: Complete field binding, validation, and reactive state tracking
- **TypeScript Support**: Comprehensive type definitions with intelligent auto-completion

### ✅ Validation System
- **18+ Built-in Validators**: Email, phone, names, passwords, dates, currency, age, username, time, numeric, URL, credit card, SSN
- **Country-Specific Validators**: Phone, postal code, and SSN validation for multiple countries
- **🇨🇭 Switzerland Validators**: AHV (social security), NPA (postal codes), Swiss phone numbers
- **Multi-Country Support**: Validate across multiple countries with single validator calls
- **Configurable Triggers**: Real-time validation with customizable trigger events (onChange, onBlur, etc.)

### 🔧 Architecture
- **IoC Container**: Advanced service manager with dependency injection and circular dependency detection
- **Notification System**: High-performance observer pattern with batched updates and priority handling
- **Form State Management**: Complete form lifecycle with isDirty, isValid, isBusy tracking
- **Memory Management**: Automatic cleanup and optimized garbage collection
- **Prototype-based Classes**: Performance-optimized class architecture

### 🔒 Developer Experience
- **Full TypeScript Support**: Comprehensive type definitions with intelligent auto-completion
- **Builder Pattern**: Fluent API for form and validation configuration
- **Extensive Documentation**: JSDoc comments and usage examples throughout
- **Test Infrastructure**: Jest setup with expanding test coverage

---

## 🎨 Design System

The design system package provides:
- **Design Tokens**: Typography, spacing, colors, shadows, and animations
- **TailwindCSS Integration**: Pre-configured utilities and component styles
- **Theme System**: Customizable theming infrastructure
- **Component Presets**: Reusable styling patterns

---

## 🏗️ Framework Integrations

Framework-specific implementations are maintained in **[R-D-Labs](https://github.com/binaryjack/R-D-Labs)**:

- **React Components** - Full React implementation with hooks and context
- **Vue.js, Angular, Svelte, SolidJS** - Framework adapters (in development)
- **Web Components** - Vanilla Custom Elements implementation
- **Documentation Site** - Interactive demos and guides

This separation keeps the core library lean and framework-agnostic while allowing experimental integrations to evolve independently.

---

## 📚 Repository Structure

```
formular.dev/
├── packages/
│   ├── lib/                    # Core form management library
│   │   ├── src/
│   │   │   ├── core/          # Core managers and services
│   │   │   ├── validators/    # Validation system
│   │   │   └── types/         # TypeScript definitions
│   │   └── package.json
│   │
│   └── design-system/          # Design system package
│       ├── src/
│       │   ├── tokens/        # Design tokens
│       │   ├── styles/        # CSS and utilities
│       │   └── types/         # Type definitions
│       └── package.json
│
├── CONTRIBUTING.md             # Contributing guidelines
├── LICENSE                     # MIT License
├── README.md                   # This file
├── SECURITY.md                 # Security policy
├── package.json                # Root package.json
├── pnpm-workspace.yaml         # PNPM workspace config
└── tsconfig.base.json          # Base TypeScript config
```

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](./CONTRIBUTING.md) before submitting pull requests.

### Development Guidelines
- Use **PNPM** for package management
- Follow the **prototype-based** class architecture
- Write comprehensive **JSDoc** comments
- Add **tests** for new features
- Follow **TypeScript strict** mode

### Areas We Need Help
- Expanding test coverage
- Documentation and examples
- Performance optimizations
- Bug fixes and improvements

---

## 📖 Documentation

- [Contributing Guidelines](./CONTRIBUTING.md)
- [Security Policy](./SECURITY.md)
- [Migration Guide](./MIGRATION_TO_R-D-LABS.md) - For historical reference

---

## 🗺️ Roadmap

### ✅ Version 1.0 (Completed)
- Core form and field mechanics
- Comprehensive validation system (18+ validators)
- Multi-country validation support
- IoC container with dependency injection
- High-performance notification system
- Monorepo architecture with PNPM

### 🚧 Version 2.0 (In Development)
- NPM package publication
- Enhanced TypeScript definitions
- Expanded test coverage
- Performance profiling tools
- Comprehensive API documentation

### 🔮 Future Plans
- Form builder UI
- Visual form designer
- AI-assisted validation
- Additional country-specific validators

---

## 📝 License

MIT License - see [LICENSE](./LICENSE) file for details

---

## 💬 Contact & Support

- 📧 Email: [admin@formular.dev](mailto:admin@formular.dev)
- 💬 GitHub Discussions: [Join the conversation](https://github.com/binaryjack/formular.dev/discussions)
- 🐛 Issues: [Report bugs](https://github.com/binaryjack/formular.dev/issues)
- 🔀 Pull Requests: [Contribute code](https://github.com/binaryjack/formular.dev/pulls)

---

**Note**: This repository focuses exclusively on the core library and design system. For framework integrations, demos, and experimental features, visit [R-D-Labs](https://github.com/binaryjack/R-D-Labs).
