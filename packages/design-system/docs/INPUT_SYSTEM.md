# FORMULAR Input System Documentation

## Overview

The FORMULAR input system provides granular control over form element styling, replacing the `@tailwindcss/forms` plugin with a custom solution that integrates seamlessly with your design system.

## Architecture

### 1. Form Reset Layer (`form-reset.css`)

- **Purpose**: Provides consistent baseline styling for all form elements
- **Layer**: `@layer base` - Applied before any component styles
- **Features**:
  - Removes browser defaults and inconsistencies
  - Establishes consistent typography and spacing
  - Includes custom checkbox/radio styling with SVG icons
  - Supports all input types (text, email, password, etc.)

### 2. Input Component Layer (`input.css`)

- **Purpose**: Provides utility classes for granular control
- **Layer**: `@layer components` - Applied after base styles
- **Features**:
  - Size variants (xs, sm, md, lg, xl)
  - State variants (error, success, warning)
  - Style variants (outline, filled, borderless)
  - Utility modifiers

## CSS Layer Order

```css
@tailwind base; /* 1. Tailwind base reset */
@import './tokens.css'; /* 2. Design tokens */
@import './primitives.css'; /* 3. Primitive building blocks */
@tailwind components; /* 4. Tailwind components */
@import './components.css'; /* 5. Custom components (includes form-reset) */
@import './utilities.css'; /* 6. Utility classes */
@tailwind utilities; /* 7. Tailwind utilities */
```

## Usage Examples

### Basic Input

```html
<!-- Default input with design system styling -->
<input type="text" class="input" placeholder="Enter text..." />

<!-- Native input with only form-reset baseline styling -->
<input type="text" placeholder="Minimal styling" />
```

### Size Variants

```html
<input type="text" class="input input-xs" placeholder="Extra small" />
<input type="text" class="input input-sm" placeholder="Small" />
<input type="text" class="input input-md" placeholder="Medium" />
<input type="text" class="input input-lg" placeholder="Large" />
<input type="text" class="input input-xl" placeholder="Extra large" />
```

### State Variants

```html
<input type="text" class="input input-error" placeholder="Error state" />
<input type="text" class="input input-success" placeholder="Success state" />
<input type="text" class="input input-warning" placeholder="Warning state" />
```

### Style Variants

```html
<input type="text" class="input input-outline" placeholder="Outline (default)" />
<input type="text" class="input input-filled" placeholder="Filled background" />
<input type="text" class="input input-borderless" placeholder="Borderless/underline" />
```

### Textarea Variants

```html
<textarea class="input input-textarea" placeholder="Default textarea"></textarea>
<textarea class="input input-textarea input-textarea-sm" placeholder="Small textarea"></textarea>
<textarea class="input input-textarea input-textarea-lg" placeholder="Large textarea"></textarea>
<textarea class="input input-textarea input-no-resize" placeholder="No resize"></textarea>
```

### Select Elements

```html
<select class="input input-select">
  <option value="">Choose an option...</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
```

### Utility Combinations

```html
<!-- Combine multiple modifiers -->
<input type="text" class="input input-lg input-error input-filled" />
<input type="email" class="input input-sm input-success" />
<textarea class="input input-textarea input-lg input-warning input-no-resize"></textarea>
```

## Available Classes

### Base Classes

- `.input` - Base input styling (required for all variants)

### Size Modifiers

- `.input-xs` - Extra small (24px min-height)
- `.input-sm` - Small (32px min-height)
- `.input-md` - Medium (40px min-height)
- `.input-lg` - Large (48px min-height)
- `.input-xl` - Extra large (56px min-height)

### State Modifiers

- `.input-error` - Error state (red border, light red background)
- `.input-success` - Success state (green border, light green background)
- `.input-warning` - Warning state (yellow border, light yellow background)

### Style Modifiers

- `.input-outline` - Outlined style (default)
- `.input-filled` - Filled background style
- `.input-borderless` - Borderless/underline style

### Element-Specific Classes

- `.input-textarea` - Textarea-specific styling
- `.input-textarea-sm` - Small textarea height
- `.input-textarea-lg` - Large textarea height
- `.input-select` - Select-specific styling with custom arrow

### Utility Modifiers

- `.input-full` - Full width (default)
- `.input-auto` - Auto width
- `.input-no-resize` - Disable textarea resize
- `.input-resize-horizontal` - Horizontal resize only
- `.input-resize-both` - Both directions resize

## Design Tokens Used

The input system utilizes design tokens for consistent styling:

### Spacing

- `--spacing-xs` through `--spacing-3xl` for padding and margins
- Size-specific spacing for each variant

### Colors

- `--color-surface-*` for backgrounds
- `--color-border-*` for borders
- `--color-text-*` for text and placeholders
- `--color-primary-*`, `--color-success-*`, `--color-warning-*`, `--color-danger-*` for states

### Typography

- `--font-family-sans` for font family
- `--font-size-*` for size-specific typography
- `--font-weight-*` for font weights
- `--line-height-*` for line heights

### Animation

- `--duration-fast` for transition durations
- `--ease-in-out` for transition timing

### Border Radius

- `--radius` for consistent border radius

## Browser Support

The form reset system provides consistent styling across all modern browsers:

- **Webkit**: Uses `-webkit-appearance: none` to remove native styling
- **Firefox**: Uses `-moz-appearance: none` and opacity fixes for placeholders
- **All Browsers**: Uses `appearance: none` for maximum compatibility

## Customization

### Overriding Default Styles

You can override any aspect of the input system by:

1. **Modifying Design Tokens**: Update values in `tokens.css`
2. **Creating Custom Variants**: Add new classes in `input.css`
3. **Utility Classes**: Use Tailwind utilities for one-off customizations

### Example Custom Variant

```css
/* Add to input.css */
.input-custom {
  border: 2px dashed var(--color-primary-300);
  background: linear-gradient(45deg, var(--color-primary-50), var(--color-secondary-50));
}

.input-custom:focus {
  border-style: solid;
  background: var(--color-surface-elevated);
}
```

### React Component Integration

The input system works seamlessly with React components:

```tsx
interface InputProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  state?: 'error' | 'success' | 'warning'
  variant?: 'outline' | 'filled' | 'borderless'
  className?: string
}

const Input: React.FC<InputProps> = ({
  size = 'md',
  state,
  variant = 'outline',
  className = '',
  ...props
}) => {
  const classes = [
    'input',
    `input-${size}`,
    state && `input-${state}`,
    variant !== 'outline' && `input-${variant}`,
    className
  ]
    .filter(Boolean)
    .join(' ')

  return <input className={classes} {...props} />
}
```

## Migration from @tailwindcss/forms

If you were previously using `@tailwindcss/forms`, here's how to migrate:

### Before (with @tailwindcss/forms)

```html
<input type="text" class="form-input rounded-md border-gray-300" />
```

### After (with FORMULAR system)

```html
<input type="text" class="input" />
```

### Benefits of the New System

1. **Granular Control**: More specific sizing and state options
2. **Design System Integration**: Uses your design tokens consistently
3. **Better Performance**: No external plugin dependencies
4. **Customizable**: Easy to modify and extend
5. **Consistent**: All form elements follow the same patterns

## Testing

Use the included `test-input-system.html` file to verify all input variants are working correctly in your environment.

## Troubleshooting

### Input Styles Not Applied

- Ensure `form-reset.css` is imported before other component styles
- Check that the CSS layer order is correct in `index.css`
- Verify Tailwind is processing the CSS files

### Size Variants Not Working

- Confirm you're using both `.input` and `.input-{size}` classes
- Check that design tokens are loaded properly
- Ensure primitive classes are available

### Custom States Not Showing

- Verify state classes are applied: `.input-error`, `.input-success`, etc.
- Check that color tokens are defined in `tokens.css`
- Ensure focus states are not being overridden by other CSS
