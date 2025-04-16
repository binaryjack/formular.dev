import { getFirstTextNode } from '../../helpers/getFirstTextNode'
import { IRteCommandManager } from '../rteCommandManager.types'

export const undo = function (this: IRteCommandManager): boolean {
    // Check if we have history to undo
    if (this.history.length === 0) {
        console.log('Nothing to undo')
        return false
    }

    try {
        // Get the last history item
        const lastItem = this.history.pop()
        if (!lastItem) return false

        // Add to redo stack
        this.redoStack.push(lastItem)

        // Save current selection
        const selection = window.getSelection()
        let savedRange = null
        if (selection && selection.rangeCount > 0) {
            savedRange = selection.getRangeAt(0).cloneRange()
        }

        // Set the editor content back to the previous state
        this.editorElement.innerHTML = JSON.parse(lastItem.previousState)

        // Try to restore selection
        if (savedRange) {
            try {
                // Try to adjust the range based on the new DOM
                const newRange = document.createRange()
                const firstTextNode = getFirstTextNode(this.editorElement)

                if (firstTextNode) {
                    // Place cursor at a reasonable position as fallback
                    newRange.setStart(firstTextNode, 0)
                    newRange.setEnd(firstTextNode, 0)

                    selection?.removeAllRanges()
                    selection?.addRange(newRange)
                }
            } catch (e) {
                console.warn('Could not restore selection after undo', e)
            }
        }

        // Check format state after the change
        this.checkForAnyAppliedFormat()

        // Notify observers
        this.notifyStateChanges()

        return true
    } catch (error) {
        console.error('Failed to undo:', error)
        return false
    }
}
