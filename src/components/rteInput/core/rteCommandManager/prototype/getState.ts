import { IEditorState } from '../../rteInput.types'
import { IRteCommandManager } from '../rteCommandManager.types'

export const getState = function (this: IRteCommandManager): IEditorState {
    const selection = window.getSelection()
    let selectionState = null

    if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        if (this.editorElement.contains(range.commonAncestorContainer)) {
            selectionState = {
                text: selection.toString(),
                start: range.startOffset,
                end: range.endOffset,
                isCollapsed: selection.isCollapsed
            }
        }
    }

    return {
        html: this.editorElement.innerHTML,
        text: this.editorElement.textContent ?? '',
        content: this.editorElement.innerText,
        selection: selectionState,
        historyLength: this.history.length,
        canUndo: this.currentIndex >= 0,
        canRedo: this.redoStack.length > 0,
        activeFormatState: this.activeFormat
    }
}
