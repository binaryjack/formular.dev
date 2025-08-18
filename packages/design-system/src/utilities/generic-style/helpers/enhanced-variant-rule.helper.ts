import type { IEnhancedVariantRule } from '../interfaces/i-enhanced-variant-rule'
import type { EnhancedShadesType } from '../types/enhanced-shades-type.type'
import type { FieldOfViewType } from '../types/field-of-view-type.type'

/**
 * Enhanced helper function for creating variant rules with semantic token support
 */
export const EnhancedVariantRule = (
    fov: FieldOfViewType,
    shade: EnhancedShadesType
): IEnhancedVariantRule => {
    const isSemantic = typeof shade === 'string'
    return {
        shade,
        fov,
        isSemantic
    } as IEnhancedVariantRule
}
