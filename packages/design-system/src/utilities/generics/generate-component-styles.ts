import type { IComponentState } from '../../types/interfaces'
import { COMPONENT_CONFIGS } from './component-configs'
import type { IGenericComponentVariants } from './interfaces/i-generic-component-variants'
import type { ComponentType } from './types/component-type.type'

/**
 * Generate component style classes for any component type
 *
 * @param componentType - The type of component (button, input, card, etc.)
 * @param options - Component variant options
 * @returns Generated CSS class string
 *
 * @example
 * ```typescript
 * // Button styles
 * generateComponentStyles('button', {
 *   visualVariant: 'solid',
 *   variant: 'primary',
 *   size: 'md'
 * })
 * // Returns: "btn btn-md btn-primary"
 *
 * // Input styles
 * generateComponentStyles('input', {
 *   size: 'lg',
 *   state: { error: true, focused: false, disabled: false, hovered: false, pressed: false, loading: false }
 * })
 * // Returns: "input input-lg input-error"
 *
 * // Card styles
 * generateComponentStyles('card', {
 *   visualVariant: 'outlined'
 * })
 * // Returns: "card card-outlined"
 * ```
 */
export const generateComponentStyles = (
    componentType: ComponentType,
    options: Partial<IGenericComponentVariants> = {}
): string => {
    console.log(`🎯 Processing component: ${componentType}`, { options })

    const config = COMPONENT_CONFIGS[componentType]
    if (!config) {
        console.warn(`Unknown component type: ${componentType}`)
        return ''
    }

    console.log(`📋 Component config found:`, { config })

    const {
        variant = 'primary',
        size = 'md',
        textCase = 'normal-case',
        weight = 'normal',
        rounded, // Don't set a default, let it be undefined unless explicitly set
        className = '',
        visualVariant = 'solid',
        state
    } = options

    const classes: string[] = []
    console.log(`🔧 Initial classes array:`, classes)

    // Base class
    const baseClass = config.customPatterns?.base || config.prefix
    classes.push(baseClass)
    console.log(`➕ Added base class: "${baseClass}"`, { classes })

    // Size classes
    if (config.hasSizeVariants) {
        const sizeClass = config.customPatterns?.size
            ? config.customPatterns.size(size)
            : `${config.prefix}-${size}`
        classes.push(sizeClass)
        console.log(`📏 Added size class: "${sizeClass}"`, { size, classes })
    } else {
        console.log(`📏 No size variants for component type: ${componentType}`)
    }

    // Visual variant + color variant classes
    if (config.hasVisualVariants && config.hasColorVariants) {
        const variantClass = config.customPatterns?.visualVariant
            ? config.customPatterns.visualVariant(visualVariant, variant)
            : visualVariant === 'solid'
              ? `${config.prefix}-${variant}`
              : `${config.prefix}-${visualVariant}-${variant}`
        classes.push(variantClass)
        console.log(`🎨 Added visual+color variant class: "${variantClass}"`, {
            visualVariant,
            variant,
            classes
        })
    } else if (config.hasVisualVariants) {
        // Only visual variants (like card)
        const variantClass = config.customPatterns?.visualVariant
            ? config.customPatterns.visualVariant(visualVariant, variant)
            : visualVariant === 'solid'
              ? config.prefix
              : `${config.prefix}-${visualVariant}`
        if (variantClass !== config.prefix) {
            classes.push(variantClass)
            console.log(`🎨 Added visual variant class: "${variantClass}"`, {
                visualVariant,
                classes
            })
        } else {
            console.log(`🎨 Skipped visual variant class (same as base): "${variantClass}"`)
        }
    } else if (config.hasColorVariants) {
        // Only color variants (like progress, avatar)
        const variantClass = config.customPatterns?.variant
            ? config.customPatterns.variant(variant)
            : `${config.prefix}-${variant}`
        classes.push(variantClass)
        console.log(`🎨 Added color variant class: "${variantClass}"`, { variant, classes })
    } else {
        console.log(`🎨 No visual or color variants for component type: ${componentType}`)
    }

    // State classes
    if (config.hasStateClasses && state) {
        console.log(`🔄 Processing state classes:`, { state })
        Object.entries(state).forEach(([stateKey, stateValue]) => {
            if (stateValue) {
                const stateClass = config.customPatterns?.state
                    ? config.customPatterns.state(stateKey as keyof IComponentState)
                    : componentType === 'button' || componentType === 'btn'
                      ? `state-${stateKey}` // Buttons use 'state-' prefix
                      : `${config.prefix}-${stateKey}` // Other components use component prefix

                // Only push non-null state classes
                if (stateClass) {
                    classes.push(stateClass)
                    console.log(
                        `🔄 Added state class: "${stateClass}" for ${stateKey}=${stateValue}`,
                        { classes }
                    )
                } else {
                    console.log(`🔄 Skipped null state class for ${stateKey}=${stateValue}`)
                }
            } else {
                console.log(`🔄 Skipped state ${stateKey}=${stateValue} (falsy value)`)
            }
        })
    } else {
        if (!config.hasStateClasses) {
            console.log(`🔄 No state classes for component type: ${componentType}`)
        }
        if (!state) {
            console.log(`🔄 No state provided`)
        }
    }

    // Text case and weight utilities
    if (textCase && textCase !== 'normal-case') {
        classes.push(textCase)
        console.log(`🔤 Added text case: "${textCase}"`, { classes })
    } else {
        console.log(`🔤 Skipped text case: "${textCase}" (default or empty)`)
    }

    if (weight && weight !== 'normal') {
        const weightClass = `font-${weight}`
        classes.push(weightClass)
        console.log(`🔤 Added font weight: "${weightClass}"`, { classes })
    } else {
        console.log(`🔤 Skipped font weight: "${weight}" (default or empty)`)
    }

    // Rounded utility - only add rounded-none if explicitly set to false
    if (rounded === false) {
        classes.push('rounded-none')
        console.log(`🔲 Added rounded utility: "rounded-none"`, { classes })
    } else {
        console.log(`🔲 Skipped rounded utility: ${rounded} (not explicitly false)`)
    }

    // Custom className
    if (className) {
        classes.push(className)
        console.log(`✨ Added custom className: "${className}"`, { classes })
    } else {
        console.log(`✨ No custom className provided`)
    }

    const finalClasses = classes.filter(Boolean).join(' ').trim()
    console.log(`🎯 Final classes for ${componentType}:`, finalClasses)

    return finalClasses
}
