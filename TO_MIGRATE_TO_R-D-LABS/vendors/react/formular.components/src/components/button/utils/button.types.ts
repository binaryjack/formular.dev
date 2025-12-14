import { ComponentSizeType } from 'formular.design.system'

export interface IButtonBaseSize {
    width: string
    height: string
    px: string
    my: string
}
export const buttonSizes: Record<string, IButtonBaseSize> = {
    '2xs': { width: '12em', height: '2.5em', px: 'p-0', my: 'm-0' },
    xs: { width: '10em', height: '2em', px: 'p-0', my: 'm-0' },
    sm: { width: '10em', height: '2em', px: 'p-0', my: 'm-0' },
    md: { width: '10em', height: '2em', px: 'p-0', my: 'm-0' },
    lg: { width: '10em', height: '2em', px: 'p-0', my: 'm-0' },
    xl: { width: '10em', height: '2em', px: 'p-0', my: 'm-0' },
    '2xl': { width: '10em', height: '2em', px: 'p-0', my: 'm-0' }
}

export const getButtonXYSizes = (size: ComponentSizeType) => {
    return buttonSizes[size]
}
