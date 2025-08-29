import { VisualVariantType } from '@/types/enums/visual-variant-enum'

/**
 * Extended visual variant type that includes additional visual styles
 * beyond the basic VisualVariantType
 */
export type ExtendedVisualVariantType = VisualVariantType | 'elevated' | 'outlined'
