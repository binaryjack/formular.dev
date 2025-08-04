import type { IDrawerAnimationController } from '../drawer-animation-controller.types'

export const setupWAAPI = function (this: IDrawerAnimationController): void {
    if (this.drawerType === 'expandable') {
        // Measure content height for expandable drawers
        const contentHeight = this.element.scrollHeight
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
