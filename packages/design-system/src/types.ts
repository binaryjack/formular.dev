/**
 * Design System Types Only
 *
 * Exports only the type definitions without interfaces or utilities.
 * For consumers who only need the type definitions.
 */

export type {
    ColorPaletteType,
    ComponentSizeType,
    CSSCustomPropertiesType,
    ElementPositionType,
    OrientationType,
    ResponsiveValueType,
    ScreenOrientationType,
    SpacingSizeTypeType,
    StyleUtilityType,
    TextCaseType,
    TextWeightType,
    ValueOfType
} from './types/types'

// Re-export utility types for convenience
export type {
    ExtendedVisualVariantType,
    IGenericComponentVariants
} from './utilities/generate-validation-styles'
