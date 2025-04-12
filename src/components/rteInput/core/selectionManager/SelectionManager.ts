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
    const range = document.createRange()
    let container: Node | null = this.editorElement

    // This is simplified - in a real implementation you'd need to find
    // the correct text node by traversing the DOM
    if (container.firstChild) {
        range.setStart(container.firstChild, selection.start)
        range.setEnd(container.firstChild, selection.end)

        const windowSelection = window.getSelection()
        if (windowSelection) {
            windowSelection.removeAllRanges()
            windowSelection.addRange(range)
        }
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
