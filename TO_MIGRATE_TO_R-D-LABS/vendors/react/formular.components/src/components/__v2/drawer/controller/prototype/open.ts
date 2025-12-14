import type { IDrawerAnimationController } from '../drawer-animation-controller.types'

export const open = function (this: IDrawerAnimationController): Promise<void> {
    return this.animateToProgressAsync(100, 150)
}
