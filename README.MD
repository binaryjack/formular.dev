# FORMULAR

<div align="center">
  <img src="./packages/shared-assets/assets/apple-touch-icon.png" alt="FORMULAR Logo" width="200" />
</div>

<div align="center">

<!-- Project Status -->
![Development Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)
![Version](https://img.shields.io/badge/Version-1.3--SNAPSHOT-blue?style=flat-square)
![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)

<!-- NPM Packages -->
![NPM Core](https://img.shields.io/badge/NPM%20Core-Coming%20Soon-lightgrey?style=flat-square&logo=npm)
![NPM React](https://img.shields.io/badge/NPM%20React-Coming%20Soon-lightgrey?style=flat-square&logo=npm)
![NPM Design System](https://img.shields.io/badge/NPM%20Design%20System-Coming%20Soon-lightgrey?style=flat-square&logo=npm)

<!-- Technology Stack -->
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js)
![PNPM](https://img.shields.io/badge/PNPM-Workspace-F69220?style=flat-square&logo=pnpm)

<!-- Framework Support -->
![React](https://img.shields.io/badge/React-✅%20Ready-61DAFB?style=flat-square&logo=react)
![Vue.js](https://img.shields.io/badge/Vue.js-🚧%20In%20Progress-4FC08D?style=flat-square&logo=vue.js)
![Angular](https://img.shields.io/badge/Angular-📋%20Planned-DD0031?style=flat-square&logo=angular)
![Svelte](https://img.shields.io/badge/Svelte-📋%20Planned-FF3E00?style=flat-square&logo=svelte)
![SolidJS](https://img.shields.io/badge/SolidJS-📋%20Planned-2C4F7C?style=flat-square&logo=solid)
![Vanilla JS](https://img.shields.io/badge/Vanilla%20JS-🚧%20In%20Progress-F7DF1E?style=flat-square&logo=javascript)

<!-- Build & Quality -->
![Build](https://img.shields.io/badge/Build-Passing-success?style=flat-square)
![Tests](https://img.shields.io/badge/Tests-In%20Progress-yellow?style=flat-square)
![Coverage](https://img.shields.io/badge/Coverage-TBD-lightgrey?style=flat-square)

<!-- Special Features -->
![Switzerland](https://img.shields.io/badge/🇨🇭%20Switzerland-Native%20Support-red?style=flat-square)
![Multi Country](https://img.shields.io/badge/🌍%20Multi--Country-12%2B%20Countries-blue?style=flat-square)
![Validation](https://img.shields.io/badge/Validators-20%2B%20Built--in-green?style=flat-square)

</div>

**Author:** Piana Tadeo  
**License:** MIT  
**Website:** [https://formular.dev/](https://formular.dev/)  
**Repository:** [GitHub](https://github.com/binaryjack/formular.dev)  
**Documentation:** [Full Documentation](https://docs.formular.dev/)

## Overview

FORMULAR is a next-generation, framework-agnostic form management library designed to simplify complex form implementations with comprehensive validation. Built with enterprise-grade architecture patterns including IoC containers, reactive state management, and optimized performance, FORMULAR can be seamlessly integrated with React, Vue.js, Angular, or vanilla JavaScript.

This library provides a robust foundation for managing forms, fields, and validations, making it easier to build dynamic, accessible, and interactive user interfaces.

## 🚀 Quick Start

### Installation

```bash
# Using npm
npm install formular.dev.lib

# Using pnpm (recommended)
pnpm add formular.dev.lib

# Using yarn
yarn add formular.dev.lib
```

### Basic Usage

```tsx
import { useFormularContext, InputText } from 'formular.dev.react'
import { Validators } from 'formular.dev.lib'

const MyForm = () => {
    const { formInstance } = useFormularContext()

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            console.log('Form Data:', formInstance?.getValues())
        }}>
            <InputText fieldName="email" />
            <InputText fieldName="password" />
            <button type="submit">Submit</button>
        </form>
    )
}
```

## ✨ Core Features

### 🎯 **Framework-Agnostic Form Management**
- **Universal Integration**: Works seamlessly with React, Vue.js, Angular, SvelteJS, SolidJS, or vanilla JavaScript
- **Modular Architecture**: Use only what you need - core validation, input management, or full form suite
- **Zero Dependencies**: Core library has no external dependencies for maximum compatibility

### 📋 **Advanced Input & Field Management**
- **Intelligent Input Engine**: Modular input system with specialized variants for different field types
- **Value Parsing Strategies**: Type-safe value conversion between DOM, JavaScript objects, and formatted strings
- **Field State Management**: Comprehensive tracking of validation state, user interactions, and field lifecycle

### ✅ **Comprehensive Validation System**
- **20+ Built-in Validators**: Email, phone, names, passwords, dates, currencies, and more
- **Country-Specific Validation**: Native support for 12+ countries with specialized patterns
- **🇨🇭 Switzerland Focus**: Dedicated validators for Swiss NPA, AHV, and phone number formats
- **Multi-Country Support**: Validate across multiple countries simultaneously
- **Custom Validators**: Easy extension system for domain-specific validation rules

### 🔧 **Enterprise-Grade Architecture**
- **IoC Container**: Advanced dependency injection with lazy resolution and lifecycle management
- **Reactive State Management**: Signals-based reactive programming with automatic cleanup
- **Performance Optimized**: Batched notifications, lazy loading, and efficient re-renders
- **Memory Management**: Automatic cleanup and circular dependency detection

### 🔒 **Developer Experience**
- **Full TypeScript Support**: Comprehensive type definitions with intelligent auto-completion
- **Rich Debugging Tools**: Development utilities and error reporting
- **Extensible Design**: Plugin architecture for custom validators, input types, and countries

## 🏗️ Repository Features

### 📦 **Monorepo Structure**
- **Multiple Packages**: Core library, React components, design system, and framework adapters
- **PNPM Workspace**: Optimized package management and cross-package dependencies
- **Shared Assets**: Centralized logos, icons, and design resources

### 🎨 **Design System**
- **Design Tokens**: Typography, spacing, colors, shadows, and animations
- **Component Library**: Modern, accessible React components

### 🧪 **Development Infrastructure**
- **Comprehensive Testing**: Jest configuration with coverage reporting
- **Multi-Environment Support**: Development, integration, and production configurations
- **VS Code Integration**: Tasks, debugging, and PowerShell scripts

---

## How FORMULAR Works

FORMULAR is built using a sophisticated combination of design patterns, dependency injection, and modular architecture to provide a robust and extensible framework for form management. The library features a comprehensive IoC (Inversion of Control) container, reactive state management through signals, and a highly optimized notification system.



> **Note**: Full vanilla JavaScript browser support and framework adapters are actively being developed. Currently, FORMULAR requires a build environment but works with any modern bundler.

---

## 🤝 Contributing

We welcome contributions to FORMULAR! The project is actively maintained and open to community involvement.

### 🚀 How to Get Started

1. **🍴 Fork the Repository**: Start by forking the repository on GitHub
2. **📚 Explore the Codebase**: Familiarize yourself with the monorepo structure and architecture
3. **🐛 Report Issues**: Found a bug or have a feature request? Open an issue on GitHub
4. **💻 Submit Pull Requests**: Implement a feature or fix a bug and submit a pull request
5. **📖 Improve Documentation**: Help enhance documentation, tutorials, and examples
6. **🧪 Write Tests**: Follow our [Contributing Guidelines](./CONTRIBUTING.md) for test implementation

### 🎯 Priority Contribution Areas

The following areas are actively seeking community contributions:

- **🌐 Framework Integrations**: Complete the Vue.js, Angular, and SvelteJS adapters (foundation is ready)
- **🗺️ Additional Country Support**: Extend pattern system with new countries and regions
- **🎛️ Enhanced Field Types**: Add specialized components (sliders, toggles, date pickers, file uploads)
- **🧪 Test Coverage**: Expand test suite following our [Contributing Guidelines](./CONTRIBUTING.md)
- **📚 Examples & Tutorials**: Create comprehensive examples for different use cases
- **⚡ Performance Optimizations**: Further optimize validation and rendering performance
- **🔧 Developer Tools**: VS Code extensions, debugging tools, and development utilities
- **📱 Mobile Components**: Touch-optimized components and mobile-specific features
- **♿ Accessibility**: Enhance ARIA support and accessibility features
- **🎨 Themes & Styling**: Create theme system and pre-built design tokens

### 💡 Advanced Contribution Opportunities

- **🧠 AI Integration**: Smart form generation and validation suggestions
- **🔄 Real-time Collaboration**: Multi-user form editing capabilities
- **📊 Analytics Integration**: Form performance and user interaction analytics
- **🌐 Internationalization**: Extended localization support beyond current offerings

## 💬 Are you interested? Let's collaborate!

We're always looking for passionate developers, designers, and contributors to join the FORMULAR community. Whether you're interested in:

- **Contributing code** to core features or framework adapters
- **Designing components** and improving user experience  
- **Writing documentation** and creating tutorials
- **Testing and reporting issues** to improve stability
- **Sharing ideas** for new features and improvements

**Get in touch:** 
- 📧 Email: [piana.tadeo@formular.dev](mailto:piana.tadeo@formular.dev)
- 💬 GitHub Discussions: [Join the conversation](https://github.com/pianatadeo/formular.dev/discussions)
- 🐛 Issues: [Report bugs or request features](https://github.com/pianatadeo/formular.dev/issues)
- 🔀 Pull Requests: [Contribute directly to the codebase](https://github.com/pianatadeo/formular.dev/pulls)

## ✅ Current Status (Updated June 2025)

🚧 Working on monorepo intégration 
🚧 Unit testing 
🚧 Demo Pages


## 🗺️ Roadmap

- **Version 1.0** ✅ **COMPLETED**:
    - Dependency Free for the Core Features ✅
    - Core form and field mechanics ✅
    - Basic validation strategies ✅
    - React integration and basic components ✅
    - Country-specific validation system ✅
    - Switzerland-focused validation (NPA, AHV) ✅
    - Multi-country validation support ✅
    - Comprehensive validator library (20+ validators) ✅    - **IoC Service Manager Implementation** ✅
        - Advanced dependency injection with lazy resolution ✅
        - Circular dependency detection ✅
        - Service lifetime management (singleton, transient, scoped) ✅
        - Proxy-based lazy dependencies ✅
        - React hooks integration with IoC ✅
        - Service Bootstraper for lib consumer ✅

    - **High-Performance Notification System** ✅
        - Batched notification processing ✅
        - Priority-based notification handling ✅
        - Configurable batching strategies ✅
        - Observer pattern optimizations ✅

    - **Advanced Input Engine** ✅
        - Modular input system with variants ✅
        - Strategy pattern for value parsing ✅
        - Trigger-based validation system ✅
        - DOM register builders ✅

    - **Monorepo Architecture** ✅
        - PNPM workspace configuration ✅
        - Multi-package structure ✅
        - Shared assets management ✅
        - Cross-package dependencies ✅

**Version 1.3** 🚧 **IN DEVELOPMENT**

    - **Signals Implementation** ✅
        - Reactive programming with signals ✅
        - Observable subject patterns ✅
        - Memory management and cleanup ✅
        - React hooks integration ✅

    - **Rich Text Editor (RTE)** ✅
        - Advanced RTE component ✅
        - Formatting capabilities ✅
        - Integration with form system ✅

    - **Design System Foundation** ✅
        - Component tokens and styles ✅
        - Typography, spacing, colors ✅
        - Border radius, shadows, animations ✅
        - Modular CSS architecture ✅

    - **Comprehensive Testing Setup** 🚧
        - Jest configuration ✅
        - Test utilities and mocks 🚧
        - Coverage reporting setup ✅
        - Unit testing framework 🚧

    - **Updated Documentation** 🚧
        - Comprehensive architecture documentation ✅
        - Dependency injection patterns ✅
        - Entry points and lifecycle management ✅
        - React integration patterns ✅
        - Component documentation 🚧

    - **Framework Adapter Foundation** ✅
        - Base structure for Vue.js adapter ✅
        - Angular adapter foundation ✅
        - Vanilla JavaScript adapter foundation ✅
        **Version 2.0** 🚧 **PLANNED** 
    - **Complete Framework Adapters** �
        - Vue.js 3 full adapter with composition API
        - Angular 15+ adapter with reactive forms integration
        - SvelteJS adapter with stores integration
        - Vanilla JavaScript browser support (foundation ready)

    - **NPM Package Publishing** 🚧
        - formular.dev.lib core package
        - formular.dev.react components package
        - formular.dev.design-system package
        - Complete package documentation

    - **Enhanced Documentation Platform** 📚
        - Interactive documentation website
        - Live code playground and examples
        - Video tutorials and guides
        - API reference documentation
    
    - **Advanced Component Library** 📦
        - Portal system for modals and overlays
        - Advanced positioning utilities
        - Enhanced accessibility support
        - Mobile-optimized components
    
    - **Advanced Features** ⚡
        - Visual form builder interface
        - Advanced conditional validation
        - Form analytics and insights
        - Real-time collaboration features

- **Version 2.1** 📋 **PLANNED** (Q1 2026):

    - **AI Integration** 🤖
        - Smart form generation from natural language
        - Intelligent validation suggestions
        - Auto-completion and prediction
    - **Enterprise Features** 🏢
        - Advanced security and compliance features
        - Multi-tenant form management
        - Enterprise SSO integration
    - **Performance & Scale** 🚀
        - Server-side rendering (SSR) optimization
        - Edge computing support
        - Advanced caching strategies

- **Long-term Vision** 🧠 **EXPLORING**:

    - **Community Ecosystem** 🌍
        - Community-driven plugin marketplace
        - Third-party integrations and extensions
        - Certification program for developers
    - **Advanced Capabilities** 🔮
        - Visual form builder with drag-and-drop
        - Machine learning-powered form optimization
        - Advanced workflow and approval systems
        - Integration with popular CMS and e-commerce platforms

---

## 🛠️ Development

### 🌍 Environment Setup

This project supports multiple environments with dedicated configuration:

- **Development** environment (`.env.development`) - Full debugging and hot reload
- **Integration** environment (`.env.integration`) - Testing with production-like settings  
- **Production** environment (`.env.production`) - Optimized builds

### 🚀 Launch Scripts

The project includes comprehensive launch scripts for different environments and development workflows:

#### ⚡ Quick Start

```bash
# Install dependencies (using pnpm - recommended)
pnpm install

# Start development server
pnpm start:dev

# Build for production
pnpm build:production

# Serve built application
pnpm serve:production
```

#### 🎯 VS Code Integration

This project includes full VS Code integration:

- **Run and Debug** view (`Ctrl+Shift+D`) - Launch with different environments
- **Command Palette** (`Ctrl+Shift+P`) → "Tasks: Run Task" - Access build tasks
- **Chrome debugging** configurations for frontend debugging
- **Integrated terminal** with PowerShell scripts

#### 💻 PowerShell Scripts (Windows)

```powershell
# Start development server
.\scripts\start-dev.ps1

# Build with specific environment
.\scripts\build.ps1 -Environment production

# Serve with specific environment
.\scripts\serve.ps1 -Environment integration
```

#### 📦 Monorepo Development

```bash
# Work with specific packages
cd packages/lib && pnpm dev
cd packages/vendors/react/formular.components && pnpm dev

# Build all packages
pnpm build

# Run tests across all packages
pnpm test

# Lint and format
pnpm lint
pnpm format
```

For complete documentation of all available launch options and development workflows, see the individual package README files.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## 🔗 Links & Resources

- **🌐 Website:** [https://formular.dev/](https://formular.dev/) *(coming in v2.0)*
- **📚 Documentation:** [https://docs.formular.dev/](https://docs.formular.dev/) *(coming in v2.0)*
- **📦 NPM Package:** [formular.dev.lib](https://www.npmjs.com/package/formular.dev.lib) *(coming in v2.0)*
- **🐙 GitHub Repository:** [https://github.com/binaryjack/formular.dev](https://github.com/binaryjack/formular.dev)
- **💬 Community Discussions:** [GitHub Discussions](https://github.com/binaryjack/formular.dev/discussions) 
- **🐛 Issue Tracker:** [GitHub Issues](https://github.com/binaryjack/formular.dev/issues)

### 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/binaryjack/formular.dev?style=social)
![GitHub forks](https://img.shields.io/github/forks/binaryjack/formular.dev?style=social)
![GitHub issues](https://img.shields.io/github/issues/binaryjack/formular.dev)
![GitHub pull requests](https://img.shields.io/github/issues-pr/binaryjack/formular.dev)

---

<div align="center">

**Made with ❤️ by [Piana Tadeo](https://github.com/binaryjack) and the FORMULAR community**

*The full-featured documentation website and live examples are planned for version 2.0!*

</div>
