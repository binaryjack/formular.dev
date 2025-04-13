import { ISelection } from '../../rteInput.types'
import { ISelectionManager } from '../selectionManager.types'

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
