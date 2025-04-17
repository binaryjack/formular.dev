import { NotifiableEntity } from '../../../../core/notifiableEntity/NotifiableEntity'
import { CommandManager } from '../commandManager/CommandManager'
import { FormatManager } from '../formatManager/FormatManager'
import { HistoryManager } from '../historyManager/HistoryManager'
import { SelectionManager } from '../selectionManager/SelectionManager'
import { cleanHtml } from './prototype/cleanHtml'
import { execute } from './prototype/execute'
import { getState } from './prototype/getState'
import { mouseDown } from './prototype/mouseDown'
import { mouseDownState } from './prototype/mouseDownState'
import { mouseLeave } from './prototype/mouseLeave'
import { mouseMove } from './prototype/mouseMove'
import { mouseMoveState } from './prototype/mouseMoveState'
import { mouseUp } from './prototype/mouseUp'
import { normalizeHtml } from './prototype/normalizeHtml'
import { notifyStateChanges } from './prototype/notifyStateChanges'
import { redo } from './prototype/redo'
import { resetEditor } from './prototype/resetEditor'
import { resetSelection } from './prototype/resetSelection'
import { sanitizeHtml } from './prototype/sanitizeHtml'
import { selectionChanged } from './prototype/selectionChanged'
import { setState } from './prototype/setState'
import { undo } from './prototype/undo'
import { IRtiEngine } from './rtiEngine.types'

/**
 *
 * engine =>
 *          commands =>
 *                      format
 *          history
 *          format
 *          selection
 *
 */

export const RtiEngine = function (this: IRtiEngine, editorElement: HTMLElement) {
    this.editorElement = editorElement

    this.commandManager = new CommandManager(this.editorElement, this)
    this.selectionManager = new SelectionManager(this.editorElement, this)
    this.historyManager = new HistoryManager(this.editorElement, this)
    this.formatManager = new FormatManager(this.editorElement, this)

    this.mouseState = { move: false, down: false }
    this.lastContent = ''
    NotifiableEntity.call(this)
} as any as IRtiEngine

RtiEngine.prototype = {
    ...NotifiableEntity.prototype
}

Object.assign(RtiEngine.prototype, {
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
    setState,
    execute,
    undo,
    redo,
    normalizeHtml,
    sanitizeHtml,
    cleanHtml,
    resetEditor
})
