/**
 * Generic Component Styles - Legacy Compatibility Layer
 *
 * This file provides backward compatibility for the old generic component styles API.
 * New projects should use the V2 system from generics-v2/.
 *
 * @deprecated Use the V2 system instead: import { genericStyle } from 'formular.design.system'
 */

import type { ComponentSizeType, ComponentVariantType } from '../types'
import type { IComponentState } from '../types/interfaces'
import { getColor } from './index'
import type { ExtendedVisualVariantType } from './types/extended-visual-variant-type.type'

// Legacy type definitions for backward compatibility
export type ComponentType =
    | 'button'
    | 'input'
    | 'card'
    | 'accordion'
    | 'modal'
    | 'badge'
    | 'chip'
    | 'typography'

export interface IGenericComponentVariants {
    variant?: ComponentVariantType
    size?: ComponentSizeType
    visualVariant?: ExtendedVisualVariantType
    state?: IComponentState
    rounded?: boolean
    width?: string
    height?: string
    className?: string
}

// Re-export the extended visual variant type
export type { ExtendedVisualVariantType }

// Legacy stub implementations for backward compatibility
export const colorUtils = {
    getComponentColorVar: (variant: string, shade: string = '500') =>
        `var(--color-${variant}-${shade})`,
    generateColorVariables: () => ({}),
    // Legacy getColor function for backward compatibility
    getColor: (variant: ComponentVariantType, shade: number = 500): string => {
        return getColor(variant, shade.toString()) || ''
    }
}

export const generateValidationStyles = (validationType: string | boolean = false) => {
    if (typeof validationType === 'string') {
        switch (validationType) {
            case 'error':
                return 'border-red-500 text-red-500'
            case 'info':
                return 'border-blue-500 text-blue-500'
            case 'success':
                return 'border-green-500 text-green-500'
            case 'warning':
                return 'border-yellow-500 text-yellow-500'
            default:
                return ''
        }
    }
    // Legacy boolean support
    return validationType ? 'border-red-500 text-red-500' : ''
}
