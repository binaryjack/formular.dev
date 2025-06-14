import { IRtiEngine } from '../rti-engine.types'

export const mouseMoveState = function (this: IRtiEngine, mouseMoving: boolean) {
    this.mouseState = { ...this.mouseState, move: mouseMoving }
    this.notifyStateChanges()
}
