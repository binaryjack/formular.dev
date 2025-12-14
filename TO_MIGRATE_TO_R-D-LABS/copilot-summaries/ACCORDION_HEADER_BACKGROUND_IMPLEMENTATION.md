# Accordion Header Background Implementation Summary

## Overview
Successfully implemented Option 1 for accordion header background differentiation using a single `genericStyle` call with custom CSS classes layered on top.

## Implementation Details

### 1. **Single `genericStyle` Call Maintained** ✅
```tsx
const classStyle = genericStyle({
    componentTypes: ['accordion', 'typography'],
    
    states: { hasFocused: true },

    ...variants
})
```

### 2. **Differentiated Background Classes**
```tsx
// Container background (outer wrapper)
const clContainerBackground = [...classStyle.backGround, 'accordion-container']

// Header background (clickable area) with variant-specific styling
const clHeaderBackground = [...classStyle.backGround, 'accordion-header', `accordion-header-${variants.variant || 'neutral'}`]
```

### 3. **CSS Component File Created**
**File:** `packages/design-system/src/styles/components/accordion.css`

Features:
- **Base accordion-header class** with neutral styling
- **Variant-specific classes** for each color variant (primary, secondary, success, warning, danger, info)
- **Interactive states** (hover, focus-within)
- **Container styling** for outer wrapper
- **Proper transitions** and accessibility

### 4. **CSS Integration**
Added accordion.css import to `packages/design-system/src/styles/components/index.css`

## Architecture Benefits

### ✅ **Performance Optimized**
- **Single generic style call** - no duplicate processing
- **CSS classes cached** by browser
- **Minimal JavaScript overhead**

### ✅ **Maintainable**
- **Leverages existing generic style system** for base styling
- **CSS handles visual differentiation** cleanly
- **Follows established patterns** in the design system

### ✅ **Flexible**
- **Supports all color variants** automatically
- **Easy to extend** with new visual styles
- **Consistent with other components**

### ✅ **Accessible**
- **Focus states** properly handled
- **Keyboard navigation** support
- **Screen reader friendly** structure

## How It Works

### Structure
```tsx
<div className="container-background"> {/* Base + accordion-container */}
  <div className="header-background">   {/* Base + accordion-header + accordion-header-{variant} */}
    <Label />
    <ChevronToggle />
  </div>
  <ExpandableDrawer>
    {children}
  </ExpandableDrawer>
</div>
```

### Styling Layers
1. **Base styling** from `genericStyle()` - colors, sizes, states
2. **Container modifier** - `accordion-container` for outer wrapper
3. **Header modifier** - `accordion-header` for general header styling  
4. **Variant modifier** - `accordion-header-{variant}` for color-specific styling

### Variant Support
The header automatically gets variant-specific styling based on the `variants.variant` prop:
- `accordion-header-primary` - Primary color theme
- `accordion-header-secondary` - Secondary color theme
- `accordion-header-success` - Success color theme
- `accordion-header-warning` - Warning color theme
- `accordion-header-danger` - Danger color theme
- `accordion-header-info` - Info color theme
- Defaults to `neutral` if no variant specified

## Usage Example

```tsx
<Accordion 
  id="example"
  title="Example Accordion"
  variants={{ variant: 'primary' }} // Header will use primary color theme
>
  <p>Content goes here</p>
</Accordion>
```

## Next Steps

This implementation provides:
- ✅ **Different header background** as requested
- ✅ **Single genericStyle call** for performance
- ✅ **Variant-aware styling** for consistency
- ✅ **Clean CSS architecture** for maintainability

The accordion now has distinct visual separation between the header (clickable area) and container while maintaining optimal performance and following design system patterns.
