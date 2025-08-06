/**
 * Design System Types Only
 *
 * Exports only the type definitions without interfaces or utilities.
 * For consumers who only need the type definitions.
 */

export type {
    CSSCustomPropertiesType,
    ColorPaletteType,
    ComponentSizeType,
    ComponentVariantType,
    ElementPositionType,
    OrientationType,
    ResponsiveValueType,
    ScreenOrientationType,
    SpacingSizeTypeType,
    StyleUtilityType,
    TextCaseType,
    TextWeightType,
    ValueOfType,
    VisualVariantType
} from './types/types'

// Re-export utility types for convenience
export type {
    ComponentType,
    ExtendedVisualVariantType,
    IGenericComponentVariants
} from './utilities/generic-component-styles'
