import { IRteEngine } from '../rteEngine.types'

export const resetSelection = function (this: IRteEngine, event?: MouseEvent) {
    // Get the current selection first
    const selection = window.getSelection()

    // If we're not in selection mode, don't continue
    if (this.selectionManager.mouseState.down && this.selectionManager.mouseState.move) {
        this.commandManager.notifyStateChanges()
        return
    }

    // If nothing is selected, no need to reset
    if (!selection || selection.isCollapsed) {
        this.commandManager.notifyStateChanges()
        return
    }
    // this.commandManager.activeFormat = formatDefinitionMap

    // this.commandManager.checkForAnyAppliedFormat()
    // If we have a selection and user clicked, reset it FIRST
    if (event?.target && this.editorElement.contains(event.target as Node)) {
        console.log('CLICKED', 'reseting selection')
        this.selectionManager.resetSelection()

        // Notify changes immediately
        this.commandManager.notifyStateChanges()
    }
}
