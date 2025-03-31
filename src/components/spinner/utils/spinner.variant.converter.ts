import {
    AppBreakPointSizesType,
    getCorrespondingVariantColors,
    VariantNameType
} from '../../../style/global.types'

export interface ISpinnerVariantProperties {
    width: number
    height: number
    frameWidth: number
    frameHeight: number
    strokeWidth: number
    strokeColor: string
    activeColor: string
}

const spinnerSizes: Record<string, number> = {
    '2xs': 8,
    xs: 12,
    sm: 15,
    md: 18,
    lg: 19,
    xl: 22,
    '2xl': 30
}

const spinnerFrameSizes: Record<string, number> = {
    '2xs': 42,
    xs: 42,
    sm: 42,
    md: 48,
    lg: 48,
    xl: 48,
    '2xl': 48
}

const spinnerStrokeSizes: Record<string, number> = {
    '2xs': 3,
    xs: 3,
    sm: 3,
    md: 6,
    lg: 6,
    xl: 6,
    '2xl': 6
}

export const spinnerSizeConverter = (size: AppBreakPointSizesType) => {
    return spinnerSizes[size]
}

export const spinnerFrameSizeConverter = (size: AppBreakPointSizesType) => {
    return spinnerFrameSizes[size]
}

export const spinnerStrokeSizeConverter = (size: AppBreakPointSizesType) => {
    return spinnerStrokeSizes[size]
}

export const getSpinnerVariant = (
    variantSize: AppBreakPointSizesType,
    variantName: VariantNameType
) => {
    const color = getCorrespondingVariantColors(variantName)
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
