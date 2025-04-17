import { IRtiEngine } from '../rtiEngine.types'

export const mouseClick = function (this: IRtiEngine) {
    this.resetSelection?.()
}
