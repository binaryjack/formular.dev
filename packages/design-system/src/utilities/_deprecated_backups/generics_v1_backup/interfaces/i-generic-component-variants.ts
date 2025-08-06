import type {
    ComponentSizeType,
    ComponentVariantType,
    TextCaseType,
    TextWeightType
} from '../../../types'
import type { IComponentState } from '../../../types/interfaces'
import type { ExtendedVisualVariantType } from '../types/extended-visual-variant-type.type'

/**
 * Generic component variants options
 */
export interface IGenericComponentVariants {
    /** Color variant (primary, secondary, info, danger, success, warning, neutral) */
    variant: ComponentVariantType
    /** Component size (2xs, xs, sm, md, lg, xl, 2xl, 3xl) */
    size: ComponentSizeType
    /** Text case transformation */
    textCase: TextCaseType
    /** Font weight */
    weight: TextWeightType
    /** Border radius control (false = rounded-none) */
    rounded: boolean
    /** Custom width */
    width: string
    /** Custom height */
    height: string
    /** Additional CSS classes */
    className: string
    /** Visual style variant - for buttons this is the "type" (solid, outline, ghost, link) */
    visualVariant?: ExtendedVisualVariantType
    /** Component interaction state */
    state?: IComponentState
}
