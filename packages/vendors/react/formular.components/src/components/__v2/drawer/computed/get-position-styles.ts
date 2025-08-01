import { ElementPositionType } from 'formular.design.system'
import { IDrawerSize } from '../drawer.types'

export const getPositionStyles = (size: IDrawerSize, calculatedPosition: ElementPositionType) => {
    const baseStyles = {
        width: size.width,
        height: size.height,
        zIndex: 9999
    }

    switch (calculatedPosition) {
        case 'top':
        case 'top-right':
            return {
                ...baseStyles,
                transformOrigin: 'bottom',
                bottom: `calc(100% + 8px)`,
                left: 0
            }
        case 'top-left':
            return {
                ...baseStyles,
                transformOrigin: 'bottom',
                bottom: `calc(100% + 8px)`,
                right: 0
            }
        case 'bottom':
        case 'bottom-right':
            return {
                ...baseStyles,
                transformOrigin: 'top',
                top: `calc(100% + 8px)`,
                left: 0
            }
        case 'bottom-left':
            return {
                ...baseStyles,
                transformOrigin: 'top',
                top: `calc(100% + 8px)`,
                right: 0
            }
        case 'left':
            return {
                ...baseStyles,
                right: `calc(100% + 8px)`,
                top: 0
            }
        case 'right':
            return {
                ...baseStyles,
                left: `calc(100% + 8px)`,
                top: 0
            }
        case 'center':
        default:
            return {
                ...baseStyles,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }
    }
}
