import { IRtiEngine } from '../rtiEngine.types'

export const mouseMoveState = function (this: IRtiEngine, mouseMoving: boolean) {
    this.mouseState = { ...this.mouseState, move: mouseMoving }
    this.notifyStateChanges()
}
