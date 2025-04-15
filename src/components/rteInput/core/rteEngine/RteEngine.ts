import { NotifiableEntity } from '../../../../core/notifiableEntity/NotifiableEntity'
import { RteCommandManager } from '../rteCommandManager/RteCommandManager'
import { SelectionManager } from '../selectionManager/SelectionManager'
import { execute } from './prototype/execute'
import { getState } from './prototype/getState'
import { mouseDown } from './prototype/mouseDown'
import { mouseDownState } from './prototype/mouseDownState'
import { mouseLeave } from './prototype/mouseLeave'
import { mouseMove } from './prototype/mouseMove'
import { mouseMoveState } from './prototype/mouseMoveState'
import { mouseUp } from './prototype/mouseUp'
import { notifyStateChanges } from './prototype/notifyStateChanges'
import { resetSelection } from './prototype/resetSelection'
import { selectionChanged } from './prototype/selectionChanged'
import { IRteEngine } from './rteEngine.types'

export const RteEngine = function (this: IRteEngine, editorElement: HTMLElement) {
    this.editorElement = editorElement
    this.commandManager = new RteCommandManager(this.editorElement)
    this.selectionManager = new SelectionManager(this.editorElement)
    this.isProcessingSelection = false
    NotifiableEntity.call(this)
} as any as IRteEngine

RteEngine.prototype = {
    ...NotifiableEntity.prototype
}

Object.assign(RteEngine.prototype, {
    selectionChanged,
    resetSelection,
    mouseMoveState,
    mouseDownState,
    mouseUp,
    mouseDown,
    mouseMove,
    mouseLeave,
    notifyStateChanges,
    getState,
    execute
})
