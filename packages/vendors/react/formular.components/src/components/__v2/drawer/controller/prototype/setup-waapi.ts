import type { IDrawerAnimationController } from '../drawer-animation-controller.types'

export const setupWAAPI = function (this: IDrawerAnimationController): void {
    if (this.drawerType === 'expandable') {
        // For expandable drawers, we need to dynamically measure content height
        // First, temporarily show the element to measure its natural height
        const originalHeight = this.element.style.height
        const originalVisibility = this.element.style.visibility
        const originalPosition = this.element.style.position

        // Temporarily make it visible but off-screen to measure
        this.element.style.visibility = 'hidden'
        this.element.style.position = 'absolute'
        this.element.style.height = 'auto'
        this.element.style.maxHeight = 'none'

        // Measure the natural content height
        const contentHeight = this.element.scrollHeight

        // Restore original styles
        this.element.style.height = originalHeight
        this.element.style.visibility = originalVisibility
        this.element.style.position = originalPosition

        // Set the CSS custom property for content height
        this.element.style.setProperty('--content-height', `${contentHeight}px`)

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
    } else {
        // Create WAAPI animation with defined keyframes
        this.animation = this.element.animate(
            [
                {
                    transform: 'scaleY(0)',
                    opacity: 0,
                    offset: 0
                },
                {
                    transform: 'scaleY(0.5)',
                    opacity: 0.7,
                    offset: 0.5
                },
                {
                    transform: 'scaleY(1)',
                    opacity: 1,
                    offset: 1
                }
            ],
            {
                duration: 1000,
                fill: 'both',
                easing: 'ease-out'
            }
        )
    }
    // Pause the animation so we can control it manually
    this.animation?.pause()

    // Add class to indicate WAAPI support
    this.element.classList.add('waapi-supported')
}
