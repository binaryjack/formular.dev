import { IRtiEngine } from '../rti-engine.types'

export const mouseMove = function (this: IRtiEngine) {
    if (!this.editorElement) {
        console.error('Cannot perform current action: Editor Element is null or not yet available')
        return
    }
    if (this.mouseState.down) {
        this.mouseMoveState(true)
    } else {
        this.mouseMoveState(false)
    }
}
