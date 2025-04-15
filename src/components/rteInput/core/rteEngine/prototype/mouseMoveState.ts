import { IRteEngine } from '../rteEngine.types'

export const mouseMoveState = function (this: IRteEngine, mouseMoving: boolean) {
    this.selectionManager.mouseState = { ...this.selectionManager.mouseState, move: mouseMoving }
    this.commandManager.notifyStateChanges()
}
