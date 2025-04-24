import { IRtiEngine } from '../rti-engine.types'

export const removeListeners = function (this: IRtiEngine) {
    if (!this.editorElement) {
        console.error('Cannot remove eventListeners the reference object is not anymore available')
        return
    }
    this.editorElement.removeEventListener('click', this.mouseClick)
    this.editorElement.removeEventListener('mouseup', this.mouseUp)
    this.editorElement.removeEventListener('mousedown', this.mouseDown)
    this.editorElement.removeEventListener('mousemove', this.mouseMove)
    this.editorElement.removeEventListener('mouseleave', this.mouseLeave)
}
