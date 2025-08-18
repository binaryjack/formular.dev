/**
 * Semantic color shade types for smart contrast tokens
 * These provide automatic theme-aware contrast handling
 */
export type SemanticShadesType =
    | 'variant-surface' // Uses --color-surface-variant-{variant}
    | 'variant-text' // Uses --color-text-variant-{variant}
    | 'variant-text-on' // Uses --color-text-on-variant-{variant}
    | 'variant-border' // Uses --color-border-variant-{variant}
    | 'surface-primary' // Uses --color-surface-primary
    | 'surface-secondary' // Uses --color-surface-secondary
    | 'text-primary' // Uses --color-text-primary
    | 'text-secondary' // Uses --color-text-secondary
    | 'smart' // Auto-select based on context
