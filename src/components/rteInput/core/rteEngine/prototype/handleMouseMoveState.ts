import { IRteEngine } from '../rteEngine.types'

export const handleMouseMoveState = function (this: IRteEngine, mouseMoving: boolean) {
    this.mouseState = { ...this.mouseState, move: mouseMoving }
    this.commandManager.notifyStateChanges()
}
