import type { IDrawerAnimationController } from '../drawer-animation-controller.types'

export const close = function (this: IDrawerAnimationController): Promise<void> {
    return this.animateToProgressAsync(0, 150)
}
