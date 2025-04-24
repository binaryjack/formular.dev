import { IRtiEngine } from '../rti-engine.types'

export const selectionChanged = function (this: IRtiEngine) {
    if (this.selectionManager.isProcessingSelection) return
    this.selectionManager.isProcessingSelection = true

    try {
        // Capture selection first, with no delay
        const currentSelection = this.selectionManager.captureSelection()
        if (!currentSelection) {
            this.selectionManager.isProcessingSelection = false
            return
        }

        // Then check formatting with a small delay to ensure DOM stability
        setTimeout(() => {
            try {
                // Check formats based on the captured selection
                this.formatManager.checkForAnyAppliedFormat()

                // Always notify state changes
                this.notifyStateChanges()
            } finally {
                this.selectionManager.isProcessingSelection = false
            }
        }, 10)
    } catch (e) {
        console.error('Error handling selection:', e)
        this.selectionManager.isProcessingSelection = false
    }
}
