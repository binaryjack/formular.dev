import { IRteEngine } from '../rteEngine.types'

export const redo = function (this: IRteEngine): boolean {
    const result = this.commandManager.redo()
    if (result) {
        // Refresh UI state
        this.commandManager.notifyStateChanges()
    }
    return result
}
