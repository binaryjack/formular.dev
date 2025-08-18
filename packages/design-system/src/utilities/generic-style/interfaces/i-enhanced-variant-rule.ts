import type { EnhancedShadesType } from '../types/enhanced-shades-type.type'
import type { FieldOfViewType } from '../types/field-of-view-type.type'

/**
 * Enhanced variant rule that supports both traditional shades and semantic tokens
 */
export interface IEnhancedVariantRule {
    shade: EnhancedShadesType
    fov: FieldOfViewType
    isSemantic?: boolean // Flag to indicate if using semantic tokens
}
