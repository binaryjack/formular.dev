/**
 * Generic Component Styles - Legacy Compatibility Layer
 *
 * This file provides backward compatibility for the old generic component styles API.
 * New projects should use the new generic-style system.
 *
 * @deprecated Use the new generic-style system instead: import { genericStyle } from 'formular.design.system'
 */

import { IStates } from '@/types/interfaces/i-states'
import type { ComponentSizeType } from '../types'

import { VariantType } from '@/types/enums/variants-enum'
import { getColor } from './index'
import type { ExtendedVisualVariantType } from './types/extended-visual-variant-type.type'

export interface IGenericComponentVariants {
    variant?: VariantType
    size?: ComponentSizeType
    visualVariant?: ExtendedVisualVariantType
    state?: IStates
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
    getColor: (variant: VariantType, shade: number = 500): string => {
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
