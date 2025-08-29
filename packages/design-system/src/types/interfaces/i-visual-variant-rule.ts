import { ColorShade } from '@/tokens'
import { AppModeType } from '../../utilities/generic-style/types'
import { ContrastType } from '../enums/contrast-enum'
import type { FieldOfViewType } from '../types/field-of-view-type.type'

/**
 * Variant rule defining styling properties for a visual variant
 */
export interface IVisualVariantRule {
    mode: AppModeType
    shade: ColorShade
    fov: FieldOfViewType
    contrast: ContrastType
}
