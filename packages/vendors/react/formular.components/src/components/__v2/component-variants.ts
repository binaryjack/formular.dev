import {
    ComponentSizeType,
    ComponentVariantType,
    TextCaseType,
    TextWeightType
} from 'formular.design.system'

export interface IComponentVariants {
    variant: ComponentVariantType
    size: ComponentSizeType
    textCase: TextCaseType
    weight: TextWeightType
    rounded: boolean
    width: string
    height: string
    className: string
}
