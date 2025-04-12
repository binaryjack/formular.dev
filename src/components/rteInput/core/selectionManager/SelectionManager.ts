import { ISelection } from '../rteInput.types'
import { ISelectionManager } from './selectionManager.types'

export const SelectionManager = function (this: ISelectionManager, editorElement: HTMLElement) {
    this.editorElement = editorElement
    this.currentSelection = null
} as any as ISelectionManager

export const captureSelection = function (this: ISelectionManager): ISelection | null {
    const selection = window.getSelection()
    if (!selection || !this.editorElement || selection.rangeCount === 0) return null

    const range = selection.getRangeAt(0)
    if (
        !this.editorElement.contains(range.commonAncestorContainer) ||
        !this.editorElement.contains(range.startContainer) ||
        !this.editorElement.contains(range.endContainer)
    )
        return null

    this.currentSelection = {
        text: selection.toString(),
        start: range.startOffset,
        end: range.endOffset,
        isCollapsed: selection.isCollapsed
    }

    return this.currentSelection
}

export const restoreSelection = function (this: ISelectionManager, selection: ISelection) {
    // Do not restore any empty selections
    if (!selection || selection.isCollapsed) {
        this.resetSelection()
        return null
    }

    // Need to find the exact text nodes that match the selection position
    const range = document.createRange()
    const nodeIterator = document.createNodeIterator(
        this.editorElement,
        NodeFilter.SHOW_TEXT,
        // Retrieve only the text nodes!
        null
    )

    let currentNode: Node | null
    let charCount = 0
    let startContainer: Node | null = null
    let endContainer: Node | null = null
    let startOffset = 0
    let endOffset = 0

    // walk through all text nodes to find our selection points
    while ((currentNode = nodeIterator.nextNode())) {
        const textNode = currentNode as Text
        const textLength = textNode.length

        // check if this node contains the start position
        if (startContainer === null && charCount + textLength >= selection.start) {
            startContainer = textNode
            startOffset = selection.start - charCount
        }

        // check if this node contains the end position
        if (endContainer === null && charCount + textLength >= selection.end) {
            endContainer = textNode
            endOffset = selection.end - charCount
            break
        }
        charCount += textLength
    }

    //if we found valid containers, create and set the range
    if (startContainer && endContainer) {
        range.setStart(startContainer, startOffset)
        range.setEnd(endContainer, endOffset)

        const windowSelection = window.getSelection()
        if (windowSelection) {
            windowSelection.removeAllRanges()
            windowSelection.addRange(range)
        }

        // we now will update the current selection
        this.currentSelection = {
            text: windowSelection?.toString() ?? '',
            start: selection.start,
            end: selection.end,
            isCollapsed: windowSelection?.isCollapsed ?? false
        }
    } else {
        console.warn('could not restore the selection - text nodes not found')
    }
}

export const getCurrentSelection = function (this: ISelectionManager): ISelection | null {
    return this.currentSelection
}

export const resetSelection = function (this: ISelectionManager) {
    const selection = window.getSelection()

    if (selection === null || selection?.rangeCount === 0) return

    this.currentSelection = null
    if (selection) selection.removeAllRanges()
}
// SelectionManager.prototype = {

// }

Object.assign(SelectionManager.prototype, {
    captureSelection,
    restoreSelection,
    getCurrentSelection,
    resetSelection
})
