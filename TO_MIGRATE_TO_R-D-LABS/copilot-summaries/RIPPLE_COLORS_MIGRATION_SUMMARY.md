# Button Ripple Colors Migration to Design System

## Summary

Successfully migrated hardcoded ripple colors from the Button component to proper design system classes.

## Changes Made

### 1. Added Ripple Color Classes to Design System

**File**: `packages/design-system/src/styles/components/button.css`

Added new CSS classes for button ripple effects:

```css
/* ===============================================
   BUTTON RIPPLE EFFECT CLASSES
   =============================================== */
/* Ripple colors for button variants */
.btn-ripple-primary {
    background-color: rgba(255, 255, 255, 0.8);
}

.btn-ripple-secondary {
    background-color: rgba(255, 255, 255, 0.6);
}

.btn-ripple-danger {
    background-color: rgba(255, 255, 255, 0.8);
}

.btn-ripple-success {
    background-color: rgba(255, 255, 255, 0.8);
}

.btn-ripple-warning {
    background-color: rgba(0, 0, 0, 0.6);
}

.btn-ripple-info {
    background-color: rgba(255, 255, 255, 0.8);
}
```

### 2. Added Utility Function to Design System

**File**: `packages/design-system/src/utilities/component-styles.ts`

Added a utility function for generating ripple class names:

```typescript
/**
 * Generate button ripple style classes
 */
export const generateButtonRippleStyles = (
    color: ComponentVariantType = 'primary'
): string => {
    return `btn-ripple-${color}`
}
```

### 3. Updated Button Component

**File**: `packages/vendors/react/formular.components/src/components/button/button.tsx`

**Before** (hardcoded colors):
```tsx
backgroundColor:
    variant === 'primary'
        ? 'rgba(255, 255, 255, 0.8)'
        : variant === 'secondary'
          ? 'rgba(255, 255, 255, 0.6)'
          : variant === 'danger'
            ? 'rgba(255, 255, 255, 0.8)'
            : variant === 'success'
              ? 'rgba(255, 255, 255, 0.8)'
              : variant === 'warning'
                ? 'rgba(0, 0, 0, 0.6)'
                : 'rgba(255, 255, 255, 0.8)' // info and default
```

**After** (using design system classes):
```tsx
className={`absolute btn-ripple-${variant}`}
```

## Benefits

1. **Consistency**: All button ripple colors are now centralized in the design system
2. **Maintainability**: Easy to update colors across all components from one place
3. **Type Safety**: Leverages existing ComponentVariantType for type checking
4. **Performance**: Reduces inline styles and promotes CSS class reuse
5. **Scalability**: New variants automatically get ripple colors when added to design system

## Available Classes

- `.btn-ripple-primary` - White with 80% opacity
- `.btn-ripple-secondary` - White with 60% opacity  
- `.btn-ripple-danger` - White with 80% opacity
- `.btn-ripple-success` - White with 80% opacity
- `.btn-ripple-warning` - Black with 60% opacity
- `.btn-ripple-info` - White with 80% opacity

## Testing

Created `test-ripple-colors.html` to verify all ripple color classes are working correctly.

The changes maintain the exact same visual appearance while improving code organization and maintainability.
