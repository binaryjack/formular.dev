import { IRtiEngine } from '../rti-engine/rti-engine.types'
import { captureSelection } from './prototype/capture-selection'
import { getAllNodesInRange } from './prototype/get-all-nodes-in-range'
import { getCurrentSelection } from './prototype/get-current-selection'
import { getLinkAtSelection } from './prototype/get-link-at-selection'
import { resetSelection } from './prototype/reset-selection'
import { restoreSelection } from './prototype/restore-selection'
import { ISelectionManager } from './selection-manager.types'

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
    getAllNodesInRange,
    getLinkAtSelection
})
