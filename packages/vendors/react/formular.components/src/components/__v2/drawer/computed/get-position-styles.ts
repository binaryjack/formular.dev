import { ElementPositionType } from 'formular.design.system'
import { ToggleableStateType } from 'formular.dev.lib'
import { IDrawerSize } from '../drawer.types'
import { getAnimation } from './get-animation'

export const getPositionStyles = (
    toggleState: ToggleableStateType,
    size: IDrawerSize,
    drawerHolderRef: React.RefObject<HTMLDivElement>,
    calculatedPosition: ElementPositionType
) => {
    const baseStyles = {
        width: size.width,
        height: size.height,
        position: 'absolute' as const,
        animation: getAnimation(toggleState, calculatedPosition),
        zIndex: 10
    }

    const ownerRect = drawerHolderRef.current?.getBoundingClientRect()
    if (!ownerRect) return baseStyles

    switch (calculatedPosition) {
        case 'top':
            return {
                ...baseStyles,
                bottom: `calc(100% + 8px)`,
                left: 0
            }
        case 'top-left':
            return {
                ...baseStyles,
                bottom: `calc(100% + 8px)`,
                right: 0
            }
        case 'top-right':
            return {
                ...baseStyles,
                bottom: `calc(100% + 8px)`,
                left: 0
            }
        case 'bottom':
            return {
                ...baseStyles,
                top: `calc(100% + 8px)`,
                left: 0
            }
        case 'bottom-left':
            return {
                ...baseStyles,
                top: `calc(100% + 8px)`,
                right: 0
            }
        case 'bottom-right':
            return {
                ...baseStyles,
                top: `calc(100% + 8px)`,
                left: 0
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
