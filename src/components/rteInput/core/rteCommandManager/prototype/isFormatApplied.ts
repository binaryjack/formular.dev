import { tagMap } from '../../rteInput.types'
import { IRteCommandManager } from '../rteCommandManager.types'

// Add isFormatApplied method
export const isFormatApplied = function (this: IRteCommandManager, formatType: string): boolean {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return false

    const range = selection.getRangeAt(0)
    if (range.collapsed) return false

    // Get the common ancestor of the selection
    const container = range.commonAncestorContainer

    const tagName = tagMap[formatType]
    if (!tagName) return false

    // Check if the selection is inside the formatting element
    let parent: Node | null = container
    while (parent && parent !== this.editorElement) {
        const currentTagName = (parent as Element).tagName
        if (parent.nodeType === Node.ELEMENT_NODE && currentTagName === tagName) {
            this.notifyStateChanges()
            return true
        }
        parent = parent.parentNode
    }
    this.notifyStateChanges()
    return false
}
