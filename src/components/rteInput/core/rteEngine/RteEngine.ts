import { RteCommandManager } from '../rteCommandManager/RteCommandManager'
import { SelectionManager } from '../selectionManager/SelectionManager'
import { execute } from './prototype/execute'
import { handleMouseDownState } from './prototype/handleMouseDownState'
import { handleMouseMoveState } from './prototype/handleMouseMoveState'
import { handleResetSelection } from './prototype/handleResetSelection'
import { handleSelectionChanged } from './prototype/handleSelectionChanged'
import { IRteEngine } from './rteEngine.types'

export const RteEngine = function (this: IRteEngine, editorElement: HTMLElement) {
    this.editorElement = editorElement
    this.commandManager = new RteCommandManager(this.editorElement)
    this.selectionManager = new SelectionManager(this.editorElement)
    this.mouseState = { move: false, down: false }
} as any as IRteEngine

Object.assign(RteEngine.prototype, {
    handleSelectionChanged,
    handleResetSelection,
    handleMouseMoveState,
    handleMouseDownState,
    execute
})
