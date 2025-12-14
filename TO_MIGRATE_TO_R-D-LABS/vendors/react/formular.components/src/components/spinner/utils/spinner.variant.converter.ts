import { ComponentSizeType, ComponentVariantType } from 'formular.design.system'

export interface ISpinnerVariantProperties {
    width: number
    height: number
    frameWidth: number
    frameHeight: number
    strokeWidth: number
    strokeColor: string
    activeColor: string
}

const spinnerSizes: Record<ComponentSizeType, number> = {
    '2xs': 8,
    xs: 12,
    sm: 15,
    md: 18,
    lg: 19,
    xl: 22,
    '2xl': 30
}

const spinnerFrameSizes: Record<ComponentSizeType, number> = {
    '2xs': 42,
    xs: 42,
    sm: 42,
    md: 48,
    lg: 48,
    xl: 48,
    '2xl': 48
}

const spinnerStrokeSizes: Record<ComponentSizeType, number> = {
    '2xs': 3,
    xs: 3,
    sm: 3,
    md: 6,
    lg: 6,
    xl: 6,
    '2xl': 6
}

export const spinnerSizeConverter = (size: ComponentSizeType) => {
    return spinnerSizes[size]
}

export const spinnerFrameSizeConverter = (size: ComponentSizeType) => {
    return spinnerFrameSizes[size]
}

export const spinnerStrokeSizeConverter = (size: ComponentSizeType) => {
    return spinnerStrokeSizes[size]
}

// Simple color mapping for spinner variants (replaces legacy colorsCorrecpondance)
const getSpinnerColors = (variant: ComponentVariantType) => {
    const colorMap: Record<ComponentVariantType, { bg: string; fg: string }> = {
        primary: { bg: '#3b82f6', fg: '#ffffff' },
        secondary: { bg: '#6b7280', fg: '#f3f4f6' },
        success: { bg: '#10b981', fg: '#ffffff' },
        warning: { bg: '#f59e0b', fg: '#ffffff' },
        danger: { bg: '#ef4444', fg: '#ffffff' },
        info: { bg: '#06b6d4', fg: '#ffffff' },
        neutral: { bg: '#9ca3af', fg: '#ffffff' }
    }
    return colorMap[variant]
}

export const getSpinnerVariant = (
    variantSize: ComponentSizeType,
    variantName: ComponentVariantType
) => {
    const color = getSpinnerColors(variantName)
    return {
        width: spinnerSizeConverter(variantSize),
        height: spinnerSizeConverter(variantSize),
        frameWidth: spinnerFrameSizeConverter(variantSize),
        frameHeight: spinnerFrameSizeConverter(variantSize),
        strokeWidth: spinnerStrokeSizeConverter(variantSize),
        strokeColor: color.bg,
        activeColor: color.fg
    } as ISpinnerVariantProperties
}
