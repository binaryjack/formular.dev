# FORMULAR

<div align="center">
  <img src="./packages/shared-assets/assets/apple-touch-icon.png" alt="FORMULAR Logo" width="200" />
</div>

<div align="center">

![Development Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)
![Version](https://img.shields.io/badge/Version-1.3--SNAPSHOT-blue?style=flat-square)
![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-✅%20Adapters-61DAFB?style=flat-square&logo=react)

</div>

**Author:** Piana Tadeo  
**License:** MIT  
**Website:** [https://formular.dev/](https://formular.dev/)  
**Repository:** [GitHub](https://github.com/binaryjack/formular.dev)  
**Documentation:** [Full Documentation](https://docs.formular.dev/)

## Overview

FORMULAR is a TypeScript-based form management library currently in active development. The project features a working React implementation with comprehensive form management capabilities, including validation, field management, and state tracking.

**Current Status**: The library has a complete React implementation with 15+ working components, an IoC-based architecture, and a comprehensive validation system. The core library is framework-agnostic by design, but currently only the React adapter is fully implemented.

The project uses modern TypeScript development patterns including dependency injection, reactive state management, and a modular component architecture. While designed to be framework-agnostic, the current focus is on perfecting the React implementation before expanding to other frameworks.

## 🚀 Quick Start

> **⚠️ Important Note**: The NPM packages are not yet available. FORMULAR is currently in active development and the packages will be published with version 2.0. For now, you can explore the codebase and contribute to the project development.

### Installation (Coming Soon)

```bash
# Using npm (available in v2.0)
npm install formular.dev.lib

# Using pnpm (recommended - available in v2.0)
pnpm add formular.dev.lib

# Using yarn (available in v2.0)
yarn add formular.dev.lib
```

### Development Setup

To explore and contribute to FORMULAR:

```bash
# Clone the repository
git clone https://github.com/binaryjack/formular.dev
cd formular.dev

# Install dependencies using PNPM (as per contributing guidelines)
pnpm install

# Start development environment
pnpm run dev
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

## ✨ Current Features (What's Actually Built)

### 🎯 **Core Form Management (React Implementation)**
- **React Integration**: Full working React components with form context and state management
- **FormularManager**: Central form management service for creating and managing form instances  
- **Field Management**: Complete field binding, validation, and state tracking through React hooks
- **TypeScript Support**: Comprehensive type definitions throughout the codebase

### 📋 **Working React Components**
- **Input Components**: InputText, Password (with visibility toggle), CheckInput, RadioInput, Select
- **Advanced Inputs**: DatePicker, RangeSlider, RichTextEditor (RTE), ToggleButton, SwitchButton
- **Form Container**: FormularForm component with submission handling and context provider
- **Field Infrastructure**: FieldSet wrapper, validation display, focus management
- **Specialized Components**: ReadOnlyField, DelayInput, MaskedInput

### ✅ **Validation System (Implemented)**
- **18+ Working Validators**: Email, phone, names, passwords, dates, currency, age, username, time, numeric, URL, credit card, SSN
- **Country-Specific Validators**: Phone, postal code, and SSN validation for multiple countries
- **🇨🇭 Switzerland Validators**: AHV (social security), NPA (postal codes), Swiss phone numbers
- **Multi-Country Support**: Validate across multiple countries with single validator calls
- **Validation Engine**: Real-time validation with configurable trigger events (onChange, onBlur, etc.)

### 🔧 **Architecture (Currently Working)**
- **IoC Container**: Service manager with dependency injection, lazy resolution, and lifecycle management
- **Notification System**: Observer pattern with batched updates and priority handling  
- **React Hooks Integration**: useField, useForm, useService hooks for form and field management
- **Form State Management**: Complete form lifecycle with isDirty, isValid, isBusy tracking
- **Memory Management**: Automatic cleanup and circular dependency detection

### 🔒 **Developer Experience (Current State)**
- **Full TypeScript Support**: Comprehensive type definitions with intelligent auto-completion
- **Development Tools**: Form debugging components and development utilities
- **Component Documentation**: Extensive JSDoc comments and usage examples in component files
- **Test Infrastructure**: Jest setup with initial test files (expanding coverage)

## 🚧 What's Not Yet Available

### ⏳ **Framework Adapters (Foundation Only)**
- **Vue.js, Angular, Svelte, SolidJS**: Basic folder structure exists, but adapters not implemented
- **Vanilla JavaScript**: Core logic is framework-agnostic but browser integration incomplete

### 📦 **Package Distribution**
- **NPM Packages**: Not yet published - all packages are in development
- **Build System**: Vite configuration exists but packages need preparation for publishing

### 🎨 **Design System Integration**
- **Design Tokens**: Tokens defined but not fully integrated into components
- **Theming**: Foundation exists but not complete component coverage

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

## How FORMULAR Currently Works

FORMULAR is built using TypeScript and modern React patterns. The library features a service-based architecture with dependency injection, reactive state management through React hooks, and a comprehensive validation system.

**Architecture Overview:**
- **FormularManager**: Central service for creating and managing form instances
- **React Components**: 15+ working input components with full form integration
- **Service Container**: IoC container managing dependencies and services
- **Validation Engine**: Configurable validation with 18+ built-in validators
- **Notification System**: Observer pattern for reactive state updates

**Current Implementation:**
- React components with full TypeScript support
- Working form submission and validation
- Field state management and tracking
- Comprehensive component documentation

> **Note**: The core library is designed to be framework-agnostic, but currently only the React adapter is fully implemented. Other framework adapters have basic folder structure but require development.

---

## 🤝 Contributing

We welcome contributions to FORMULAR! The project is actively maintained and open to community involvement.

> **📧 Getting Started**: Before contributing, please send an email to [admin@formular.dev](mailto:admin@formular.dev) to introduce yourself and discuss your interest in contributing. This helps us coordinate efforts and provide you with the best guidance for getting started.

### 🚀 How to Get Started

1. **📧 Send an Introduction Email**: Contact [admin@formular.dev](mailto:admin@formular.dev) to introduce yourself and your areas of interest
2. **🍴 Fork the Repository**: Start by forking the repository on GitHub
3. **📚 Explore the Codebase**: Familiarize yourself with the monorepo structure and architecture
4. **🐛 Report Issues**: Found a bug or have a feature request? Open an issue on GitHub
5. **💻 Submit Pull Requests**: Implement a feature or fix a bug and submit a pull request
6. **📖 Improve Documentation**: Help enhance documentation, tutorials, and examples
7. **🧪 Write Tests**: Follow our [Contributing Guidelines](./CONTRIBUTING.md) for test implementation

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
- 📧 Email: [admin@formular.dev](mailto:admin@formular.dev)
- 💬 GitHub Discussions: [Join the conversation](https://github.com/pianatadeo/formular.dev/discussions)
- 🐛 Issues: [Report bugs or request features](https://github.com/pianatadeo/formular.dev/issues)
- 🔀 Pull Requests: [Contribute directly to the codebase](https://github.com/pianatadeo/formular.dev/pulls)

## 🚧 Work In Progress Areas (Updated June 2025)

We're actively working on several key areas where contributions are especially welcome. These represent immediate development priorities:

### � **Core Library Development**
- **Configuration Manager** �🚧 - Centralized configuration system for form and validation settings
- **Core Library Documentation** 📚 - Comprehensive API documentation and architectural guides
- **Type Safety Enhancements** 🛡️ - Strengthening TypeScript definitions and generic constraints
- **Performance Profiling Tools** ⚡ - Built-in performance monitoring and optimization utilities

### 🧪 **Testing & Quality Assurance**
- **Unit Testing Expansion** 🧪 - Following our [Contributing Guidelines](./CONTRIBUTING.md) for test implementation
- **Integration Testing Suite** 🔗 - Cross-package integration and end-to-end testing
- **Test Coverage Reporting** � - Automated coverage tracking and reporting

### 🎨 **User Experience & Documentation**
- **Demo Pages & Examples** 🌐 - Interactive demonstrations and real-world use cases
- **Component Playground** 🎛️ - Interactive component explorer and testing environment
- **Video Tutorials** 📹 - Step-by-step guides for common patterns and advanced features

### 🏗️ **Infrastructure & Tooling**
- **Monorepo Integration** 📦 - Finalizing cross-package dependencies and build optimization
- **Development Environment Setup** �️ - Streamlined onboarding for new contributors
- **Automated Release Pipeline** 🚀 - CI/CD workflows for package publishing

### 💡 **Experimental Features**
- **Form Builder UI** 🎨 - Visual drag-and-drop form construction interface
- **AI-Assisted Validation** 🤖 - Smart validation suggestions and form optimization
- **Real-time Collaboration** 👥 - Multi-user form editing capabilities

> **Want to contribute to any of these areas?** Please send an email to [admin@formular.dev](mailto:admin@formular.dev) mentioning your area of interest!


## 🗺️ Roadmap

- **Version 1.0** ✅ **COMPLETED**:
    - Dependency Free for the Core Features ✅
    - Core form and field mechanics ✅
    - Basic validation strategies ✅
    - React integration and basic components ✅
    - Country-specific validation system ✅
    - Switzerland-focused validation (NPA, AHV) ✅
    - Multi-country validation support ✅
    - Comprehensive validator library (20+ validators) ✅
    
    - **IoC Service Manager Implementation** ✅
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
        - PNPM workspace configuration ✅        - Multi-package structure ✅
        - Shared assets management ✅
        - Cross-package dependencies ✅

- **Version 1.3** 🚧 **IN DEVELOPMENT**:

    - **Observable Subject Pattern** ✅
        - Reactive programming foundation ✅
        - Observable subject implementation ✅
        - Strong and weak observer subscriptions ✅
        - Memory management and cleanup ✅
        - React hooks integration with observables ✅

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
        - Component documentation 🚧    - **Framework Adapter Foundation** ✅
        - Base structure for Vue.js adapter ✅
        - Angular adapter foundation ✅
        - Vanilla JavaScript adapter foundation ✅

- **Version 2.0** 🚧 **PLANNED**:
    
    - **Complete Framework Adapters** 📦
        - Vue.js 3 full adapter with composition API
        - Angular 15+ adapter with reactive forms integration
        - SvelteJS adapter with stores integration
        - Vanilla JavaScript browser support (foundation ready)

    - **NPM Package Publishing** 📦 **PRIORITY**
        - formular.dev.lib core package (first public release)
        - formular.dev.react components package
        - formular.dev.design-system package
        - Complete package documentation and installation guides

    - **Signals Implementation** 🔄 **NEW**
        - True signals-based reactive programming
        - Computed signals with automatic dependency tracking
        - Effect system for side effect management
        - Signal-based form state management
        - Performance optimized signal updates

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
