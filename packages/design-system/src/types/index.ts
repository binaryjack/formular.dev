/**
 * Design System Types
 *
 * Type definitions for design tokens and style utilities.
 * Focused on supporting the formular.components library.
 */

import { colors } from '../tokens/colors'
import { spacing } from '../tokens/spacing'

// Re-export component variant types
export type {
    ComponentSizeType,
    ElementPositionType,
    OrientationType,
    ScreenOrientationType,
    TextCaseType,
    TextWeightType,
    ValueOf,
    VariantNameType
} from './component-variants'

export { DrawerBreakPointSizes } from './component-variants'

// Component size variants (for utility classes)
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Component color variants based on design tokens
export type ColorVariant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'neutral'

// Component visual variants (for utility classes)
export type Variant = 'solid' | 'outline' | 'ghost' | 'link'

// Component spacing variants
export type SpacingSize = keyof typeof spacing

// Color palette type
export type ColorPalette = typeof colors

// Component state types for styling
export interface ComponentState {
    /** Whether the component is focused */
    focused: boolean
    /** Whether the component is hovered */
    hovered: boolean
    /** Whether the component is pressed/active */
    pressed: boolean
    /** Whether the component is disabled */
    disabled: boolean
    /** Whether the component is in an error state */
    error: boolean
    /** Whether the component is loading */
    loading: boolean
}

// Style configuration for components
export interface StyleConfig {
    /** Base CSS classes */
    base?: string
    /** Variant-specific classes */
    variants?: Record<string, string>
    /** Size-specific classes */
    sizes?: Record<Size, string>
    /** Color-specific classes */
    colors?: Record<ColorVariant, string>
    /** State-specific classes */
    states?: Partial<Record<keyof ComponentState, string>>
}

// Theme configuration
export interface ThemeConfig {
    /** Color tokens */
    colors: ColorPalette
    /** Spacing tokens */
    spacing: typeof spacing
    /** Component style configurations */
    components?: Record<string, StyleConfig>
}

// CSS custom properties type
export type CSSCustomProperties = Record<`--${string}`, string | number>

// Responsive values
export type ResponsiveValue<T> = T | Partial<Record<string, T>>

// Style utilities return type
export type StyleUtility = string | string[] | Record<string, boolean>
