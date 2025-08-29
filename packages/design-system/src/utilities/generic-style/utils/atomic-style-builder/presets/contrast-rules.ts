import { ColorShade } from '@/tokens'
import { ContrastType } from '@/types/enums/contrast-enum'
import { VisualVariantType } from '@/types/enums/visual-variant-enum'

import { AppModeType } from '@/types/types/app-mode-type.type'

export interface IContrast {
    background: ColorShade
    text: ColorShade
    border: ColorShade
}

export interface IContrastRule extends IContrast {
    contrast: ContrastType
}
export type ContrastRulesType = Record<VisualVariantType, IContrastRule[]>

export const CONTRAST_RULE_DARK: Record<VisualVariantType, IContrastRule[]> = {
    solid: [
        { contrast: 'low', background: 600, border: 600, text: 400 },
        { contrast: 'medium', background: 800, border: 800, text: 300 },
        { contrast: 'high', background: 900, border: 900, text: 50 }
    ],
    link: [
        { contrast: 'low', background: 600, border: 600, text: 400 },
        { contrast: 'medium', background: 800, border: 800, text: 300 },
        { contrast: 'high', background: 900, border: 900, text: 50 }
    ],
    outline: [
        { contrast: 'low', background: 600, border: 400, text: 400 },
        { contrast: 'medium', background: 800, border: 300, text: 300 },
        { contrast: 'high', background: 900, border: 50, text: 50 }
    ],
    ghost: [
        { contrast: 'low', background: 800, border: 800, text: 700 },
        { contrast: 'medium', background: 700, border: 700, text: 500 },
        { contrast: 'high', background: 600, border: 600, text: 400 }
    ],
    elevated: [
        { contrast: 'low', background: 800, border: 500, text: 700 },
        { contrast: 'medium', background: 700, border: 400, text: 500 },
        { contrast: 'high', background: 600, border: 100, text: 400 }
    ],
    outlined: [
        { contrast: 'low', background: 600, border: 400, text: 400 },
        { contrast: 'medium', background: 800, border: 300, text: 300 },
        { contrast: 'high', background: 900, border: 50, text: 50 }
    ]
}

export const CONTRAST_RULE_LIGHT: Record<VisualVariantType, IContrastRule[]> = {
    solid: [
        { contrast: 'low', background: 50, border: 600, text: 600 },
        { contrast: 'medium', background: 50, border: 800, text: 800 },
        { contrast: 'high', background: 50, border: 900, text: 900 }
    ],
    link: [
        { contrast: 'low', background: 200, border: 400, text: 400 },
        { contrast: 'medium', background: 200, border: 600, text: 600 },
        { contrast: 'high', background: 200, border: 900, text: 900 }
    ],
    outline: [
        { contrast: 'low', background: 50, border: 400, text: 400 },
        { contrast: 'medium', background: 50, border: 600, text: 600 },
        { contrast: 'high', background: 50, border: 900, text: 900 }
    ],
    ghost: [
        { contrast: 'low', background: 50, border: 50, text: 100 },
        { contrast: 'medium', background: 50, border: 50, text: 200 },
        { contrast: 'high', background: 50, border: 50, text: 300 }
    ],
    elevated: [
        { contrast: 'low', background: 50, border: 500, text: 700 },
        { contrast: 'medium', background: 50, border: 400, text: 500 },
        { contrast: 'high', background: 50, border: 100, text: 400 }
    ],
    outlined: [
        { contrast: 'low', background: 50, border: 400, text: 400 },
        { contrast: 'medium', background: 50, border: 300, text: 300 },
        { contrast: 'high', background: 50, border: 50, text: 50 }
    ]
}

export const CONTRASTS: Record<AppModeType, ContrastRulesType> = {
    dark: CONTRAST_RULE_DARK,
    light: CONTRAST_RULE_LIGHT
}
