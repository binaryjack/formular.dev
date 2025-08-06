import type { VisualVariantType } from '../../../types'

/**
 * Extended visual variant type that includes component-specific variants
 */
export type ExtendedVisualVariantType = VisualVariantType | 'elevated' | 'outlined'
