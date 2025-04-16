import { IHistoryItem } from '../../rteInput.types'
import { IRteCommandManager } from '../rteCommandManager.types'

// src/components/rteInput/core/rteCommandManager/prototype/addToHistory.ts
export const addToHistory = function (this: IRteCommandManager, state: IHistoryItem): void {
    // When adding a new history item, clear the redo stack
    this.redoStack = []

    // Add the new item to history
    this.history.push(state)

    // Keep history size reasonable (optional)
    if (this.history.length > 30) {
        this.history.shift()
    }
}
