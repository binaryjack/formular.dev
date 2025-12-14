# Button Edge Click Behavior Fix

## Problem Description

The button component was exhibiting strange behavior when clicking on the edges, particularly when used as a toggle button. The issue manifested as inconsistent toggle state changes and seemed to always want to send "true" values.

## Root Causes Identified

1. **Event Propagation Issues**: The nested div structure inside the button was interfering with proper event handling
2. **Missing Event Boundaries**: No validation that clicks were actually within button boundaries
3. **Incomplete Toggle State Management**: The `aria-pressed` attribute was not properly reflecting the actual toggle state
4. **Event Bubbling**: Child elements were potentially capturing or interfering with click events

## Solutions Implemented

### 1. Enhanced Click Event Handling

```typescript
// Enhanced click handler to ensure proper event handling
const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Ensure click is only processed on the button element itself
    if (e.currentTarget !== e.target && !e.currentTarget.contains(e.target as Node)) {
        return
    }
    
    // Stop propagation to prevent event bubbling issues
    e.stopPropagation()
    
    // Call the ripple effect handler
    onClick(e)
}
```

### 2. Improved Ripple Effect Boundary Validation

```typescript
// Ensure the click is within the button boundaries
const rect = btn.getBoundingClientRect()
const isWithinBounds = 
    e.clientX >= rect.left && 
    e.clientX <= rect.right && 
    e.clientY >= rect.top && 
    e.clientY <= rect.bottom

if (!isWithinBounds) return
```

### 3. Proper Toggle State Management

Added `isPressed` prop to properly manage toggle state:

```typescript
interface IButtonProps {
    // ... existing props
    isPressed?: boolean // Add this to properly handle toggle state
}

// Usage in component:
aria-pressed={isToggle ? (isPressed ? 'true' : 'false') : undefined}
```

### 4. Pointer Events Prevention

Added `pointerEvents: 'none'` to child elements to prevent interference:

```typescript
<div 
    className="..."
    style={{ pointerEvents: 'none' }} // Prevent this div from interfering with click events
>
```

### 5. Enhanced Event Propagation Control

Enabled proper event propagation control:

```typescript
const handleOnMouseDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    // Prevent default only if necessary to avoid interference with click events
}

const handleOnMouseUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    // Prevent default only if necessary to avoid interference with click events
}
```

## Usage Guidelines

### For Toggle Buttons

```typescript
const [isPressed, setIsPressed] = useState(false)

const handleToggleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsPressed(prev => !prev)
}

<Button
    id="toggle-button"
    title="Toggle Button"
    onClickCallback={handleToggleClick}
    isToggle={true}
    isPressed={isPressed}
    variantProperties={{
        variant: isPressed ? 'secondary' : 'primary',
        size: 'md'
    }}
>
    {isPressed ? 'ON' : 'OFF'}
</Button>
```

### For Regular Buttons

```typescript
const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Your click logic here
}

<Button
    id="regular-button"
    title="Regular Button"
    onClickCallback={handleClick}
    variantProperties={{
        variant: 'primary',
        size: 'md'
    }}
>
    Click Me
</Button>
```

## Testing

Use the provided `toggle-button-example.tsx` to test:

1. Click on button edges and centers
2. Observe console logs for event details
3. Verify toggle state changes correctly
4. Check that no unexpected behavior occurs on edge clicks

## Benefits

- ✅ Consistent click behavior across the entire button area
- ✅ Proper toggle state management
- ✅ Improved accessibility with correct ARIA attributes
- ✅ Eliminated event propagation issues
- ✅ Better debugging capabilities with enhanced logging
- ✅ More predictable behavior for edge interactions
