import {
    ComponentSizeType,
    ComponentVariantType,
    TextCaseType,
    TextWeightType
} from 'formular.design.system'

export interface IButtonOptions {
    variant: ComponentVariantType
    size: ComponentSizeType
    textCase: TextCaseType
    weight: TextWeightType
    rounded: boolean
    width: string
    height: string
    className: string
}

export interface IButtonProps extends Partial<React.ComponentClass<'button'>> {
    id: string
    title: string
    children?: React.ReactNode | string
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    loading?: boolean
    icon?: React.ReactNode
    disabled?: boolean
    isToggle?: boolean
    tabindex?: number
    options?: {
        variant: ComponentVariantType
        size: ComponentSizeType
        textCase: TextCaseType
        weight: TextWeightType
        rounded: boolean
        width: string
        height: string
        className: string
    }
}
