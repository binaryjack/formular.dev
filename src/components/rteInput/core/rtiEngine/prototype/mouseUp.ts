import { IRtiEngine } from '../rtiEngine.types'

export const mouseUp = function (this: IRtiEngine, event?: MouseEvent) {
    if (!this.editorElement) {
        console.error('Cannot perform current action: Editor Element is null or not yet available')
        return
    }

    const selection = window.getSelection()
    if (selection && !selection.isCollapsed) {
        this.resetSelection(event)
    }

    this.mouseMoveState(false)
    this.mouseDownState(false)
    this.formatManager.checkForAnyAppliedFormat()
}
