import { NotifiableEntity } from '@core/managers/notification-manager/notification-manager'
import { CommandManager } from '../command-manager/command-manager'
import { FormatManager } from '../format-manager/format-manager'
import { HistoryManager } from '../history-manager/history-manager'
import { SelectionManager } from '../selection-manager/selection-manager'
import { cleanHtml } from './prototype/clean-html'
import { execute } from './prototype/execute'
import { getState } from './prototype/get-state'
import { handlePaste } from './prototype/handle-paste'
import { mouseDown } from './prototype/mouse-down'
import { mouseDownState } from './prototype/mouse-down-state'
import { mouseLeave } from './prototype/mouse-leave'
import { mouseMove } from './prototype/mouse-move'
import { mouseMoveState } from './prototype/mouse-move-state'
import { mouseUp } from './prototype/mouse-up'
import { normalizeHtml } from './prototype/normalize-html'
import { normalizeStructure } from './prototype/normalize-structure'
import { notifyStateChanges } from './prototype/notify-state-changes'
import { onExternalStateChanged } from './prototype/on-external-state-changed'
import { redo } from './prototype/redo'
import { resetEditor } from './prototype/reset-editor'
import { resetSelection } from './prototype/reset-selection'
import { sanitizeHtml } from './prototype/sanitize-html'
import { selectionChanged } from './prototype/selection-changed'
import { setState } from './prototype/set-state'
import { undo } from './prototype/undo'
import { wrapNodesInParagraph } from './prototype/wrap-nodes-in-paragraph'
import { IRtiEngine } from './rti-engine.types'

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
    resetEditor,
    handlePaste,
    onExternalStateChanged,
    normalizeStructure,
    wrapNodesInParagraph
})
