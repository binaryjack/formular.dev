import { ColorShade } from '@/tokens'
import { ContrastType } from '@/types/enums/contrast-enum'
import { AppModeType, FieldOfViewType } from '@/utilities/generic-style/types'
import { IVisualVariantRule } from '../../../../../types/interfaces/i-visual-variant-rule'

// Helper function for creating variant rules
export const VisualVariantRule = (
    mode: AppModeType,
    fov: FieldOfViewType,
    shade: ColorShade,
    contrast: ContrastType
): IVisualVariantRule => {
    return { mode, shade, fov, contrast } as IVisualVariantRule
}
