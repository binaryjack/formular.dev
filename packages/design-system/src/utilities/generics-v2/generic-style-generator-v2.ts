import { ComponentSizeType, ComponentVariantType } from '@/types'
import { IComponentState } from '@/types/interfaces'
import type { ExtendedVisualVariantType } from '../types/extended-visual-variant-type.type'
import { COMPONENT_CONFIGS_V2 } from './configs/component-configs-v2'
import { getTextContrastVariant } from './configs/text-contrast-mapping'
import type { IGenericComponentVariantsV2 } from './interfaces/i-generic-component-variants-v2'
import type { ComponentTypeV2 } from './types/component-type-v2.type'

/**
 * Default values for component properties
 */
const COMPONENT_DEFAULTS = {
    variant: 'primary' as ComponentVariantType,
    size: 'md' as ComponentSizeType,
    visualVariant: 'solid' as const,
    typography: {
        case: 'normal-case' as const,
        weight: 'normal' as const
    }
}

/**
 * Components that should inherit typography from component properties by default
 */
const TEXT_AWARE_COMPONENTS: ComponentTypeV2[] = ['button', 'input']

/**
 * Generate smart text color class with proper shades for contrast
 */
const getSmartTextColorClass = (
    textVariant: ComponentVariantType,
    visualVariant: ExtendedVisualVariantType,
    componentSupportsVisualVariants: boolean
): string => {
    // Only apply smart contrast to components that actually support visual variants (like buttons)
    // Components like inputs don't have visual variants, so they should use normal text colors
    if (!componentSupportsVisualVariants) {
        return `text-${textVariant}` // Use normal text colors for components without visual variants
    }

    // For solid/elevated backgrounds, use light shades for contrast with !important to override CSS defaults
    if (visualVariant === 'solid' || visualVariant === 'elevated') {
        switch (textVariant) {
            case 'neutral':
                return '!text-neutral-50' // Very light neutral text with !important
            case 'secondary':
                return '!text-secondary-800' // Dark secondary for yellow backgrounds with !important
            case 'primary':
                return '!text-primary-700' // Dark primary for light backgrounds with !important
            default:
                return `!text-${textVariant}`
        }
    }

    // For outline/ghost/link, use normal color variants with !important for consistency
    return `!text-${textVariant}`
}

/**
 * Generate typography classes based on typography config
 */
const generateTypographyClasses = (
    componentType: ComponentTypeV2,
    componentVariant: ComponentVariantType,
    componentSize: ComponentSizeType,
    componentVisualVariant: ExtendedVisualVariantType,
    hasVisualVariants: boolean,
    typographyConfig?: IGenericComponentVariantsV2['typography']
): string[] => {
    const classes: string[] = []

    if (!typographyConfig && componentType === 'typography') {
        // Pure typography component with no config - use defaults
        classes.push(`text-${componentSize}`)
        classes.push(`text-${componentVariant}`)
        return classes
    }

    if (!typographyConfig && !TEXT_AWARE_COMPONENTS.includes(componentType)) {
        // Component doesn't need typography classes
        return classes
    }

    // Resolve typography properties with intelligent defaults
    const resolvedSize =
        typographyConfig?.size ||
        (TEXT_AWARE_COMPONENTS.includes(componentType) ? componentSize : 'md')

    // 🎨 SMART CONTRAST: Use intelligent text color based on visual variant and component color
    const smartTextVariant = getTextContrastVariant(componentVisualVariant, componentVariant)

    // Development logging for contrast decisions
    if (process.env.NODE_ENV === 'development' && TEXT_AWARE_COMPONENTS.includes(componentType)) {
        console.log(
            `🎨 Smart Contrast: ${componentType} ${componentVisualVariant}-${componentVariant} → text-${smartTextVariant}`
        )
    }

    const resolvedVariant =
        typographyConfig?.variant ||
        (TEXT_AWARE_COMPONENTS.includes(componentType) ? smartTextVariant : 'primary')

    const resolvedCase = typographyConfig?.case || COMPONENT_DEFAULTS.typography.case
    const resolvedWeight = typographyConfig?.weight || COMPONENT_DEFAULTS.typography.weight

    // Generate text size class
    classes.push(`text-${resolvedSize}`)

    // Generate text color class with smart contrast
    const textColorClass = getSmartTextColorClass(
        resolvedVariant,
        componentVisualVariant,
        hasVisualVariants
    )
    classes.push(textColorClass)

    // Generate text case class (only if not default)
    if (resolvedCase !== 'normal-case') {
        classes.push(resolvedCase)
    }

    // Generate font weight class (only if not default)
    if (resolvedWeight !== 'normal') {
        classes.push(`font-${resolvedWeight}`)
    }

    return classes
}

/**
 * Validate component configuration and warn about unusual combinations
 */
const validateConfiguration = (variants: IGenericComponentVariantsV2): void => {
    if (process.env.NODE_ENV === 'development') {
        const { componentType, size, typography } = variants

        // Warn about unusual size combinations
        if (typography?.size && size) {
            const componentSizeOrder = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']
            const componentIndex = componentSizeOrder.indexOf(size)
            const textIndex = componentSizeOrder.indexOf(typography.size)

            if (Math.abs(componentIndex - textIndex) > 2) {
                console.warn(
                    `⚠️ GenericStyle V2: Unusual combination detected`,
                    `Component "${componentType}" size "${size}" with text size "${typography.size}" may cause visual inconsistency`
                )
            }
        }

        // Warn about typography-only component with non-typography properties
        if (componentType === 'typography' && (variants.visualVariant || variants.state)) {
            console.warn(
                `⚠️ GenericStyle V2: Typography component doesn't support visualVariant or state properties`
            )
        }
    }
}

/**
 * MAIN FUNCTION: Generate CSS classes for any component type
 *
 * @param variants - Component configuration
 * @returns Generated CSS class string
 *
 * @example
 * ```typescript
 * // Simple button
 * genericStyle({ componentType: 'button' })
 * // → "btn btn-primary btn-md text-md text-primary"
 *
 * // Complex button with independent typography
 * genericStyle({
 *   componentType: 'button',
 *   visualVariant: 'outline',
 *   variant: 'primary',
 *   size: '2xl',
 *   typography: { size: '2xs', variant: 'secondary', case: 'uppercase' }
 * })
 * // → "btn btn-outline btn-primary btn-2xl text-2xs text-secondary uppercase"
 *
 * // Pure typography
 * genericStyle({
 *   componentType: 'typography',
 *   typography: { size: 'xl', variant: 'secondary', weight: 'bold' }
 * })
 * // → "text-xl text-secondary font-bold"
 * ```
 */
export const genericStyle = (variants: IGenericComponentVariantsV2): string => {
    validateConfiguration(variants)

    const config = COMPONENT_CONFIGS_V2[variants.componentType]
    if (!config) {
        console.error(`❌ GenericStyle V2: Unknown component type: ${variants.componentType}`)
        return ''
    }

    // Resolve component properties with defaults
    const resolvedVariant = variants.variant || COMPONENT_DEFAULTS.variant
    const resolvedSize = variants.size || COMPONENT_DEFAULTS.size
    const resolvedVisualVariant = variants.visualVariant || COMPONENT_DEFAULTS.visualVariant

    const classes: string[] = []

    if (process.env.NODE_ENV === 'development') {
        console.log(`🎯 GenericStyle V2: Processing ${variants.componentType}`, {
            resolved: { resolvedVariant, resolvedSize, resolvedVisualVariant },
            typography: variants.typography
        })
    }

    // ===============================================
    // COMPONENT CLASSES
    // ===============================================

    // Base class (skip for pure typography)
    if (variants.componentType !== 'typography') {
        const baseClass = config.customPatterns?.base ?? config.prefix

        if (baseClass) {
            classes.push(baseClass)
        }
    }

    // Size classes
    if (config.hasSizeVariants && variants.componentType !== 'typography') {
        const sizeClass = config.customPatterns?.size
            ? config.customPatterns.size(resolvedSize)
            : `${config.prefix}-${resolvedSize}`
        classes.push(sizeClass)
    }

    // Visual variant + color variant classes
    if (config.hasVisualVariants && config.hasColorVariants) {
        if (config.customPatterns?.visualVariant) {
            const variantClass = config.customPatterns.visualVariant(
                resolvedVisualVariant,
                resolvedVariant
            )
            classes.push(variantClass)
        } else if (resolvedVisualVariant === 'solid') {
            // Solid: btn-primary (no base class needed)
            classes.push(`${config.prefix}-${resolvedVariant}`)
        } else {
            // Outline/ghost: need base class + specific class
            // Base class: btn-outline, btn-ghost
            classes.push(`${config.prefix}-${resolvedVisualVariant}`)
            // Specific class: btn-outline-primary, btn-ghost-primary
            classes.push(`${config.prefix}-${resolvedVisualVariant}-${resolvedVariant}`)
        }
    } else if (config.hasColorVariants) {
        // Only color variants (like progress, avatar)
        const variantClass = config.customPatterns?.variant
            ? config.customPatterns.variant(resolvedVariant)
            : `${config.prefix}-${resolvedVariant}`
        classes.push(variantClass)
    }

    // State classes
    if (config.hasStateClasses && variants.state) {
        const stateEntries = Object.entries(variants.state) as [keyof IComponentState, boolean][]
        stateEntries.forEach(([stateKey, stateValue]) => {
            if (stateValue) {
                const stateClass = config.customPatterns?.state
                    ? config.customPatterns.state(stateKey)
                    : variants.componentType === 'button'
                      ? `state-${String(stateKey)}` // Buttons use 'state-' prefix
                      : `${config.prefix}-${String(stateKey)}` // Other components use component prefix

                if (stateClass) {
                    classes.push(stateClass)
                }
            }
        })
    }

    // ===============================================
    // TYPOGRAPHY CLASSES
    // ===============================================

    if (config.hasTypographySupport) {
        const typographyClasses = generateTypographyClasses(
            variants.componentType,
            resolvedVariant,
            resolvedSize,
            resolvedVisualVariant,
            config.hasVisualVariants,
            variants.typography
        )
        classes.push(...typographyClasses)
    }

    // ===============================================
    // UTILITY CLASSES
    // ===============================================

    // Rounded utility
    if (variants.rounded === false) {
        classes.push('rounded-none')
    }

    // Custom className
    if (variants.className) {
        classes.push(variants.className)
    }

    const finalClasses = classes.filter(Boolean).join(' ').trim()

    if (process.env.NODE_ENV === 'development') {
        console.log(
            `✅ GenericStyle V2: Generated classes for ${variants.componentType}:`,
            finalClasses
        )
    }

    return finalClasses
}

/**
 * Utility: Get available component types
 */
export const getAvailableComponentTypesV2 = (): ComponentTypeV2[] => {
    return Object.keys(COMPONENT_CONFIGS_V2) as ComponentTypeV2[]
}

/**
 * Utility: Check if a component supports a specific feature
 */
export const componentSupportsFeatureV2 = (
    componentType: ComponentTypeV2,
    feature: 'visualVariants' | 'colorVariants' | 'sizeVariants' | 'stateClasses' | 'typography'
): boolean => {
    const config = COMPONENT_CONFIGS_V2[componentType]
    if (!config) return false

    switch (feature) {
        case 'visualVariants':
            return config.hasVisualVariants
        case 'colorVariants':
            return config.hasColorVariants
        case 'sizeVariants':
            return config.hasSizeVariants
        case 'stateClasses':
            return config.hasStateClasses
        case 'typography':
            return config.hasTypographySupport
        default:
            return false
    }
}
