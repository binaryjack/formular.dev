# webcomponents.formular.dev

A modern web components library built with TypeScript, Lit, and Vite. This package provides form-focused web components that integrate seamlessly with `formular.dev.lib` for form management and `formular.design.system` for consistent styling with Tailwind CSS.

## Features

- 🚀 **Modern Web Components**: Built with Lit for performance and standards compliance
- 📝 **Form Integration**: Seamless integration with formular.dev.lib for form management
- 🎨 **Design System**: Consistent styling with formular.design.system and Tailwind CSS
- 💪 **TypeScript**: Full TypeScript support with strict type checking
- 🔧 **Vite**: Fast development and optimized builds
- ✅ **Testing**: Comprehensive test setup with Jest
- 📏 **Code Quality**: ESLint and Prettier configuration

## Installation

```bash
# Install via pnpm (from workspace root)
pnpm install

# Build the library
pnpm --filter webcomponents.formular.dev build

# Development mode with watch
pnpm --filter webcomponents.formular.dev dev
```

## Usage

### Basic Form Input

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="./dist/index.esm.js"></script>
</head>
<body>
  <formular-input 
    type="email" 
    label="Email Address" 
    placeholder="Enter your email"
    required>
  </formular-input>
</body>
</html>
```

### TypeScript Integration

```typescript
import { FormInputElement } from 'webcomponents.formular.dev';

// Type-safe component usage
const inputElement = document.createElement('formular-input') as FormInputElement;
inputElement.label = 'Username';
inputElement.placeholder = 'Enter username';
inputElement.required = true;

document.body.appendChild(inputElement);
```

### Event Handling

```typescript
// Listen for input changes
document.addEventListener('formular-input', (event) => {
  const { value, name } = event.detail;
  console.log(`Input ${name} changed to: ${value}`);
});
```

## Available Components

### FormInput (`<formular-input>`)

A versatile input component that supports various input types and integrates with formular.dev.lib for validation.

**Properties:**
- `value`: Input value
- `type`: Input type (text, email, password, etc.)
- `label`: Label text
- `placeholder`: Placeholder text
- `required`: Whether the input is required
- `disabled`: Whether the input is disabled
- `name`: Input name for form submission
- `error`: Error message to display
- `class-name`: Additional CSS classes

**Events:**
- `formular-input`: Fired when input value changes

## Development

### Project Structure

```
src/
├── components/          # Web components
│   ├── form-input/     # Form input component
│   └── index.ts        # Component exports
├── types/              # Type definitions
├── interfaces/         # Interface definitions
├── enums/              # Enum definitions
├── utilities/          # Utility functions
├── __tests__/          # Test files
├── index.ts            # Main entry point
└── types.ts            # Type exports
```

### Development Commands

```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Test coverage
pnpm test:coverage

# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Check formatting
pnpm format:check

# Build library
pnpm build

# Analyze bundle
pnpm build:analyze
```

### Creating New Components

1. Create a new directory in `src/components/`
2. Follow the naming convention: `kebab-case`
3. Create the component interface file: `i-component-name-props.ts`
4. Create the component file: `component-name.tsx`
5. Create an `index.ts` file to export the component
6. Update `src/components/index.ts` to export the new component

Example structure:
```
src/components/my-component/
├── i-my-component-props.ts
├── my-component.tsx
└── index.ts
```

### Code Style Guidelines

This project follows the guidelines defined in `CONTRIBUTING.md`:

- **File Naming**: kebab-case for all files
- **Interfaces**: Prefixed with 'I' (e.g., `IMyInterface`)
- **Types**: Suffixed with 'Type'
- **Enums**: Suffixed with 'Enum'
- **Classes**: Use prototype-based style where possible
- **Tests**: Placed in `src/__tests__/` with mirrored structure

## Dependencies

### Runtime Dependencies
- `formular.dev.lib`: Form management and validation
- `formular.design.system`: Design tokens and styling
- `lit`: Web component framework

### Development Dependencies
- TypeScript
- Vite
- Jest
- ESLint
- Prettier
- Custom Elements Manifest Analyzer

## Browser Support

This library supports all modern browsers that support Web Components:

- Chrome 54+
- Firefox 63+
- Safari 10.1+
- Edge 79+

For older browsers, consider using polyfills from `@webcomponents/webcomponentsjs`.

## Custom Elements Manifest

This library automatically generates a custom elements manifest (`custom-elements.json`) that provides metadata about the web components for tooling and documentation.

```bash
# Generate custom elements manifest
pnpm analyze-elements
```

## Contributing

Please refer to the root `CONTRIBUTING.md` file for detailed contribution guidelines.

## License

MIT License - see LICENSE file for details.
