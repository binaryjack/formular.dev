import { IRtiEngine } from '../rti-engine.types'

export const redo = function (this: IRtiEngine): boolean {
    const result = this.historyManager.redo()
    if (result) {
        // Refresh UI state
        this.notifyStateChanges()
    }
    return result
}
