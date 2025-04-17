import { INotifiableEntity } from '../../../../core/notifiableEntity/notifiableEntityBase.types'
import { ICommandManager } from '../commandManager/commandManager.types'
import { IFormatManager } from '../formatManager/formatManager.types'
import { IHistoryManager } from '../historyManager/hystoryManager.types'
import { IEngineState, IMouseState, IRteCommand } from '../rteInput.types'
import { ISelectionManager } from '../selectionManager/selectionManager.types'

export type IRtiEngine = IRtiEngineBase & INotifiableEntity

export interface IRtiEngineBase {
    new (editorElement: HTMLElement): IRtiEngine
    editorElement: HTMLElement

    /** dependencies */
    commandManager: ICommandManager
    selectionManager: ISelectionManager
    historyManager: IHistoryManager
    formatManager: IFormatManager

    /** State */
    lastContent: string
    mouseState: IMouseState
    /**command helper */
    execute: (command: Omit<IRteCommand, 'timestamp'>) => boolean

    /** selection helpers */
    selectionChanged: () => void
    resetSelection: (event?: MouseEvent) => void

    /**  state */
    mouseMoveState: (mouseMoving: boolean) => void
    mouseDownState: (mouseDown: boolean) => void
    /** setup */
    setup: () => void
    addListeners: () => void
    removeListeners: () => void
    /** Get current state */
    getState: () => IEngineState
    setState: (state: IEngineState) => void
    /** notifiers */
    notifyStateChanges: () => void
    notifyStateChangesAll: () => void

    /** history helper */
    undo(): boolean
    redo(): boolean

    /** public hanchors */
    mouseLeave: () => void
    mouseMove: () => void
    mouseDown: () => void
    mouseUp: (event?: MouseEvent) => void
    mouseClick: () => void

    /** cleaners */
    normalizeHtml: () => void
    sanitizeHtml: () => void
    sanitizeNode: () => void
    cleanHtml: () => void
    resetEditor: () => void
}
