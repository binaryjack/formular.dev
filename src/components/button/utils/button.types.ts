import { AppBreakPointSizesType } from '../../../style/global.types'

export interface IButtonBaseSize {
    width: string
    height: string
    px: string
    my: string
}
export const buttonSizes: Record<string, IButtonBaseSize> = {
    '2xs': { width: 'auto', height: '10px', px: 'p-[3px]', my: 'm-[3px]' },
    xs: { width: 'auto', height: '12px', px: 'p-[3px]', my: 'm-[3px]' },
    sm: { width: 'auto', height: '15px', px: 'p-[3px]', my: 'm-[3px]' },
    md: { width: 'auto', height: '20px', px: 'p-[3px]', my: 'm-[3px]' },
    lg: { width: 'auto', height: '23px', px: 'p-[3px]', my: 'm-[3px]' },
    xl: { width: 'auto', height: '26px', px: 'p-[3px]', my: 'm-[3px]' },
    '2xl': { width: 'auto', height: '30px', px: 'p-[3px]', my: 'm-[3px]' }
}

export const getButtonXYSizes = (size: AppBreakPointSizesType) => {
    return buttonSizes[size]
}
