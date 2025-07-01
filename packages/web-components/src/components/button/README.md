# Formular Button Component

A simple, customizable button web component built with formular.dev.lib and the design system.

## Features

- ✅ Multiple variants (primary, secondary, outline)
- ✅ Multiple sizes (sm, md, lg)
- ✅ Loading and disabled states
- ✅ Icon support
- ✅ Full width option
- ✅ Form integration (submit, reset, button types)
- ✅ Custom events
- ✅ Shadow DOM encapsulation
- ✅ Follows CONTRIBUTING.md prototype-based architecture

## Usage

### Basic Usage

```html
<formular-button text="Click me" variant="primary"></formular-button>
```

### All Attributes

```html
<formular-button 
  text="Button Text"
  variant="primary"
  size="md"
  type="button"
  icon="⬇️"
  disabled
  loading
  full-width
  class-name="custom-class">
</formular-button>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | string | `"Button"` | Button text content |
| `variant` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Form button type |
| `disabled` | boolean | `false` | Disabled state |
| `loading` | boolean | `false` | Loading state with spinner |
| `icon` | string | `""` | Icon to display before text |
| `full-width` | boolean | `false` | Take full container width |
| `class-name` | string | `""` | Additional CSS classes |

## Events

### `formular-click`

Dispatched when the button is clicked (unless disabled or loading).

```javascript
document.addEventListener('formular-click', (event) => {
  console.log('Button clicked:', event.detail);
  // event.detail contains:
  // - originalEvent: The original click event
  // - buttonText: The button text
  // - variant: The button variant
  // - size: The button size
});
```

## Methods

| Method | Description |
|--------|-------------|
| `click()` | Programmatically click the button |
| `focus()` | Focus the button |
| `blur()` | Remove focus from the button |

## Examples

### Variants

```html
<formular-button text="Primary" variant="primary"></formular-button>
<formular-button text="Secondary" variant="secondary"></formular-button>
<formular-button text="Outline" variant="outline"></formular-button>
```

### Sizes

```html
<formular-button text="Small" size="sm"></formular-button>
<formular-button text="Medium" size="md"></formular-button>
<formular-button text="Large" size="lg"></formular-button>
```

### States

```html
<formular-button text="Normal"></formular-button>
<formular-button text="Disabled" disabled></formular-button>
<formular-button text="Loading" loading></formular-button>
```

### With Icons

```html
<formular-button text="Download" icon="⬇️"></formular-button>
<formular-button text="Settings" icon="⚙️"></formular-button>
```

### Form Integration

```html
<form>
  <formular-button text="Submit" type="submit" variant="primary"></formular-button>
  <formular-button text="Reset" type="reset" variant="secondary"></formular-button>
</form>
```

### Full Width

```html
<formular-button text="Full Width Button" full-width></formular-button>
```

## Styling

The component uses Shadow DOM and includes built-in styles based on the design system. You can customize it by:

1. Using the `class-name` attribute for additional classes
2. CSS custom properties (if implemented)
3. Modifying the internal styles (advanced)

## Demo

Open `button-demo.html` in your browser to see all the component features in action.

For a simple test, open `simple-button-test.html`.

## Architecture

This component follows the project's CONTRIBUTING.md guidelines:
- Uses prototype-based architecture instead of class syntax
- Implements the IFormularElementInstance interface
- Follows kebab-case naming conventions
- Uses Shadow DOM for encapsulation
- Integrates with the formular.dev.lib framework
