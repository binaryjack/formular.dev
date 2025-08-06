import { ComponentVariantType } from '../types'

export const rippleColors = (variant: ComponentVariantType) => {
    switch (variant) {
        case 'info':
            return 'rgba(255, 255, 255, 0.8)'
        case 'primary':
            return 'rgba(255, 255, 255, 0.7)'
        case 'secondary':
            return 'rgba(0, 0, 0, 0.1)'
        case 'danger':
            return 'rgba(255, 200, 0, 0.6)'
        case 'success':
            return 'rgba(0, 255, 0, 0.2)'
        case 'warning':
            return 'rgba(0, 0, 0, 0.6)'
        default:
            return 'rgba(255, 255, 255, 0.8)'
    }
}
