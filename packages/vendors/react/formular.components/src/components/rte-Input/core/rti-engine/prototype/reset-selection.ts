import { IRtiEngine } from '../rti-engine.types'

export const resetSelection = function (this: IRtiEngine, event?: MouseEvent) {
    // Get the current selection first
    const selection = window.getSelection()

    // If we're not in selection mode, don't continue
    if (this.mouseState.down && this.mouseState.move) {
        this.notifyStateChanges()
        return
    }

    // If nothing is selected, no need to reset
    if (!selection || selection.isCollapsed) {
        this.notifyStateChanges()
        return
    }
    // this.commandManager.activeFormat = formatDefinitionMap

    // this.commandManager.checkForAnyAppliedFormat()
    // If we have a selection and user clicked, reset it FIRST
    if (event?.target && this.editorElement.contains(event.target as Node)) {
        console.log('CLICKED', 'reseting selection')
        this.selectionManager.resetSelection()

        // Notify changes immediately
        this.notifyStateChanges()
    }
}
