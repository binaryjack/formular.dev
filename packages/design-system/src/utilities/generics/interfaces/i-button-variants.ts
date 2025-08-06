import type {
    ComponentSizeType,
    ComponentVariantType,
    TextCaseType,
    TextWeightType,
    VisualVariantType
} from '../../../types'
import type { IComponentState } from '../../../types/interfaces'

/**
 * Button-specific variants interface with clearer naming
 */
export interface IButtonVariants {
    /** Button type/style (solid, outline, ghost, link) */
    type?: VisualVariantType
    /** Color theme (primary, secondary, info, danger, success, warning, neutral) */
    color?: ComponentVariantType
    /** Button size (2xs, xs, sm, md, lg, xl, 2xl, 3xl) */
    size?: ComponentSizeType
    /** Border radius control (false = rounded-none) */
    rounded?: boolean
    /** Text case transformation */
    textCase?: TextCaseType
    /** Font weight */
    weight?: TextWeightType
    /** Additional CSS classes */
    className?: string
    /** Button interaction state */
    state?: IComponentState
}
