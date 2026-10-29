# Formular Atomos Demo Site

A comprehensive Next.js demonstration site showcasing the Formular Atomos form management library.

## 🚀 Running the Demo

```bash
cd demo
pnpm install
pnpm dev
```

The demo will be available at **http://localhost:3011**

## 📁 Project Structure

```
demo/
├── app/
│   ├── examples/          # Interactive form examples
│   │   ├── login/         # Login form with email/password validation
│   │   ├── registration/  # Complex multi-field registration
│   │   └── checkout/      # E-commerce checkout form
│   ├── docs/              # Documentation pages
│   │   ├── field-configuration/  # Field setup guide
│   │   ├── validation/           # Validation rules guide
│   │   └── api-integration/      # API integration guide
│   ├── layout.tsx         # Root layout with navigation
│   └── page.tsx           # Homepage
├── components/
│   ├── CodeBlock.tsx      # Syntax-highlighted code display
│   ├── JsonDisplay.tsx    # Pretty JSON output viewer
│   ├── FormDemo.tsx       # Form demonstration layout
│   └── Navigation.tsx     # Site navigation component
└── .vscode/
    └── launch.json        # VS Code debug configurations

## ✨ Features

### Interactive Examples
- **Login Form**: Simple authentication with email/password validation
- **Registration Form**: Complex validation with password confirmation, pattern matching, and custom validators
- **Checkout Form**: Multi-section form with address, payment, select fields, and radio groups

### Documentation
- **Field Configuration**: Complete guide to FAField interface and field types
- **Validation Guide**: Built-in validators, custom validation, and patterns
- **API Integration**: Dynamic forms, API-driven configuration, and submission handling

### Demo Components
- **CodeBlock**: Shiki-powered syntax highlighting for code examples
- **JsonDisplay**: Real-time JSON output display for form submissions
- **FormDemo**: Tabbed layout showing Form/Code/Configuration side-by-side

## 🎯 Key Demonstrations

### Real-Time Validation
See validation in action with:
- Field-level error messages
- Help text guidance
- Cross-field validation (password confirmation)
- Pattern matching (postal codes, phone numbers)
- Custom validators with business logic

### Field Types
Examples of all supported field types:
- Text, Email, Password, Number
- Date, Time
- Select, Radio, Toggle
- Textarea, Postal Code

### Code Examples
Every form includes:
- Live interactive form
- Complete implementation code
- Field configuration examples
- JSON submission results

## 🛠️ Development

### Debug in VS Code
Use F5 or the Debug panel to launch:
- **Next.js: debug server-side** - Debug Node.js server code
- **Next.js: debug client-side** - Debug React in Chrome  
- **Next.js: debug full stack** - Debug both simultaneously

### Build for Production
```bash
pnpm build
pnpm start
```

## 📦 Dependencies

- **Next.js 14**: React framework with App Router
- **Tailwind CSS**: Utility-first styling
- **Shiki**: Syntax highlighting
- **react-json-view-lite**: JSON visualization
- **@formular/atomos**: The form library being demonstrated

## 🎨 SEO & Metadata

All pages include proper metadata for:
- Page titles and descriptions
- Open Graph tags
- Structured navigation
- Search engine optimization

## 🔗 Navigation Structure

```
Home
├── Examples
│   ├── Login Form
│   ├── Registration Form
│   └── Checkout Form
├── Documentation
│   ├── Field Configuration
│   ├── Validation Guide
│   └── API Integration
└── GitHub Repository
```

## 💡 Use Cases

This demo site showcases real-world scenarios:
- User authentication forms
- Multi-step registration
- E-commerce checkout
- Dynamic field loading from APIs
- Complex validation rules
- Cross-field dependencies

## 📝 Notes

- Port configured to **3011** (configurable in package.json)
- All components use TypeScript strict mode
- Zero 'any' types throughout codebase
- Follows Next.js 14 App Router conventions
- Responsive design with Tailwind CSS
