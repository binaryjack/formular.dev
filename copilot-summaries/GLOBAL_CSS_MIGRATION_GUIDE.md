# Global CSS Migration Guide

## Overview

This document outlines the migration of utilities from `globals.css` to the design system to eliminate conflicts and maintain consistency.

## Migration Status

### ✅ Successfully Migrated to Design System

The following utilities have been added to `packages/design-system/src/styles/utilities.css`:

#### **Flex Layout Utilities**
- **`.flex-between`** - `display: flex; justify-content: space-between; align-items: center;`
- **`.flex-center`** - `display: flex; justify-content: center; align-items: center;`
- **`.flex-start`** - `display: flex; justify-content: flex-start; align-items: center;`
- **`.flex-end`** - `display: flex; justify-content: flex-end; align-items: center;`

#### **EM-based Text Size Utilities**
- **`.text-micro`** - `font-size: 0.4em;` (replaces `.text-04`)
- **`.text-mini`** - `font-size: 0.8em;` (replaces `.text-08`)
- **`.text-base-em`** - `font-size: 1em;` (replaces `.text-10`)
- **`.text-large-em`** - `font-size: 1.15em;` (replaces `.text-115`)
- **`.text-xl-em`** - `font-size: 1.35em;` (replaces `.text-135`)
- **`.text-2xl-em`** - `font-size: 1.65em;` (replaces `.text-165`)
- **`.text-3xl-em`** - `font-size: 2em;` (replaces `.text-200`)

#### **Text Utilities**
- **`.text-ellipsis`** - Already existed in design system (replaces `.elipsis` and `.text-elipsis`)

## Migration Actions Required

### 1. Update Component Usage

Replace deprecated classes in your components:

```tsx
// Before (deprecated)
<div className="flex-between">...</div>
<span className="text-04">Small text</span>
<p className="elipsis">Long text...</p>

// After (design system)
<div className="flex-between">...</div>  // Same class name, now from design system
<span className="text-micro">Small text</span>
<p className="text-ellipsis">Long text...</p>
```

### 2. Search and Replace Guide

Use your IDE's find and replace feature to update:

| **Find** | **Replace With** | **Context** |
|----------|------------------|-------------|
| `text-04` | `text-micro` | Text sizing |
| `text-08` | `text-mini` | Text sizing |
| `text-10` | `text-base-em` | Text sizing |
| `text-115` | `text-large-em` | Text sizing |
| `text-135` | `text-xl-em` | Text sizing |
| `text-165` | `text-2xl-em` | Text sizing |
| `text-200` | `text-3xl-em` | Text sizing |
| `elipsis` | `text-ellipsis` | Text overflow |
| `text-elipsis` | `text-ellipsis` | Text overflow (typo fix) |

### 3. Not Yet Migrated

These utilities remain in `globals.css` and need evaluation:

- **`.items-left`** - Custom flex layout with background styling
- **`.icon-box`** - Icon container with hover effects

**Recommendation**: Evaluate if these should become design system components or remain app-specific.

## Benefits of Migration

1. **Consistency** - All utilities now follow design system naming conventions
2. **Performance** - Reduced CSS duplication and conflicts
3. **Maintainability** - Single source of truth for utility styles
4. **Scalability** - Design system utilities can be used across all vendor packages

## Next Steps

1. **Search codebase** for usage of deprecated classes
2. **Update components** to use new design system utilities
3. **Remove deprecated utilities** from `globals.css` once migration is complete
4. **Add remaining utilities** to design system if they prove useful across packages

## File Locations

- **Design System Utilities**: `packages/design-system/src/styles/utilities.css`
- **Legacy Global Styles**: `packages/vendors/react/formular.components/src/style/globals.css`
- **Import Order**: Design system is imported first, ensuring its utilities take precedence
