import { IRtiEngine } from '../rtiEngine.types'

export const undo = function (this: IRtiEngine): boolean {
    const result = this.historyManager.undo()
    if (result) {
        // Refresh UI state
        this.notifyStateChanges()
    }
    return result
}
