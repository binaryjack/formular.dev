import { ContrastType } from '@/types/enums/contrast-enum'
import { VisualVariantType } from '@/types/enums/visual-variant-enum'
import { AppModeType } from '@/types/types/app-mode-type.type'
import { CONTRASTS, IContrast } from '../presets/contrast-rules'

export const contrastResolver = (
    mode: AppModeType,
    visualVariant: VisualVariantType,
    contrast: ContrastType
): IContrast => {
    let output: IContrast = {
        background: 50,
        border: 50,
        text: 50
    }
    const contrastRuleMode = CONTRASTS[mode]
    if (!contrastRuleMode) {
        console.warn('No appmode in CONTRASTS records')
        return output
    }
    const contrastRule = contrastRuleMode[visualVariant]
    if (!contrastRule) {
        console.warn('No visualVariant in CONTRASTS RULES records')
        return output
    }
    const contrasts = contrastRule.find(o => o.contrast === contrast)
    if (!contrasts) {
        console.warn('No contrasts in CONTRASTS RULES records')
        return output
    }
    return {
        ...contrasts
    }
}
