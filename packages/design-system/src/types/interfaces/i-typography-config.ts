import type { ComponentSizeType, TextCaseType, TextWeightType } from '../../types'
import { VariantType } from '../enums/variants-enum'

/**
 * Typography configuration for independent text styling
 *
 * This allows complete separation between component structure and text appearance
 */
export interface ITypographyConfig {
    /** Text size (independent from component size) */
    size?: ComponentSizeType
    /** Text color variant (independent from component color) */
    variant?: VariantType
    /** Text case transformation */
    case?: TextCaseType
    /** Font weight */
    weight?: TextWeightType
}
