import { FormatsArray } from '../../rteInput.types'
import { IRteEngine } from '../rteEngine.types'

export const handleResetSelection = function (this: IRteEngine, currentTarget: HTMLElement) {
    // Then check formatting for each format type
    FormatsArray.forEach((format) => {
        this.commandManager.isFormatApplied(format)
    })

    if (this.mouseState.down && this.mouseState.move) return

    // If we clicked directly on the editor container (not on text)
    // This checks if the click target is the div itself, not a text node
    if (currentTarget !== this.editorElement) return
    console.log('CLICKED', 'reseting selection')
    // Clear any existing selection
    this.selectionManager.resetSelection()
    this.commandManager.notifyStateChanges()
}
