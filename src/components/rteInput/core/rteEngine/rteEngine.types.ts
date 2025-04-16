import { INotifiableEntity } from '../../../../core/notifiableEntity/notifiableEntityBase.types'
import { IRteCommandManager } from '../rteCommandManager/rteCommandManager.types'
import { IEngineState, IRteCommand } from '../rteInput.types'
import { ISelectionManager } from '../selectionManager/selectionManager.types'

export type IRteEngine = IRteEngineBase & INotifiableEntity

export interface IRteEngineBase {
    new (editorElement: HTMLElement): IRteEngine
    editorElement: HTMLElement
    commandManager: IRteCommandManager
    selectionManager: ISelectionManager
    isProcessingSelection: boolean
    execute: (command: Omit<IRteCommand, 'timestamp'>) => boolean
    selectionChanged: () => void
    resetSelection: (event?: MouseEvent) => void

    /** handle  mouse state */
    mouseMoveState: (mouseMoving: boolean) => void
    mouseDownState: (mouseDown: boolean) => void

    /** public hanchors */
    mouseLeave: () => void
    mouseMove: () => void
    mouseDown: () => void
    mouseUp: (event?: MouseEvent) => void
    mouseClick: () => void

    undo(): boolean
    redo(): boolean

    /** setup */
    setup: () => void
    addListeners: () => void
    removeListeners: () => void
    /** Get current state */
    getState: () => IEngineState
    /** notifiers */
    notifyStateChanges: () => void
    notifyStateChangesAll: () => void
}
