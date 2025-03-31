import {
    AppBreakPointSizesType,
    getCorrespondingVariantColors,
    VariantNameType
} from '../../../style/global.types'

export interface ISpinnerVariantProperties {
    width: number
    height: number
    strokeWidth: number
    strokeColor: string
    activeColor: string
}

const spinnerSizes: Record<string, number> = {
    '2xs': 9,
    xs: 10,
    sm: 17,
    md: 17,
    lg: 17,
    xl: 17,
    '2xl': 17
}

const spinnerStrokeSizes: Record<string, number> = {
    '2xs': 2,
    xs: 3,
    sm: 3,
    md: 4,
    lg: 4,
    xl: 5,
    '2xl': 6
}

export const spinnerSizeConverter = (size: AppBreakPointSizesType) => {
    return spinnerSizes[size]
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
        strokeWidth: spinnerStrokeSizeConverter(variantSize),
        strokeColor: color.bg,
        activeColor: color.fg
    } as ISpinnerVariantProperties
}
