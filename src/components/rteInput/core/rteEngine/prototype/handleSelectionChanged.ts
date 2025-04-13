import { IRteEngine } from '../rteEngine.types'

export const handleSelectionChanged = function (this: IRteEngine) {
    const currentSelection = this.selectionManager.captureSelection()

    // Then check formatting for each format type
    this.commandManager.checkIfSelectionHasAppliedFormats()

    if (!currentSelection) {
        this.mouseState = { move: false, down: false }
        return
    }
    // Only process if the selection is within our editor
    console.log('SELECTED :', currentSelection.text, currentSelection)

    this.mouseState = { move: false, down: false }
    this.commandManager.notifyStateChanges()
}
