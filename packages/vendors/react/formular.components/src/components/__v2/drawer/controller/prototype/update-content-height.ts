import type { IDrawerAnimationController } from '../drawer-animation-controller.types'

export const updateContentHeight = function (this: IDrawerAnimationController): void {
    if (this.drawerType !== 'expandable') return

    // Temporarily show the element to measure its natural height
    const originalHeight = this.element.style.height
    const originalMaxHeight = this.element.style.maxHeight
    const originalVisibility = this.element.style.visibility
    const originalPosition = this.element.style.position
    const originalOpacity = this.element.style.opacity

    // Temporarily make it visible but off-screen to measure
    this.element.style.visibility = 'hidden'
    this.element.style.position = 'absolute'
    this.element.style.height = 'auto'
    this.element.style.maxHeight = 'none'
    this.element.style.opacity = '1'

    // Measure the natural content height
    const contentHeight = this.element.scrollHeight

    // Restore original styles
    this.element.style.height = originalHeight
    this.element.style.maxHeight = originalMaxHeight
    this.element.style.visibility = originalVisibility
    this.element.style.position = originalPosition
    this.element.style.opacity = originalOpacity

    // Update the CSS custom property for content height (used by both WAAPI and CSS fallback)
    this.element.style.setProperty('--content-height', `${contentHeight}px`)

    // If WAAPI is supported, recreate the animation with new height
    if (this.supportsWAAPI && this.animation) {
        const currentProgress = this.currentProgress

        // Cancel existing animation
        this.animation.cancel()

        // Create new animation with updated content height
        this.animation = this.element.animate(
            [
                { maxHeight: '0px', opacity: 0, overflow: 'hidden' },
                { maxHeight: `${contentHeight}px`, opacity: 0.7, overflow: 'hidden' },
                { maxHeight: `${contentHeight}px`, opacity: 1, overflow: 'visible' }
            ],
            {
                duration: 300,
                easing: 'ease-in-out',
                fill: 'both'
            }
        )

        // Pause and set to current progress
        this.animation.pause()
        this.setProgress(currentProgress)
    }
    // For CSS fallback, the --content-height custom property is automatically used
}
