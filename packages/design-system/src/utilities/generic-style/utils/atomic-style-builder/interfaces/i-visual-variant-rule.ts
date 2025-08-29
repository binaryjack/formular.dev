import { ColorShade } from '@/tokens/colors'
import { ContrastType } from '@/types/enums/contrast-enum'
import { VariantType } from '@/types/enums/variants-enum'
import { AppModeType } from '@/utilities/generic-style/types'

export interface IVisualVariantRule {
    mode: AppModeType
    variant: VariantType
    contrast: ContrastType
    shade: ColorShade
}

/**
 * Helper function for creating visual variant rules for the atomic style builder
 */
export const VisualVariantRule = (
    mode: AppModeType,
    variant: VariantType,
    contrast: ContrastType,
    shade: ColorShade
): IVisualVariantRule => {
    return { mode, variant, contrast, shade }
}
