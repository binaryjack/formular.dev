import { INotificationManager } from 'formular.dev.lib'
import { ICommandManager } from '../command-manager/command-manager.types'
import { IFormatManager } from '../format-manager/format-manager.types'
import { IHistoryManager } from '../history-manager/history-manager.types'
import { IEngineState, IMouseState, IRteCommand } from '../rti-engine.types'
import { ISelectionManager } from '../selection-manager/selection-manager.types'

export type IRtiEngine = IRtiEngineBase & INotificationManager

export interface IRtiEngineBase {
    new (editorElement: HTMLElement): IRtiEngine
    editorElement: HTMLElement

    /** dependencies */
    commandManager: ICommandManager
    selectionManager: ISelectionManager
    historyManager: IHistoryManager
    formatManager: IFormatManager

    /** State */

    lastContent: string | null
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
    setState: (state: string | null) => void
    onExternalStateChanged: (htmlContent: string | null) => void
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

    handlePaste: (clipboard: DataTransfer) => void

    /** cleaners */

    normalizeStructure: () => void
    wrapNodesInParagraph: (nodes: Node[]) => void

    normalizeHtml: () => void
    sanitizeHtml: () => void
    sanitizeNode: () => void
    cleanHtml: () => void
    resetEditor: () => void
}
