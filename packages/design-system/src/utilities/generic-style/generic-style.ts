// Import types and interfaces from their proper locations
import type { ComponentConfigType } from './config/component-style-config'
import { COMPONENT_STYLE_CONFIG } from './config/component-style-config'
import { SEMANTIC_VISUAL_VARIANT_RULE } from './config/semantic-visual-variant-rules'
import { mapSemanticTokenToClass } from './helpers/semantic-token-mapper.helper'
import type { IClasses } from './interfaces/i-classes'
import type { IComponentVariants } from './interfaces/i-component-variants'
import type { IStyleStates } from './interfaces/i-style-states'
import type { IStyleStatesConfig } from './interfaces/i-style-states-config'
import type { IVariantRule } from './interfaces/i-variant-rule'
import type { IVisualVariantRules } from './interfaces/i-visual-variant-rules'
import type { ComponentType } from './types/component-type.type'
import type { ExtendedVisualVariantType } from './types/extended-visual-variant-type.type'
import type { FieldOfViewType } from './types/field-of-view-type.type'
import type { ShadesType } from './types/shades-type.type'
import { resolveHeaderConfig } from './utils/header-preset-resolver'

// ===============================================
// MAIN EXPORTS
// ===============================================

// Helper function for creating variant rules
export const VariantRule = (fov: FieldOfViewType, shade: ShadesType): IVariantRule => {
    return { shade, fov } as IVariantRule
}

// Enhanced helper function for creating variant rules with semantic token support
export { EnhancedVariantRule } from './helpers/enhanced-variant-rule.helper'

// Export semantic visual variant rules for smart contrast
export { SEMANTIC_VISUAL_VARIANT_RULE } from './config/semantic-visual-variant-rules'

// Main exports for the VISUAL_VARIANT_RULE system
export const VISUAL_VARIANT_RULE: Record<ExtendedVisualVariantType, IVisualVariantRules> = {
    ghost: {
        rules: [VariantRule('back', 50), VariantRule('fore', 600), VariantRule('border', 200)]
    },
    link: {
        rules: [VariantRule('back', 0), VariantRule('fore', 600), VariantRule('border', 0)]
    },
    outline: {
        rules: [VariantRule('back', 0), VariantRule('fore', 500), VariantRule('border', 500)]
    },
    solid: {
        rules: [VariantRule('back', 500), VariantRule('fore', 50), VariantRule('border', 500)]
    },
    elevated: {
        rules: [VariantRule('back', 500), VariantRule('fore', 50), VariantRule('border', 400)]
    },
    outlined: {
        rules: [VariantRule('back', 0), VariantRule('fore', 500), VariantRule('border', 500)]
    }
}

// Main style generation function
export const genericStyle = (variants: IComponentVariants): IClasses => {
    let output: IClasses = createFreshOutput()

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
        console.log('🎨 genericStyle called with:', variants)
    }

    output = { ...output, ...defineVariants(variants, COMPONENT_STYLE_CONFIG) }

    // Process header configuration if header preset is specified
    if (variants.headerPreset || variants.headerStyle) {
        const headerConfig = resolveHeaderConfig(
            variants.componentTypes?.[0] || 'accordion',
            variants.headerPreset || 'default',
            variants.headerStyle
        )

        if (headerConfig) {
            // Apply header configuration to output
            if (headerConfig.disableGenericText) {
                // Clear generic text styles if disabled
                output.text = []
            }

            if (headerConfig.forceBackgroundClasses?.length) {
                // Add forced background classes
                output.backGround = [...output.backGround, ...headerConfig.forceBackgroundClasses]
            }

            if (headerConfig.forceTextClasses?.length) {
                // Add forced text classes (or replace if generic text disabled)
                if (headerConfig.disableGenericText) {
                    output.text = [...headerConfig.forceTextClasses]
                } else {
                    output.text = [...output.text, ...headerConfig.forceTextClasses]
                }
            }

            if (headerConfig.customClasses?.length) {
                // Add custom classes to appropriate categories based on class prefixes
                headerConfig.customClasses.forEach(cls => {
                    if (cls.startsWith('bg-') || cls.includes('background')) {
                        output.backGround.push(cls)
                    } else if (cls.startsWith('text-') || cls.includes('color')) {
                        output.text.push(cls)
                    } else if (cls.startsWith('border-')) {
                        output.borders.push(cls)
                    } else {
                        // Default to text for unknown classes
                        output.text.push(cls)
                    }
                })
            }
        }

        if (process.env.NODE_ENV === 'development') {
            console.log('🎯 Header config applied:', headerConfig)
        }
    }

    if (process.env.NODE_ENV === 'development') {
        console.log('🎨 genericStyle result:', output)
        // Check for duplicate classes
        const allClasses = [...output.backGround, ...output.text, ...output.borders]
        const uniqueClasses = [...new Set(allClasses)]
        if (allClasses.length !== uniqueClasses.length) {
            console.warn('⚠️ Duplicate classes detected!', {
                total: allClasses.length,
                unique: uniqueClasses.length,
                duplicates: allClasses.filter((item, index) => allClasses.indexOf(item) !== index)
            })
        }
    }

    return output
}

// Enhanced style generation function with semantic token support
export const semanticStyle = (variants: IComponentVariants): IClasses => {
    let output: IClasses = createFreshOutput()

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
        console.log('🎨 semanticStyle called with:', variants)
    }

    output = { ...output, ...defineSemanticVariants(variants, COMPONENT_STYLE_CONFIG) }

    // Process header configuration if header preset is specified
    if (variants.headerPreset || variants.headerStyle) {
        const headerConfig = resolveHeaderConfig(
            variants.componentTypes?.[0] || 'accordion',
            variants.headerPreset || 'default',
            variants.headerStyle
        )

        if (headerConfig) {
            // Apply header configuration to output
            if (headerConfig.disableGenericText) {
                // Clear generic text styles if disabled
                output.text = []
            }

            if (headerConfig.forceBackgroundClasses?.length) {
                // Add forced background classes
                output.backGround = [...output.backGround, ...headerConfig.forceBackgroundClasses]
            }

            if (headerConfig.forceTextClasses?.length) {
                // Add forced text classes (or replace if generic text disabled)
                if (headerConfig.disableGenericText) {
                    output.text = [...headerConfig.forceTextClasses]
                } else {
                    output.text = [...output.text, ...headerConfig.forceTextClasses]
                }
            }

            if (headerConfig.customClasses?.length) {
                // Add custom classes to appropriate categories based on class prefixes
                headerConfig.customClasses.forEach(cls => {
                    if (cls.startsWith('bg-') || cls.includes('background')) {
                        output.backGround.push(cls)
                    } else if (cls.startsWith('text-') || cls.includes('color')) {
                        output.text.push(cls)
                    } else if (cls.startsWith('border-')) {
                        output.borders.push(cls)
                    } else {
                        // Default to text for unknown classes
                        output.text.push(cls)
                    }
                })
            }
        }

        if (process.env.NODE_ENV === 'development') {
            console.log('🎯 Header config applied:', headerConfig)
        }
    }

    if (process.env.NODE_ENV === 'development') {
        console.log('🎨 semanticStyle result:', output)
    }

    return output
}

// ===============================================
// INTERNAL IMPLEMENTATION - NOT FOR EXPORT
// ===============================================

const defaultStyleStates: IStyleStates = {
    hover: undefined,
    ring: undefined,
    focused: undefined,
    pressed: undefined,
    disabled: undefined,
    errors: undefined
}

// Factory function to create fresh default output objects
const createFreshOutput = (): IClasses => ({
    backGround: [],
    borders: [],
    composed: [],
    states: { ...defaultStyleStates },
    text: []
})

const defineStates = (componentType: ComponentType, states?: IStyleStatesConfig): IStyleStates => {
    if (!states) return defaultStyleStates

    const output: IStyleStates = { ...defaultStyleStates }

    if (states.hasDisable) {
        output.disabled = `${componentType}-disabled`
    }
    if (states.hasErrors) {
        output.errors = `${componentType}-error`
    }
    if (states.hasFocused) {
        output.focused = `focus:${componentType}-focus`
    }
    if (states.hasHover) {
        output.hover = `hover:${componentType}-hover`
    }
    if (states.hasPressed) {
        output.pressed = `pressed:${componentType}-pressed`
    }
    if (states.hasRing) {
        output.ring = `ring:${componentType}-ring`
    }
    return output
}

const defineCustomSize = (property: string, parameter?: string): string | undefined => {
    if (!parameter) return
    return `${property}-[${parameter}]`
}

const defineVariants = (variants: IComponentVariants, config: ComponentConfigType): IClasses => {
    if (process.env.NODE_ENV === 'development' && variants.componentTypes.length === 0) {
        console.log(`GenericStyle V2: Processing failed has ${variants.componentTypes.length}`)
        return createFreshOutput()
    }
    const defaultVariant = variants?.variant ?? 'primary'
    const foreVariant = variants?.typography?.variant
        ? variants?.typography?.variant
        : defaultVariant

    const visualVariantRule = VISUAL_VARIANT_RULE[variants?.visualVariant ?? 'solid']
    const fore = visualVariantRule.rules.find(o => o.fov === 'fore')
    const back = visualVariantRule.rules.find(o => o.fov === 'back')
    const border = visualVariantRule.rules.find(o => o.fov === 'border')

    const output: IClasses = createFreshOutput()

    const conmponentHasTypo = variants.componentTypes.includes('typography')

    for (const c of variants.componentTypes) {
        const currentC = config[c]
        if (c === 'typography') {
            output.text.push(`${currentC?.prefix}-${foreVariant}-${fore?.shade}`)
            output.text.push(
                `${currentC?.prefix}-${variants.typography?.size ?? currentC?.defaultAspect?.size ?? 'md'}`
            )
        } else {
            output.backGround.push(`${currentC?.prefix}-${defaultVariant}-${back?.shade}`)
            output.backGround.push(
                `${currentC?.prefix}-${variants.aspect?.size ?? currentC?.defaultAspect?.size ?? 'md'}`
            )
        }

        if (variants?.aspect?.borders ?? currentC.defaultAspect.borders) {
            output.borders.push(`${currentC?.prefix}-${foreVariant}-${border?.shade}`)
        }

        if (variants?.aspect?.rounded ?? currentC.defaultAspect.rounded) {
            output.backGround.push(`rounded`)
        }

        const width = defineCustomSize('w', variants?.aspect?.width ?? currentC.defaultAspect.width)
        if (width) {
            output.backGround.push(width)
        }

        const height = defineCustomSize(
            'h',
            variants?.aspect?.height ?? currentC.defaultAspect.height
        )
        if (height) {
            output.backGround.push(height)
        }
        output.states = defineStates(c, variants.states)
    }

    return output
}

const defineSemanticVariants = (
    variants: IComponentVariants,
    config: ComponentConfigType
): IClasses => {
    if (process.env.NODE_ENV === 'development' && variants.componentTypes.length === 0) {
        console.log(`SemanticStyle: Processing failed has ${variants.componentTypes.length}`)
        return createFreshOutput()
    }

    const defaultVariant = variants?.variant ?? 'primary'
    const foreVariant = variants?.typography?.variant
        ? variants?.typography?.variant
        : defaultVariant

    // Use semantic visual variant rules instead of traditional ones
    const semanticVariantRule = SEMANTIC_VISUAL_VARIANT_RULE[variants?.visualVariant ?? 'solid']
    const fore = semanticVariantRule.rules.find(o => o.fov === 'fore')
    const back = semanticVariantRule.rules.find(o => o.fov === 'back')
    const border = semanticVariantRule.rules.find(o => o.fov === 'border')

    const output: IClasses = createFreshOutput()

    for (const c of variants.componentTypes) {
        const currentC = config[c]

        if (c === 'typography') {
            const foreClass = mapSemanticTokenToClass(
                'fore',
                fore?.shade ?? 'variant-text',
                foreVariant,
                currentC?.prefix ?? 'text'
            )
            output.text.push(foreClass)
            output.text.push(
                `${currentC?.prefix}-${variants.typography?.size ?? currentC?.defaultAspect?.size ?? 'md'}`
            )
        } else {
            const backClass = mapSemanticTokenToClass(
                'back',
                back?.shade ?? 'variant-surface',
                defaultVariant,
                currentC?.prefix ?? 'bg'
            )
            output.backGround.push(backClass)
            output.backGround.push(
                `${currentC?.prefix}-${variants.aspect?.size ?? currentC?.defaultAspect?.size ?? 'md'}`
            )
        }

        if (variants?.aspect?.borders ?? currentC.defaultAspect.borders) {
            const borderClass = mapSemanticTokenToClass(
                'border',
                border?.shade ?? 'variant-border',
                foreVariant,
                currentC?.prefix ?? 'border'
            )
            output.borders.push(borderClass)
        }

        if (variants?.aspect?.rounded ?? currentC.defaultAspect.rounded) {
            output.backGround.push(`rounded`)
        }

        const width = defineCustomSize('w', variants?.aspect?.width ?? currentC.defaultAspect.width)
        if (width) {
            output.backGround.push(width)
        }

        const height = defineCustomSize(
            'h',
            variants?.aspect?.height ?? currentC.defaultAspect.height
        )
        if (height) {
            output.backGround.push(height)
        }

        output.states = defineStates(c, variants.states)
    }

    return output
}
