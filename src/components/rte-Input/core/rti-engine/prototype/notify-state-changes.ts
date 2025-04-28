import { IRtiEngine } from '../rti-engine.types'

export const notifyStateChanges = function (this: IRtiEngine) {
    const state = this.getState()
    this.notify('onEngineStateChanger', state)
}
