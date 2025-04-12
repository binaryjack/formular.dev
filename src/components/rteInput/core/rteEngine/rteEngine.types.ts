import { IRteCommandManager } from '../rteCommandManager/rteCommandManager.types'
import { ISelectionManager } from '../selectionManager/selectionManager.types'

export interface IMouseState {
    move: boolean
    down: boolean
}

export interface IRteEngine {
    new (editorElement: HTMLElement): IRteEngine
    editorElement: HTMLElement
    commandManager: IRteCommandManager
    selectionManager: ISelectionManager
    mouseState: IMouseState
    handleSelectionChanged: () => void
    handleResetSelection: (currentTarget: HTMLElement) => void
    handleMouseMoveState: (mouseMoving: boolean) => void
    handleMouseDownState: (mouseDown: boolean) => void
}
