import { formatDefinitionMap, TagsArray } from '../../rteInput.types'
import { IRteCommandManager } from '../rteCommandManager.types'

export const checkIfSelectionHasAppliedFormats = function (this: IRteCommandManager) {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return false

    const range = selection.getRangeAt(0)
    if (range.collapsed) {
        this.activeFormat = formatDefinitionMap
        // this.notifyStateChanges()
        return
    }

    // Get the common ancestor of the selection
    const container = range.commonAncestorContainer

    // Check if the selection is inside the formatting element
    let parent: Node | null = container

    while (parent && parent !== this.editorElement) {
        const currentTagName = (parent as Element).tagName
        if (!currentTagName || !TagsArray.includes(currentTagName)) {
            parent = parent.parentNode
            continue
        }
        this.activeFormat.forEach((fd) => {
            const isApplied =
                (parent &&
                    parent.nodeType === Node.ELEMENT_NODE &&
                    fd.tagName === currentTagName) ??
                false

            this.updateActiveFormat(fd.tagName, isApplied)
        })
        parent = parent.parentNode
    }
    this.notifyStateChanges()
}
