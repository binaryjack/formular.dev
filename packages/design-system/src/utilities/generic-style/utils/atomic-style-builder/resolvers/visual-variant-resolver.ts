import { ComponentsTypes } from '@/types/enums/components-enum'
import { ContrastType } from '@/types/enums/contrast-enum'
import { VariantType } from '@/types/enums/variants-enum'
import { VisualVariantType } from '@/types/enums/visual-variant-enum'
import { AppModeType } from '@/utilities/generic-style/types'

export const visualVariantResolver = (
    component: ComponentsTypes,
    variant: VariantType,
    visualVariant: VisualVariantType,
    mode: AppModeType,
    contrast: ContrastType = 'medium'
) => {
    // Map visual variants to existing CSS class naming conventions

    if (component === 'button') {
        // Button specific mapping to existing btn-{variant}-{shade} classes
        switch (visualVariant) {
            case 'solid':
                return `btn-${variant}-500` // Solid buttons use 500 shade
            case 'outline':
            case 'outlined':
                return `btn-${variant}-0` // Outline buttons use 0 shade (transparent background)
            case 'ghost':
                return `btn-${variant}-50` // Ghost buttons use 50 shade (light background)
            case 'link':
                return `btn-${variant}-0` // Link style uses outline approach
            case 'elevated':
                return `btn-${variant}-500` // Elevated uses solid approach
            default:
                return `btn-${variant}-500`
        }
    }

    // For other components, use smart contrast classes when available
    switch (visualVariant) {
        case 'solid':
            return `surface-variant-${variant} text-on-variant-${variant}`
        case 'outline':
        case 'outlined':
            return `border-variant-${variant} text-variant-${variant}`
        case 'ghost':
            return `bg-${variant}-50 text-${variant}-600`
        case 'elevated':
            return `surface-variant-${variant} text-on-variant-${variant} shadow-md`
        default:
            return `surface-variant-${variant} text-on-variant-${variant}`
    }
}
