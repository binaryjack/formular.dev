import { IRtiEngine } from '../rti-engine.types'

export const mouseClick = function (this: IRtiEngine) {
    this.resetSelection?.()
}
