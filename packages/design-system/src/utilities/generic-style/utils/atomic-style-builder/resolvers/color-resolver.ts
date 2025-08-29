import { ContrastType } from '@/types/enums/contrast-enum'
import { VariantType } from '@/types/enums/variants-enum'
import { VisualVariantType } from '@/types/enums/visual-variant-enum'
import { AppModeType } from '@/types/types/app-mode-type.type'
import { contrastResolver } from './contrast-resolver'

export interface IColors {
    backgroundColor: string
    textColor: string
    borderColor: string
}

export const colorResolver = (
    mode: AppModeType,
    variant: VariantType,
    visualVariant: VisualVariantType,
    contrast: ContrastType,
    colorInversion?: boolean
): IColors => {
    const contrasts = contrastResolver(mode, visualVariant, contrast)

    const output: IColors = {
        backgroundColor: `bg-${variant}-${colorInversion ? contrasts.text : contrasts.background}`,
        textColor: `text-${variant}-${colorInversion ? contrasts.background : contrasts.text}`,
        borderColor: `border-${variant}-${contrasts.border}`
    }
    return output
}
