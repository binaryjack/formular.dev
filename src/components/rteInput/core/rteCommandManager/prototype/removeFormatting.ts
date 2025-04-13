import { tagMap } from '../../rteInput.types'
import { IRteCommandManager } from '../rteCommandManager.types'

// Add removeFormatting method
export const removeFormatting = function (this: IRteCommandManager, formatType: string) {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    if (range.collapsed) return

    const tagName = tagMap[formatType]
    if (!tagName) return

    // Create document fragment with the selection
    const fragment = range.extractContents()

    // Remove the formatting tags from the fragment
    this.unwrapFormatting(fragment, tagName)

    // Insert the clean fragment
    range.insertNode(fragment)

    // Update selection
    selection.removeAllRanges()
    selection.addRange(range)

    // Notify observers about the change
    this.notifyStateChanges()
}
