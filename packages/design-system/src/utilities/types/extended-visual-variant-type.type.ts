import type { VisualVariantType } from '../../types'

/**
 * Extended visual variant type that includes additional visual styles
 * beyond the basic VisualVariantType
 */
export type ExtendedVisualVariantType = VisualVariantType | 'elevated' | 'outlined'
