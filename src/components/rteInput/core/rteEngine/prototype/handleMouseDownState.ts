import { IRteEngine } from '../rteEngine.types'

export const handleMouseDownState = function (this: IRteEngine, mouseDown: boolean) {
    this.mouseState = { ...this.mouseState, down: mouseDown }
    this.commandManager.notifyStateChanges()
}
