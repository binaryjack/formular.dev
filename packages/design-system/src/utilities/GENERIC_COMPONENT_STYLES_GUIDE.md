# Generic Component Style Generator Guide

## Overview

The Generic Component Style Generator is a powerful utility that extends your existing `generateButtonStyles` function to work with **any component type** while maintaining consistency with your design system. It leverages your `IComponentVariants` interface and provides a unified approach to style generation across all components.

## Key Benefits

🎯 **Unified API**: One function to generate styles for buttons, inputs, cards, and any other component  
⚡ **Performance**: Pre-compiled component configurations with optional generator caching  
🔧 **Extensible**: Easy to add new component types and customization patterns  
📝 **Type-Safe**: Full TypeScript support with intelligent autocomplete  
🎨 **Design System Compliant**: Uses your existing CSS classes and design tokens

## Basic Usage

### Import the Generator

```typescript
import { generateComponentStyles } from 'formular.design.system'
```

### Generate Styles for Any Component

```typescript
// Button styles
const buttonClasses = generateComponentStyles('button', {
  visualVariant: 'solid',
  variant: 'primary',
  size: 'md'
})
// Returns: "btn btn-md btn-primary"

// Input styles
const inputClasses = generateComponentStyles('input', {
  size: 'lg',
  state: {
    error: true,
    focused: false,
    disabled: false,
    hovered: false,
    pressed: false,
    loading: false
  }
})
// Returns: "input input-lg input-error"

// Card styles
const cardClasses = generateComponentStyles('card', {
  visualVariant: 'elevated'
})
// Returns: "card card-elevated"
```

## Supported Component Types

The generator supports 20+ component types out of the box:

| Component Type                | Visual Variants | Color Variants | Size Variants | State Classes |
| ----------------------------- | --------------- | -------------- | ------------- | ------------- |
| `button`, `btn`               | ✅              | ✅             | ✅            | ✅            |
| `input`, `textarea`, `select` | ❌              | ❌             | ✅            | ✅            |
| `card`                        | ✅              | ❌             | ❌            | ✅            |
| `checkbox`, `radio`, `switch` | ❌              | ✅             | ✅            | ✅            |
| `badge`, `alert`              | ✅              | ✅             | ✅            | ❌            |
| `modal`, `drawer`, `tooltip`  | Varies          | Varies         | ✅            | ✅            |
| ... and more                  |                 |                |               |               |

## Integration with Your React Components

### Migrating from `generateButtonStyles`

**Before:**

```typescript
import { generateButtonStyles } from 'formular.design.system'

const btnBaseClasses = cx(
  generateButtonStyles('solid', variant, size),
  {
    'state-disabled': disabled,
    'state-loading': loading
  },
  !rounded && 'rounded-none',
  textCase,
  className
)
```

**After:**

```typescript
import { generateComponentStyles } from 'formular.design.system'

const btnBaseClasses = generateComponentStyles('button', {
  visualVariant: 'solid',
  variant,
  size,
  rounded,
  textCase,
  className,
  state: {
    disabled: disabled || false,
    loading: loading || false,
    error: false,
    focused: false,
    hovered: false,
    pressed: false
  }
})
```

### Creating New Components with Generic Styles

```typescript
// Input Component Example
import { generateComponentStyles } from 'formular.design.system'
import { IComponentVariants } from '../component-variants'

interface IInputProps {
    id: string
    variants?: Partial<IComponentVariants>
    error?: boolean
    disabled?: boolean
    onFocus?: () => void
    onBlur?: () => void
}

export const Input = ({
    id,
    variants = {},
    error,
    disabled,
    onFocus,
    onBlur,
    ...props
}: IInputProps) => {
    const [focused, setFocused] = useState(false)
    const {
        size = 'md',
        className = ''
    } = variants

    const inputClasses = generateComponentStyles('input', {
        size,
        className,
        state: {
            error: error || false,
            focused,
            disabled: disabled || false,
            hovered: false,
            pressed: false,
            loading: false
        }
    })

    return (
        <input
            id={id}
            className={inputClasses}
            disabled={disabled}
            onFocus={() => {
                setFocused(true)
                onFocus?.()
            }}
            onBlur={() => {
                setFocused(false)
                onBlur?.()
            }}
            {...props}
        />
    )
}
```

## Performance Optimization

### Pre-create Generators for Frequently Used Components

```typescript
import { createComponentStyleGenerator } from 'formular.design.system'

// Create once and reuse throughout your application
const generateButtonStyles = createComponentStyleGenerator('button')
const generateInputStyles = createComponentStyleGenerator('input')
const generateCardStyles = createComponentStyleGenerator('card')

// Use them like this:
const buttonClasses = generateButtonStyles({
  variant: 'primary',
  size: 'md'
})
const inputClasses = generateInputStyles({
  size: 'lg',
  state: { error: true }
})
```

### Pre-exported Generators

The library includes pre-created generators for common components:

```typescript
import {
  generateButtonComponentStyles,
  generateInputComponentStyles,
  generateCardComponentStyles,
  generateCheckboxComponentStyles,
  generateRadioComponentStyles
} from 'formular.design.system'

const classes = generateButtonComponentStyles({
  visualVariant: 'outline',
  variant: 'secondary',
  size: 'lg'
})
```

## Advanced Features

### State Management

Handle complex component states:

```typescript
const inputClasses = generateComponentStyles('input', {
  size: 'md',
  state: {
    error: hasValidationError,
    focused: isFocused,
    disabled: isDisabled,
    loading: isSubmitting,
    hovered: false,
    pressed: false
  }
})
// Returns: "input input-md input-error input-focused input-loading" (if all states are true)
```

### Utility Classes

Combine with utility classes:

```typescript
const buttonClasses = generateComponentStyles('button', {
  visualVariant: 'outline',
  variant: 'primary',
  size: 'md',
  textCase: 'uppercase',
  weight: 'bold',
  rounded: false,
  className: 'transition-all hover:scale-105 focus:ring-4'
})
// Returns: "btn btn-md btn-outline-primary uppercase font-bold rounded-none transition-all hover:scale-105 focus:ring-4"
```

### Feature Detection

Check what features a component supports:

```typescript
import { componentSupportsFeature } from 'formular.design.system'

const hasVisualVariants = componentSupportsFeature('button', 'visualVariants') // true
const hasColorVariants = componentSupportsFeature('input', 'colorVariants') // false
const hasSizeVariants = componentSupportsFeature('card', 'sizeVariants') // false
```

## Examples by Component Type

### Buttons

```typescript
// Primary solid button
generateComponentStyles('button', {
  visualVariant: 'solid',
  variant: 'primary',
  size: 'md'
})
// → "btn btn-md btn-primary"

// Secondary outline button
generateComponentStyles('button', {
  visualVariant: 'outline',
  variant: 'secondary',
  size: 'lg'
})
// → "btn btn-lg btn-outline-secondary"

// Ghost danger button
generateComponentStyles('button', {
  visualVariant: 'ghost',
  variant: 'danger',
  size: 'sm'
})
// → "btn btn-sm btn-ghost-danger"
```

### Form Controls

```typescript
// Input with error state
generateComponentStyles('input', {
  size: 'md',
  state: { error: true }
})
// → "input input-md input-error"

// Large success checkbox
generateComponentStyles('checkbox', {
  variant: 'success',
  size: 'lg'
})
// → "checkbox checkbox-lg checkbox-success"

// Primary switch
generateComponentStyles('switch', {
  variant: 'primary',
  size: 'md'
})
// → "switch switch-md switch-primary"
```

### Layout Components

```typescript
// Elevated card
generateComponentStyles('card', {
  visualVariant: 'elevated'
})
// → "card card-elevated"

// Outlined card with custom class
generateComponentStyles('card', {
  visualVariant: 'outlined',
  className: 'shadow-lg hover:shadow-xl transition-shadow'
})
// → "card card-outlined shadow-lg hover:shadow-xl transition-shadow"
```

### Feedback Components

```typescript
// Warning badge
generateComponentStyles('badge', {
  visualVariant: 'solid',
  variant: 'warning',
  size: 'sm'
})
// → "badge badge-sm badge-warning"

// Info outline alert
generateComponentStyles('alert', {
  visualVariant: 'outline',
  variant: 'info'
})
// → "alert alert-outline-info"
```

## Extending with New Component Types

To add support for a new component type, add it to the `COMPONENT_CONFIGS` object:

```typescript
// Add to generic-component-styles.ts
'my-component': {
    prefix: 'my-comp',
    hasVisualVariants: true,
    hasColorVariants: true,
    hasSizeVariants: true,
    hasStateClasses: true,
    customPatterns: {
        // Optional custom patterns
        visualVariant: (visual, color) => `my-comp-${visual}-${color}`,
        size: (size) => `my-comp-size-${size}`
    }
}
```

## Migration Strategy

1. **Phase 1**: Install the generic component styles alongside existing generators
2. **Phase 2**: Update one component at a time to use the generic generator
3. **Phase 3**: Remove old specific generators once all components are migrated
4. **Phase 4**: Add new component types as needed

## Best Practices

✅ **Do:**

- Use pre-created generators for performance
- Leverage the `IComponentVariants` interface for consistency
- Check feature support before using component features
- Use meaningful component type names

❌ **Don't:**

- Create generators inside render functions (performance impact)
- Assume all components support all features
- Mix old and new style generators in the same component
- Override the base CSS classes directly

## Troubleshooting

### Component doesn't support feature X

```typescript
// Check if the component supports the feature first
if (componentSupportsFeature('input', 'visualVariants')) {
  // Use visual variants
} else {
  // Handle without visual variants
}
```

### Custom classes not applying

```typescript
// Make sure className is passed correctly
const classes = generateComponentStyles('button', {
  // ... other options
  className: 'my-custom-class another-class'
})
```

### Performance issues

```typescript
// Pre-create generators outside components
const generateButton = createComponentStyleGenerator('button')

// Use in component
const MyComponent = () => {
  const buttonClasses = generateButton({ variant: 'primary' })
  // ...
}
```

This generic component style generator provides a powerful, unified approach to styling all your components while maintaining the convenience and consistency you already have with `generateButtonStyles`.
