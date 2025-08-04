import type { IDrawerAnimationController } from '../drawer-animation-controller.types'

export const setupCSSFallback = function (this: IDrawerAnimationController): void {
    // Add CSS class for fallback animation using custom properties

    this.element.classList.add(
        this.drawerType === 'dropdown' ? 'drawer-controllable' : 'expandable-controllable'
    )

    // Initialize the animation progress CSS custom property
    this.element.style.setProperty('--animation-progress', '0')
}
