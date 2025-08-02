export interface IDrawerAnimationController {
    new (element: HTMLElement): IDrawerAnimationController
    element: HTMLElement
    supportsWAAPI: boolean
    animation?: Animation
    currentProgress: number
    setupWAAPI: () => void
    setupCSSFallback: () => void
    setProgress: (percentage: number) => void
    animateToProgressAsync: (targetPercentage: number, duration?: number) => Promise<void>
    open: () => Promise<void>
    close: () => Promise<void>
}
