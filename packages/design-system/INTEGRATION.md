# Integration Guide: Using Design System with formular.components

This guide shows how to integrate the `formular.design.system` with your existing `formular.components` library.

## 🔧 Setup Process

### 1. Install the Design System

```bash
# From the formular.components directory
cd packages/vendors/react/formular.components
pnpm add ../../../design-system
```

### 2. Update TailwindCSS Configuration

Extend your existing `tailwind.config.js`:

```javascript
// packages/vendors/react/formular.components/tailwind.config.js
const designSystemConfig = require('formular.design.system/tailwind-config')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,html}',
    // Include design system classes
    '../../../design-system/src/**/*.{js,ts,tsx}'
  ],
  theme: {
    extend: {
      // Import design system theme
      ...designSystemConfig.theme.extend,

      // Keep your existing custom extensions
      screens: {
        '2xs': '0px',
        xs: '480px'
      },
      fontSize: {
        '2xs': '0.55rem'
      }
    }
  },
  plugins: [...designSystemConfig.plugins]
}
```

### 3. Update Your Main CSS File

Replace your current CSS imports:

```css
/* src/index.css - Before */
@import 'tailwindcss/base';
@import 'tailwindcss/utilities';
@import 'tailwindcss/screens';
@import 'tailwindcss/components';
@import './style/globals.css';
@import '@components/button/button.css';

/* src/index.css - After */
@import 'formular.design.system/styles'; /* Import design system first */
@import './style/globals.css'; /* Your custom globals */
@import '@components/button/button.css'; /* Your component styles */
```

## 🎨 Migrating Component Styles

### Button Component Migration

Update your existing button styles to use design system classes:

```css
/* src/components/button/button.css - Before */
.btn-wrapper {
  z-index: 0;
  @apply relative p-0 mx-1 flex flex-grow items-center justify-center w-full h-full overflow-hidden select-none transition-all duration-150 ease-in-out;
}

.btn-wrapper.xs {
  @apply text-08;
}

.btn-wrapper.sm {
  @apply text-10;
}

.btn-primary {
  @apply primary;
}

/* src/components/button/button.css - After */
.btn-wrapper {
  @apply btn-base; /* Use design system base */
  z-index: 0;
  margin: 0 0.25rem;
  flex-grow: 1;
}

.btn-wrapper.xs {
  @apply btn-size-xs; /* Use design system sizes */
}

.btn-wrapper.sm {
  @apply btn-size-sm;
}

.btn-wrapper.md {
  @apply btn-size-md;
}

.btn-primary {
  @apply btn-primary; /* Use design system variants */
}

.btn-secondary {
  @apply btn-secondary;
}
```

### Input Component Migration

Update your input styles:

```css
/* src/components/input-text/input-text.css - Before */
.input-text {
  @apply w-full border rounded transition-all duration-150;
}

.input-text:focus {
  @apply border-blue-500 ring-2 ring-blue-500 ring-opacity-20;
}

.input-text.error {
  @apply border-red-500 ring-2 ring-red-500 ring-opacity-20;
}

/* src/components/input-text/input-text.css - After */
.input-text {
  @apply input-base input-default; /* Use design system base */
}

.input-text:focus {
  @apply input-focused; /* Use design system states */
}

.input-text.error {
  @apply input-error;
}

.input-text:disabled {
  @apply input-disabled;
}
```

## 🛠 Component Code Updates

### Button Component TypeScript

```typescript
// src/components/button/button.tsx
import React from 'react'
import { generateButtonStyles, cn } from 'formular.design.system'
import { conventions, LoadingStatus } from 'formular.dev.lib'

interface ButtonProps {
    variant?: 'solid' | 'outline' | 'ghost' | 'link'
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    loading?: boolean
    disabled?: boolean
    children: React.ReactNode
    className?: string
    onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'solid',
    color = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    children,
    className,
    onClick,
    ...props
}) => {
    // Generate base styles using design system
    const baseStyles = generateButtonStyles(variant, color, size)

    // Combine with conditional classes
    const classes = cn(
        'btn-wrapper',  // Keep existing wrapper class
        baseStyles,     // Design system styles
        {
            'loading': loading,
            'opacity-50': disabled || loading,
            'cursor-not-allowed': disabled || loading
        },
        className
    )

    return (
        <button
            className={classes}
            disabled={disabled || loading}
            onClick={loading ? undefined : onClick}
            {...props}
        >
            {loading && (
                <span className="spinner mr-2">
                    {/* Your existing spinner */}
                </span>
            )}
            <span className="content">
                {children}
            </span>
        </button>
    )
}
```

### Input Component TypeScript

```typescript
// src/components/input-text/input-text.tsx
import React from 'react'
import { generateInputStyles, generateValidationStyles, cn } from 'formular.design.system'

interface InputTextProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    error?: boolean
    success?: boolean
    disabled?: boolean
    loading?: boolean
    value?: string
    placeholder?: string
    errorMessage?: string
    successMessage?: string
    helperText?: string
    className?: string
    onChange?: (value: string) => void
}

export const InputText: React.FC<InputTextProps> = ({
    size = 'md',
    error = false,
    success = false,
    disabled = false,
    loading = false,
    value,
    placeholder,
    errorMessage,
    successMessage,
    helperText,
    className,
    onChange,
    ...props
}) => {
    const [focused, setFocused] = React.useState(false)

    // Generate input styles using design system
    const inputStyles = generateInputStyles(size, {
        focused,
        error,
        disabled,
        loading
    })

    const inputClasses = cn(
        'input-text',  // Keep existing class
        inputStyles,   // Design system styles
        className
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }

    return (
        <div className="field-container">
            <input
                className={inputClasses}
                value={value}
                placeholder={placeholder}
                disabled={disabled || loading}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={handleChange}
                {...props}
            />

            {/* Validation messages using design system */}
            {errorMessage && (
                <div className={generateValidationStyles('error')}>
                    {errorMessage}
                </div>
            )}

            {!errorMessage && successMessage && (
                <div className={generateValidationStyles('success')}>
                    {successMessage}
                </div>
            )}

            {!errorMessage && !successMessage && helperText && (
                <div className="field-helper-text">
                    {helperText}
                </div>
            )}
        </div>
    )
}
```

## 🎯 Preserving Existing Patterns

The design system maintains your existing patterns:

### 1. Size Classes

- Your `text-04`, `text-08`, etc. classes are preserved
- New semantic size classes (`btn-size-md`, `input-size-lg`) are added

### 2. Validation Classes

- `validation-success`, `validation-error` classes maintained
- Enhanced with design system tokens

### 3. Component Structure

- `btn-wrapper`, `field-container` structure preserved
- Enhanced with design system utilities

### 4. CSS Custom Properties

- Your `--radius` variable is preserved and enhanced
- New design token variables added

## 📋 Migration Checklist

- [ ] Install design system dependency
- [ ] Update TailwindCSS configuration
- [ ] Update main CSS imports
- [ ] Migrate button component styles
- [ ] Migrate input component styles
- [ ] Update component TypeScript code
- [ ] Test existing components still work
- [ ] Test new design system features
- [ ] Update any custom component styles
- [ ] Run build and verify output

## 🧪 Testing Integration

```bash
# Test the integration
cd packages/vendors/react/formular.components
pnpm run build
pnpm run dev
```

Verify that:

1. Existing components render correctly
2. New design system classes are available
3. Design tokens are accessible in TypeScript
4. Build process completes successfully
5. No style conflicts occur

## 🚀 Next Steps

After integration:

1. Gradually adopt design system utilities in new components
2. Refactor existing components to use design tokens
3. Leverage style generators for consistent styling
4. Use responsive utilities for better mobile support
5. Adopt design system naming conventions for new features
