import { IRteCommandManager } from '../rteCommandManager.types'

export const notifyStateChanges = function (this: IRteCommandManager) {
    const state = this.getState()
    this.notify('formattingStateChanged', state)
}
