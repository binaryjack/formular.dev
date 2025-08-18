import type { IDrawerAnimationController } from '../drawer-animation-controller.types'

export const setupCSSFallback = function (this: IDrawerAnimationController): void {
    // Add CSS class for fallback animation using custom properties

    this.element.classList.add(
        this.drawerType === 'dropdown' ? 'drawer-controllable' : 'expandable-controllable'
    )

    // For expandable drawers, measure and set content height
    if (this.drawerType === 'expandable') {
        // Measure content height using the same approach as WAAPI setup
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
    }

    // Initialize the animation progress CSS custom property
    this.element.style.setProperty('--animation-progress', '0')
}
