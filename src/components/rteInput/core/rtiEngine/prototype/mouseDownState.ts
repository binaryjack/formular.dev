import { formatDefinitionMap } from '../../rteInput.types'
import { IRtiEngine } from '../rtiEngine.types'

export const mouseDownState = function (this: IRtiEngine, mouseDown: boolean) {
    this.mouseState = { ...this.mouseState, down: mouseDown }

    if (this.mouseState.down && !this.mouseState.move) {
        this.selectionManager.resetSelection()
        this.formatManager.activeFormat = formatDefinitionMap
    }
    this.notifyStateChanges()
}
