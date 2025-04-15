import { IRteEngine } from '../rteEngine.types'

export const selectionChanged = function (this: IRteEngine) {
    if (this.isProcessingSelection) return
    this.isProcessingSelection = true

    try {
        // Capture selection first, with no delay
        const currentSelection = this.selectionManager.captureSelection()
        if (!currentSelection) {
            this.isProcessingSelection = false
            return
        }

        // Then check formatting with a small delay to ensure DOM stability
        setTimeout(() => {
            try {
                // Check formats based on the captured selection
                this.commandManager.checkForAnyAppliedFormat()

                // Always notify state changes
                this.commandManager.notifyStateChanges()
            } finally {
                this.isProcessingSelection = false
            }
        }, 10)
    } catch (e) {
        console.error('Error handling selection:', e)
        this.isProcessingSelection = false
    }
}
