import { IRtiEngine } from '../rtiEngine/rtiEngine.types'
import { captureSelection } from './prototype/captureSelection'
import { getAllNodesInRange } from './prototype/getAllNodesInRange'
import { getCurrentSelection } from './prototype/getCurrentSelection'
import { resetSelection } from './prototype/resetSelection'
import { restoreSelection } from './prototype/restoreSelection'
import { ISelectionManager } from './selectionManager.types'

export const SelectionManager = function (
    this: ISelectionManager,
    editorElement: HTMLElement,
    engine: IRtiEngine
) {
    this.editorElement = editorElement
    this.engine = engine
    this.currentSelection = null
    this.isProcessingSelection = false
} as any as ISelectionManager

Object.assign(SelectionManager.prototype, {
    captureSelection,
    restoreSelection,
    getCurrentSelection,
    resetSelection,
    getAllNodesInRange
})
