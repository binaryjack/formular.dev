import { defaultExtendsEventObject } from '@core/framework/events/default-extends-event-object'
import { IEngineState } from '../../rti-engine.types'
import { IRtiEngine } from '../rti-engine.types'

export const getState = function (this: IRtiEngine): IEngineState {
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
        historyLength: this.historyManager.history.length,
        canUndo: this.historyManager.currentIndex >= 0,
        canRedo: this.historyManager.redoStack.length > 0,
        activeFormatState: this.formatManager.activeFormat,
        mouseState: this.mouseState,
        ...defaultExtendsEventObject
    }
}
