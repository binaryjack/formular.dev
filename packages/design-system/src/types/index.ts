/**
 * Design System Types
 *
 * Type definitions for design tokens and style utilities.
 * Focused on supporting the formular.components library.
 */

// Re-export all types from the new organized structure
export type {
    ColorPaletteType,
    ComponentSizeType,
    ComponentVariantType,
    CSSCustomPropertiesType,
    ElementPositionType,
    OrientationType,
    ResponsiveValueType,
    ScreenOrientationType,
    SpacingSizeType,
    StyleUtilityType,
    TextCaseType,
    TextWeightType,
    ValueOfType,
    VisualVariantType
} from './types'

export type { IComponentState, IStyleConfig, IThemeConfig } from './interfaces'

export { DrawerBreakPointSizes } from './utilities'

// Import types for re-export as legacy aliases
import type {
    ColorPaletteType,
    ComponentSizeType,
    ComponentVariantType,
    CSSCustomPropertiesType,
    ResponsiveValueType,
    SpacingSizeType,
    StyleUtilityType,
    ValueOfType,
    VisualVariantType
} from './types'

import type { IComponentState, IStyleConfig, IThemeConfig } from './interfaces'

// Legacy type aliases for backward compatibility
// These will be deprecated in future versions

/** @deprecated Use ComponentSizeType instead */
export type Size = ComponentSizeType

/** @deprecated Use ComponentVariantType instead */
export type ColorVariant = ComponentVariantType

/** @deprecated Use VisualVariantType instead */
export type Variant = VisualVariantType

/** @deprecated Use ComponentVariantType instead */
export type VariantNameType = ComponentVariantType

/** @deprecated Use SpacingSizeType instead */
export type SpacingSize = SpacingSizeType

/** @deprecated Use ColorPaletteType instead */
export type ColorPalette = ColorPaletteType

/** @deprecated Use IComponentState instead */
export type ComponentState = IComponentState

/** @deprecated Use IStyleConfig instead */
export type StyleConfig = IStyleConfig

/** @deprecated Use IThemeConfig instead */
export type ThemeConfig = IThemeConfig

/** @deprecated Use CSSCustomPropertiesType instead */
export type CSSCustomProperties = CSSCustomPropertiesType

/** @deprecated Use ResponsiveValueType instead */
export type ResponsiveValue<T> = ResponsiveValueType<T>

/** @deprecated Use StyleUtilityType instead */
export type StyleUtility = StyleUtilityType

/** @deprecated Use ValueOfType instead */
export type ValueOf<T> = ValueOfType<T>
