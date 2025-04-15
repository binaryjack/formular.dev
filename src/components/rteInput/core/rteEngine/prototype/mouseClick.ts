import { IRteEngine } from '../rteEngine.types'

export const mouseClick = function (this: IRteEngine) {
    this.resetSelection?.()
}
