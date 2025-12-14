import type { IDrawerAnimationController } from '../drawer-animation-controller.types'

export const setProgress = function (this: IDrawerAnimationController, percentage: number): void {
    // Clamp percentage between 0 and 100
    const progress = Math.max(0, Math.min(100, percentage))
    this.currentProgress = progress

    if (this.supportsWAAPI && this.animation) {
        // Use Web Animations API for precise control
        this.animation.currentTime = (progress / 100) * 1000 // 1000ms duration
    } else {
        // Fallback to CSS custom properties
        this.element.style.setProperty('--animation-progress', (progress / 100).toString())
    }
}
