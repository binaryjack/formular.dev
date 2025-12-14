import { componentAnimations, ElementPositionType } from 'formular.design.system'
import { ToggleableStateType } from 'formular.dev.lib'

export const getAnimation = (toggleState: ToggleableStateType, position: ElementPositionType) => {
    const isOpen = toggleState === 'open'
    const pos = position

    switch (pos) {
        case 'top':
        case 'top-left':
        case 'top-right':
            return isOpen ? componentAnimations.drawer.enterTop : componentAnimations.drawer.exitTop
        case 'bottom':
        case 'bottom-left':
        case 'bottom-right':
            return isOpen
                ? componentAnimations.drawer.enterBottom
                : componentAnimations.drawer.exitBottom
        case 'left':
            return isOpen
                ? componentAnimations.drawer.enterLeft
                : componentAnimations.drawer.exitLeft
        case 'right':
            return isOpen
                ? componentAnimations.drawer.enterRight
                : componentAnimations.drawer.exitRight
        case 'center':
        default:
            return isOpen ? componentAnimations.drawer.enterTop : componentAnimations.drawer.exitTop
    }
}
