import { DrawerType } from '../types/drawer.types'

export interface IDrawerAnimationController {
    new (element: HTMLElement, drawerType: DrawerType): IDrawerAnimationController
    drawerType: DrawerType
    element: HTMLElement
    supportsWAAPI: boolean
    animation?: Animation
    currentProgress: number
    setupWAAPI: () => void
    setupCSSFallback: () => void
    setProgress: (percentage: number) => void
    animateToProgressAsync: (targetPercentage: number, duration?: number) => Promise<void>
    updateContentHeight: () => void
    open: () => Promise<void>
    close: () => Promise<void>
}
