import { ScreenBreakPointType } from '../screen.types'

const correlatedSizes: Record<string, string> = {
    '2xs': 'xxs',
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
    '2xl': 'xxl'
}

export const sizeConverter = (size: ScreenBreakPointType) => {
    return correlatedSizes[size]
}
