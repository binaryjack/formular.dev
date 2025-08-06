# Generic Style System V2 - Experimental

This is the experimental V2 implementation of the unified generic style system. It provides a single API for generating CSS classes for any component type with complete separation between component styling and typography.

## 🎯 Key Features

- **Single Unified API**: One `genericStyle()` function for all components
- **Typography Separation**: Independent text styling from component structure
- **Intelligent Defaults**: Works great out-of-the-box, powerful when customized
- **TypeScript First**: Full autocomplete and type safety
- **Developer Warnings**: Alerts for unusual combinations

## 🚀 Quick Start

```typescript
import { genericStyle } from './generics-v2'

// Simple usage - all defaults
const classes = genericStyle({ componentType: 'button' })
// Result: "btn btn-primary btn-md text-md text-primary"

// Advanced usage - independent typography
const classes = genericStyle({
  componentType: 'button',
  visualVariant: 'outline',
  variant: 'primary',
  size: '2xl',
  typography: {
    size: '2xs',
    variant: 'secondary',
    case: 'uppercase',
    weight: 'bold'
  }
})
// Result: "btn btn-outline btn-primary btn-2xl text-2xs text-secondary uppercase font-bold"
```

## 📚 Component Types (V2 Experimental)

Starting with core components to validate the approach:

- **`button`**: Complex component with visual variants, colors, sizes, states, and typography
- **`typography`**: Pure text component for reusable text styling
- **`input`**: Mixed component with structure + text concerns

## 🎨 Typography System

The `typography` object allows complete independence between component structure and text appearance:

```typescript
typography: {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl',     // text-[size]
  variant?: 'primary' | 'secondary' | 'neutral' | ..., // text-[variant]
  case?: 'uppercase' | 'lowercase' | 'capitalize',     // text case
  weight?: 'normal' | 'bold' | 'semibold' | ...        // font-[weight]
}
```

## 🧪 Testing

Run the test examples to validate implementation:

```typescript
// Import and run
import './test-examples'
```

Check browser console for detailed test results and warnings.

## 🎛️ Configuration

Each component type has its own configuration defining what features it supports:

```typescript
{
  prefix: 'btn',                    // CSS class prefix
  hasVisualVariants: true,          // solid, outline, ghost, etc.
  hasColorVariants: true,           // primary, secondary, etc.
  hasSizeVariants: true,            // xs, sm, md, lg, etc.
  hasStateClasses: true,            // hover, focus, disabled, etc.
  hasTypographySupport: true        // text-* classes
}
```

## 🔧 CSS Requirements

Add the text color utilities to your CSS:

```css
/* Copy from text-color-utilities.css */
.text-primary {
  color: var(--color-primary-500);
}
.text-secondary {
  color: var(--color-secondary-500);
}
/* ... etc */
```

Your Tailwind config already provides `text-[size]` classes.

## ⚠️ Known Issues

1. **CSS Specificity**: Text classes need `!important` to override component colors
2. **TypeScript**: Some edge cases with state typing (being refined)
3. **Development Only**: This is experimental - not for production yet

## 🔄 Next Steps

1. Test with real components
2. Validate CSS specificity handling
3. Expand to more component types
4. Performance testing
5. Migration strategy from V1

## 🏗️ Architecture

```
generics-v2/
├── interfaces/           # TypeScript interfaces
├── types/               # Type definitions
├── configs/             # Component configurations
├── generic-style-generator-v2.ts  # Main implementation
├── test-examples.ts     # Test cases
├── text-color-utilities.css       # Required CSS
└── index.ts            # Public API
```

---

**Status**: 🧪 Experimental - Ready for testing and feedback
