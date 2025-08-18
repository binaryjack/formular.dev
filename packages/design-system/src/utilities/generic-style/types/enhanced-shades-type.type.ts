import type { SemanticShadesType } from './semantic-shades-type.type'
import type { ShadesType } from './shades-type.type'

/**
 * Enhanced shade type that supports both traditional shade numbers and semantic tokens
 */
export type EnhancedShadesType = ShadesType | SemanticShadesType
