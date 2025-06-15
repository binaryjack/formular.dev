import { colorsCorrecpondance } from './colors-correspondance'
import { VariantNameType } from './types/variant-name.type'

export const getCorrespondingVariantColors = (variant: VariantNameType) =>
    colorsCorrecpondance[variant]
