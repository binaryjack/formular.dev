import type { IDrawerAnimationController } from '../drawer-animation-controller.types'

export const animateToProgressAsync = function (
    this: IDrawerAnimationController,
    targetPercentage: number,
    duration: number = 300
): Promise<void> {
    return new Promise((resolve) => {
        const startProgress = this.currentProgress
        const startTime = performance.now()

        // Clamp target percentage
        const clampedTarget = Math.max(0, Math.min(100, targetPercentage))

        const animate = (currentTime: number): void => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Smooth easing function (ease-out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            const currentValue = startProgress + (clampedTarget - startProgress) * easeOut

            // Update progress using setProgress method
            this.setProgress(currentValue)

            if (progress < 1) {
                requestAnimationFrame(animate)
            } else {
                resolve()
            }
        }

        requestAnimationFrame(animate)
    })
}
