# FORMULAR Design System

A comprehensive design system built with TailwindCSS that provides design tokens, utilities, and styles to support the `formular.components` library.

## 🎯 Purpose

This design system provides **styles, tokens, and utilities** - not components. It's specifically designed to support and enhance your existing `formular.components` library with:

- **Design Tokens**: Colors, spacing, typography, shadows, animations
- **Utility Functions**: Style generators, class name utilities, responsive helpers
- **CSS Classes**: Pre-built utility classes and component styles
- **TypeScript Support**: Full type definitions for all tokens and utilities

## 📦 Installation

```bash
# From workspace root
pnpm add formular.design.system

# Or if installing separately
pnpm add formular.design.system tailwindcss
```

## 🚀 Usage

### 1. Import the Design System Styles

In your `formular.components` main CSS file:

```css
/* Import the design system base styles */
@import 'formular.design.system/styles';

/* Your existing component styles */
@import './components/button/button.css';
@import './components/input-text/input-text.css';
/* ... */
```

### 2. Use Design Tokens in Components

```typescript
// In your formular.components
import { colors, spacing, generateButtonStyles, cn } from 'formular.design.system'

// Use tokens directly
const primaryColor = colors.primary[500]
const mediumSpacing = spacing[4]

// Use style generators
const buttonClasses = generateButtonStyles('solid', 'primary', 'md')

// Use utility functions
const classes = cn('btn-base', buttonClasses, {
  'opacity-50': disabled,
  'animate-pulse': loading
})
```

### 3. Configure TailwindCSS

Extend your `tailwind.config.js` in `formular.components`:

```javascript
const designSystemConfig = require('formular.design.system/tailwind-config')

module.exports = {
  ...designSystemConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // Include design system styles
    './node_modules/formular.design.system/dist/**/*.js'
  ],
  theme: {
    ...designSystemConfig.theme,
    extend: {
      ...designSystemConfig.theme.extend
      // Your custom extensions
    }
  }
}
```

### 4. Use Pre-built CSS Classes

The design system provides utility classes you can use directly in your components:

```tsx
// In your formular.components
export const Button = ({ variant, size, color, children, ...props }) => {
  const classes = cn(
    'btn-base', // Base button styles
    `btn-size-${size}`, // Size utilities (xs, sm, md, lg, xl)
    `btn-${variant}-${color}`, // Variant + color combinations
    props.className
  )

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
```

## 🎨 Design Tokens

### Colors

```typescript
import { colors } from 'formular.design.system'

// Access color values
colors.primary[500] // #3b82f6
colors.success[600] // #16a34a
colors.danger[500] // #ef4444
```

### Spacing

```typescript
import { spacing } from 'formular.design.system'

spacing[4] // 1rem (16px)
spacing[8] // 2rem (32px)
```

### Typography

```typescript
import { typography } from 'formular.design.system'

typography.fontSize.lg.value // 1.125rem
typography.fontFamily.sans // ['Inter', 'ui-sans-serif', ...]
```

## 🛠 Utility Functions

### Style Generators

```typescript
import {
  generateButtonStyles,
  generateInputStyles,
  generateFieldStyles,
  generateValidationStyles
} from 'formular.design.system'

// Generate component classes
const buttonClasses = generateButtonStyles('solid', 'primary', 'md')
const inputClasses = generateInputStyles('md', { focused: true })
const errorClasses = generateValidationStyles('error')
```

### Class Name Utilities

```typescript
import { cn, cx } from 'formular.design.system'

// Combine classes with conditionals
const classes = cn(
  'base-class',
  {
    'active-class': isActive,
    'disabled-class': isDisabled
  },
  customClassName
)
```

### CSS Custom Properties

```typescript
import { createCssVars, cssVar } from 'formular.design.system'

// Create CSS variables
const vars = createCssVars({
  'primary-color': colors.primary[500],
  'spacing-md': spacing[4]
})

// Use in styles
const style = {
  color: cssVar('primary-color'),
  padding: cssVar('spacing-md')
}
```

## 📋 Available CSS Classes

The design system provides pre-built CSS classes that match your `formular.components` patterns:

### Button Classes

- `.btn-base` - Base button styles
- `.btn-size-{xs|sm|md|lg|xl}` - Size variants
- `.btn-{color}` - Solid variants (primary, secondary, success, etc.)
- `.btn-outline-{color}` - Outline variants
- `.btn-ghost-{color}` - Ghost variants

### Input Classes

- `.input-base` - Base input styles
- `.input-size-{xs|sm|md|lg|xl}` - Size variants
- `.input-{default|focused|error|success|disabled}` - State variants

### Field Classes

- `.field-container` - Field wrapper
- `.field-label` - Label styles
- `.field-helper-text` - Helper text
- `.field-error-text` - Error message styles

### Validation Classes

- `.validation-success` - Success state styles
- `.validation-error` - Error state styles
- `.validation-warning` - Warning state styles

### Text Utilities (matching your existing classes)

- `.text-04` - Extra small text (0.55rem)
- `.text-08` - Small text (0.75rem)
- `.text-10` - Base text (1rem)
- `.text-115` - Large text (1.125rem)
- `.text-135` - Extra large text (1.25rem)
- `.text-165` - 2XL text (1.5rem)
- `.text-200` - 4XL text (2.25rem)

## 🎯 Integration with formular.components

This design system is specifically tailored to work with your existing `formular.components`. Here's how to integrate:

### 1. Update Component Styles

Replace hardcoded values with design tokens:

```scss
// Before
.btn-primary {
  background-color: #3b82f6;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

// After - using design system classes
.btn-primary {
  @apply btn-base btn-primary btn-size-md;
}
```

### 2. Use Style Generators in TypeScript

```typescript
// In your Button component
import { generateButtonStyles } from 'formular.design.system'

export const Button = ({ variant = 'solid', color = 'primary', size = 'md', ...props }) => {
  const classes = generateButtonStyles(variant, color, size)
  return <button className={classes} {...props} />
}
```

### 3. Maintain Existing Class Names

The design system preserves your existing class naming conventions:

- `.text-04`, `.text-08` etc. (your current text size classes)
- `.elipsis`, `.text-elipsis` (your current utility classes)
- `.validation-success`, `.validation-error` (your validation patterns)

## 🔧 Configuration

### Customizing the Design System

You can extend the design system in your `formular.components` project:

```typescript
// custom-design-system.ts
import { tokens } from 'formular.design.system'

export const customTokens = {
  ...tokens,
  colors: {
    ...tokens.colors,
    brand: {
      50: '#f0f9ff',
      500: '#0ea5e9',
      900: '#0c4a6e'
    }
  }
}
```

## 📁 Project Structure

```
formular.design.system/
├── src/
│   ├── tokens/           # Design tokens (colors, spacing, etc.)
│   ├── utilities/        # Utility functions and style generators
│   ├── types/           # TypeScript type definitions
│   └── styles/          # CSS files with utility classes
├── dist/                # Built package
└── tailwind.config.js   # TailwindCSS configuration
```

## 🤝 Contributing

This design system follows the same contributing guidelines as the main FORMULAR project. See the root `CONTRIBUTING.md` for details.

## 📄 License

This design system is part of the FORMULAR project and follows the same license terms.
