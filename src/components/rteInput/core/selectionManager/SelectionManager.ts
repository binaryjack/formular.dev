import { captureSelection } from './prototype/captureSelection'
import { getCurrentSelection } from './prototype/getCurrentSelection'
import { resetSelection } from './prototype/resetSelection'
import { restoreSelection } from './prototype/restoreSelection'
import { ISelectionManager } from './selectionManager.types'

export const SelectionManager = function (this: ISelectionManager, editorElement: HTMLElement) {
    this.editorElement = editorElement
    this.currentSelection = null
    this.mouseState = { move: false, down: false }
} as any as ISelectionManager

// SelectionManager.prototype = {

// }

Object.assign(SelectionManager.prototype, {
    captureSelection,
    restoreSelection,
    getCurrentSelection,
    resetSelection
})
