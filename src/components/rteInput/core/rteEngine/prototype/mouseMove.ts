import { IRteEngine } from '../rteEngine.types'

export const mouseMove = function (this: IRteEngine) {
    if (!this.editorElement) {
        console.error('Cannot perform current action: Editor Element is null or not yet available')
        return
    }
    if (this.selectionManager.mouseState.down) {
        this.mouseMoveState(true)
    } else {
        this.mouseMoveState(false)
    }
}
