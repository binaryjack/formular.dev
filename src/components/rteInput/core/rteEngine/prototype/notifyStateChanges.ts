import { IRteEngine } from '../rteEngine.types'

export const notifyStateChanges = function (this: IRteEngine) {
    const state = this.getState()
    this.notify('engineStateChanged', state)
}
