import { IVisualVariantRule } from '@/types/interfaces/i-visual-variant-rule'
import { IBorderStyle } from '../generic-styling'

export const borderResolver = (
    prefix: string,
    style?: IBorderStyle,
    visualVariant?: IVisualVariantRule[]
) => {
    if (!style) return ''

    const classes: string[] = []

    // Add border width
    if (style.size > 0) {
        if (style.size === 1) {
            classes.push('border')
        } else {
            classes.push(`border-${style.size}`)
        }
    }

    // Add border style
    if (style.stroke && style.stroke !== 'solid') {
        classes.push(`border-${style.stroke}`)
    }

    // Add border position classes
    if (style.mode && style.mode.length > 0) {
        style.mode.forEach(mode => {
            if (mode !== 'all') {
                classes.push(`border-${mode}`)
            }
        })
    }

    // If visual variant is provided, try to get border color from it
    if (visualVariant && visualVariant.length > 0) {
        const borderRule = visualVariant.find(rule => rule.fov === 'border')
        if (borderRule) {
            // This would need to be mapped to actual color classes
            // For now, we'll use a generic approach
            classes.push(`border-current`)
        }
    }

    return classes.join(' ')
}
