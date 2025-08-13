import type {
    ComponentSizeType,
    ComponentVariantType,
    TextCaseType,
    TextWeightType
} from '../../../types'

/**
 * Typography configuration for independent text styling
 *
 * This allows complete separation between component structure and text appearance
 */
export interface ITypographyConfig {
    /** Text size (independent from component size) */
    size?: ComponentSizeType
    /** Text color variant (independent from component color) */
    variant?: ComponentVariantType
    /** Text case transformation */
    case?: TextCaseType
    /** Font weight */
    weight?: TextWeightType
}
