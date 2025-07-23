/**
 * Component Variant Types
 *
 * Shared type definitions for component variants across the design system.
 * These types define the available options for styling components.
 */

// Utility type for extracting value types from objects
export type ValueOf<T> = T[keyof T]

// Color variants for components (extends existing ColorVariant)
export type VariantNameType = 'primary' | 'secondary' | 'info' | 'danger' | 'success' | 'warning'

// Component size variants (extends existing Size type with additional sizes)
export type ComponentSizeType = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// Text weight variants for typography
export type TextWeightType =
    | 'extralight'
    | 'light'
    | 'thin'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'mono'
    | 'sans'
    | 'serif'

// Component orientation
export type OrientationType = 'vertical' | 'horizontal'

// Element positioning for modals, drawers, etc.
export type ElementPositionType = 'top' | 'bottom' | 'center'

// Text case variants for typography
export type TextCaseType = 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case'

// Screen orientation (for responsive components)
export type ScreenOrientationType = 'portrait' | 'landscape' | 'undefined'

// Breakpoint array for drawer components (subset of ComponentSizeType)
export const DrawerBreakPointSizes: ComponentSizeType[] = ['md', 'lg', 'xl', '2xl']
