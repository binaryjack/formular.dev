import { ComponentSizeType, ComponentVariantType } from 'formular.design.system'

export interface ISpinnerOverriders {
    mainSize?: number
    frameSize?: number
    strokeSize?: number
    strokeOpacity?: number
    strokeColor?: string
    activeColor?: string
}

export interface ISpinnerProps extends ISpinnerOverriders, Partial<React.ComponentClass<'span'>> {
    size?: ComponentSizeType
    color?: ComponentVariantType
    className?: string
    overriders?: ISpinnerOverriders
}
