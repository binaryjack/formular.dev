import { IRtiEngine } from '../rtiEngine.types'

export const notifyStateChanges = function (this: IRtiEngine) {
    const state = this.getState()
    this.notify('engineStateChanged', state)
}
