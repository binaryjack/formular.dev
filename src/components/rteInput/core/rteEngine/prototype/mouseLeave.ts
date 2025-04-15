import { IRteEngine } from '../rteEngine.types'

export const mouseLeave = function (this: IRteEngine) {
    if (!this.editorElement) {
        console.error('Cannot perform current action: Editor Element is null or not yet available')
        return
    }
    this.mouseDownState(false)
    this.mouseMoveState(false)
    this.notifyStateChanges()
    this.commandManager.checkForAnyAppliedFormat()
    this.commandManager.notifyStateChanges()
}
