/**
 * Design System Mapper for Button Component
 *
 * Maps formular.components button properties to design system classes
 */
import { AppBreakPointSizesType, VariantNameType } from '../../../style/global.types'

/**
 * Maps variant names to design system button classes
 */
export const mapVariantToDesignSystem = (variant: VariantNameType): string => {
    const variantMap = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'btn-danger',
        success: 'btn-success',
        warning: 'btn-warning',
        info: 'btn-info'
    }

    return variantMap[variant] ?? 'btn-primary'
}

/**
 * Maps size to design system button size classes
 */
export const mapSizeToDesignSystem = (size: AppBreakPointSizesType): string => {
    const sizeMap: Record<AppBreakPointSizesType, string> = {
        '2xs': 'btn-size-xs',
        xs: 'btn-size-xs',
        sm: 'btn-size-sm',
        md: 'btn-size-md',
        lg: 'btn-size-lg',
        xl: 'btn-size-xl',
        '2xl': 'btn-size-xl'
    }

    return sizeMap[size] ?? 'btn-size-sm'
}

/**
 * Maps ripple variant to design system ripple colors
 */
export const mapRippleToDesignSystem = (variant: VariantNameType): string => {
    const rippleMap = {
        primary: 'bg-primary-200',
        secondary: 'bg-secondary-200',
        danger: 'bg-danger-200',
        success: 'bg-success-200',
        warning: 'bg-warning-200',
        info: 'bg-info-200'
    }

    return rippleMap[variant] ?? 'bg-primary-200'
}

/**
 * Gets the base button classes from design system
 */
export const getBaseButtonClasses = (): string => {
    return 'btn-base'
}

/**
 * Gets disabled state classes from design system
 */
export const getDisabledClasses = (): string => {
    return 'state-disabled'
}

/**
 * Gets loading state classes from design system
 */
export const getLoadingClasses = (): string => {
    return 'state-loading'
}
