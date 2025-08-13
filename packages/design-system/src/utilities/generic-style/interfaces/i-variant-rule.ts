import type { FieldOfViewType } from '../types/field-of-view-type.type'
import type { ShadesType } from '../types/shades-type.type'

/**
 * Variant rule defining styling properties for a visual variant
 */
export interface IVariantRule {
    shade: ShadesType
    fov: FieldOfViewType
}
