import { IRtiEngine } from '../rtiEngine.types'

export const mouseLeave = function (this: IRtiEngine) {
    if (!this.editorElement) {
        console.error('Cannot perform current action: Editor Element is null or not yet available')
        return
    }
    this.mouseDownState(false)
    this.mouseMoveState(false)
    this.notifyStateChanges()
    this.formatManager.checkForAnyAppliedFormat()
    this.notifyStateChanges()
}
