import { IRteEngine } from '../rteEngine.types'

export const undo = function (this: IRteEngine): boolean {
    const result = this.commandManager.undo()
    if (result) {
        // Refresh UI state
        this.commandManager.notifyStateChanges()
    }
    return result
}
