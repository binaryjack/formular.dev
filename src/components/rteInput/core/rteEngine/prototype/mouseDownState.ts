import { formatDefinitionMap } from '../../rteInput.types'
import { IRteEngine } from '../rteEngine.types'

export const mouseDownState = function (this: IRteEngine, mouseDown: boolean) {
    this.selectionManager.mouseState = { ...this.selectionManager.mouseState, down: mouseDown }

    if (this.selectionManager.mouseState.down && !this.selectionManager.mouseState.move) {
        this.selectionManager.resetSelection()
        this.commandManager.activeFormat = formatDefinitionMap
    }
    this.commandManager.notifyStateChanges()
}
