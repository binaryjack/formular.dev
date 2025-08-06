# Migration to V2 Generic Style System

## Overview

The V2 Generic Style System has been implemented and is ready for production use. It consolidates multiple style generators into a single unified API with separated typography concerns.

## What's New in V2

### ✅ Single Unified API

```typescript
// OLD: Multiple generators
const btnClasses = generateButtonStyles(variants)
const inputClasses = generateInputStyles(variants)
const cardClasses = generateCardStyles(variants)

// NEW: Single generic API
const btnClasses = genericStyle({ componentType: 'button', ...variants })
const inputClasses = genericStyle({ componentType: 'input', ...variants })
const cardClasses = genericStyle({ componentType: 'card', ...variants })
```

### ✅ Separated Typography

```typescript
// NEW: Independent typography control
const buttonClasses = genericStyle({
  componentType: 'button',
  variant: 'primary',
  size: 'lg',
  typography: {
    size: 'sm', // Button is large, text is small
    variant: 'secondary' // Button is primary, text is secondary color
  }
})
```

### ✅ Available Component Types

- ✅ `button` - Fully implemented and tested
- ✅ `typography` - Pure text component
- ✅ `input` - Form input component
- ✅ `card` - Container component
- ✅ `accordion` - Expandable container
- ✅ `modal` - Overlay component
- ✅ `badge` - Small indicator
- ✅ `chip` - Interactive tag

## Migration Strategy

### Phase 1: Core Components ✅ COMPLETED

- [x] Button component migrated to V2 (both new V2 version and legacy version)
- [x] Typography component integrated
- [x] V2 system exported from main library
- [x] Text color utilities integrated into CSS

### Phase 2: Input Components ✅ COMPLETED

- [x] Base Input component migrated to V2
- [x] Input Text component migrated to V2
- [x] Password component migrated to V2
- [x] Date Picker component migrated to V2

### Phase 3: Container Components ✅ COMPLETED

- [x] Accordion component migrated to V2 with variant support
- [x] Card config added (ready for use)
- [x] Modal config added (ready for use)

### Phase 4: Indicator Components ✅ COMPLETED

- [x] Badge config added (ready for use)
- [x] Chip config added (ready for use)

### Phase 5: Clean Up ✅ COMPLETED

- [x] Backed up old generators to `_deprecated_backups/`
- [x] Removed old `/generics` folder
- [x] Updated imports and exports
- [x] Fixed TypeScript compilation
- [x] Created minimal backward-compatible layer

## V2 Usage Examples

### Basic Button

```typescript
const classes = genericStyle({
  componentType: 'button',
  variant: 'primary',
  size: 'lg'
})
```

### Button with Custom Typography

```typescript
const classes = genericStyle({
  componentType: 'button',
  variant: 'primary',
  size: 'lg',
  typography: {
    size: 'sm',
    variant: 'secondary'
  }
})
```

### Typography Only

```typescript
const classes = genericStyle({
  componentType: 'typography',
  typography: {
    size: 'xl',
    variant: 'primary'
  }
})
// Results in: text-xl text-primary
```

## Files Status

### ✅ V2 System (Active)

- `packages/design-system/src/utilities/generics-v2/` - New V2 system
- `packages/design-system/src/styles/utilities.css` - Includes text-[variant] utilities

### 🔄 V1 System (Legacy - Keep for now)

- `packages/design-system/src/utilities/generics/` - Original system
- Keep until all components are migrated

### 📋 Migration Checklist

- [x] Button component using V2 (both versions)
- [x] Typography component using V2
- [x] Text utilities integrated
- [x] Base Input component migrated
- [x] Input Text component migrated
- [x] Password component migrated
- [x] Date Picker component migrated
- [x] Accordion component migrated
- [x] All 8 component types configured (button, typography, input, card, accordion, modal, badge, chip)
- [x] Old generators removed and backed up
- [x] Build system working cleanly
- [ ] CSS implementation for new component types (card, modal, badge, chip)
- [ ] Update all remaining components to V2 system

## Notes

- V2 system is fully typed with TypeScript
- All text-[variant] classes are available and have proper CSS specificity
- Component states (hover, focus, disabled, etc.) are properly handled
- The system is extensible - easy to add new component types

---

_Last updated: August 6, 2025_
