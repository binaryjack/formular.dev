import { EnhancedVariantRule } from '../helpers/enhanced-variant-rule.helper'
import type { ISemanticVisualVariantRules } from '../interfaces/i-semantic-visual-variant-rules'
import type { ExtendedVisualVariantType } from '../types/extended-visual-variant-type.type'

/**
 * Semantic visual variant rules that provide smart contrast automatically
 * These rules use semantic tokens that adapt to theme context
 */
export const SEMANTIC_VISUAL_VARIANT_RULE: Record<
    ExtendedVisualVariantType,
    ISemanticVisualVariantRules
> = {
    // Smart solid variant - uses semantic tokens for theme-aware contrast
    solid: {
        rules: [
            EnhancedVariantRule('back', 'variant-surface'),
            EnhancedVariantRule('fore', 'variant-text-on'),
            EnhancedVariantRule('border', 'variant-border')
        ]
    },
    // Smart outline variant
    outline: {
        rules: [
            EnhancedVariantRule('back', 0),
            EnhancedVariantRule('fore', 'variant-text'),
            EnhancedVariantRule('border', 'variant-border')
        ]
    },
    // Smart ghost variant
    ghost: {
        rules: [
            EnhancedVariantRule('back', 'surface-primary'),
            EnhancedVariantRule('fore', 'variant-text'),
            EnhancedVariantRule('border', 'surface-secondary')
        ]
    },
    // Smart link variant
    link: {
        rules: [
            EnhancedVariantRule('back', 0),
            EnhancedVariantRule('fore', 'variant-text'),
            EnhancedVariantRule('border', 0)
        ]
    },
    // Smart elevated variant
    elevated: {
        rules: [
            EnhancedVariantRule('back', 'variant-surface'),
            EnhancedVariantRule('fore', 'variant-text-on'),
            EnhancedVariantRule('border', 'variant-border')
        ]
    },
    // Smart outlined variant (alias for outline)
    outlined: {
        rules: [
            EnhancedVariantRule('back', 0),
            EnhancedVariantRule('fore', 'variant-text'),
            EnhancedVariantRule('border', 'variant-border')
        ]
    }
}
