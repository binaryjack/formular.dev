import { AppBreakPointSizesType } from '../types/app-break-point-sizes.type'
import { TextCaseType } from '../types/text-case.type'
import { TextWeightType } from '../types/text-weight.type'
import { VariantNameType } from '../types/variant-name.type'

export interface IButtonVariant {
    variant: VariantNameType
    size: AppBreakPointSizesType
    textCase: TextCaseType
    weight: TextWeightType
    rounded: boolean
    width: string
    height: string
    className: string
}
