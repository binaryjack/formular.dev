import { getFirstTextNode } from '../../helpers/getFirstTextNode'
import { IHistoryManager } from '../hystoryManager.types'

export const redo = function (this: IHistoryManager): boolean {
    // Check if we have anything to redo
    if (this.redoStack.length === 0) {
        console.log('Nothing to redo')
        return false
    }

    try {
        // Get the last redo item
        const redoItem = this.redoStack.pop()
        if (!redoItem) return false

        // Add back to history
        this.history.push(redoItem)

        // Save current selection
        const selection = window.getSelection()
        let savedRange = null
        if (selection && selection.rangeCount > 0) {
            savedRange = selection.getRangeAt(0).cloneRange()
        }

        // Set the editor content to the redo state
        this.editorElement.innerHTML = JSON.parse(redoItem.newState)

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
                console.warn('Could not restore selection after redo', e)
            }
        }

        // Check format state after the change
        this.engine.formatManager.checkForAnyAppliedFormat()

        // Notify observers
        this.engine.notifyStateChanges()

        return true
    } catch (error) {
        console.error('Failed to redo:', error)
        return false
    }
}
