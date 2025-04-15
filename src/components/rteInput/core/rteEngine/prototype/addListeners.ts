import { IRteEngine } from '../rteEngine.types'

export const addListeners = function (this: IRteEngine) {
    if (!this.editorElement) {
        console.error('Cannot register eventListeners the reference object is not yet available')
        return
    }

    this.editorElement.addEventListener('click', this.mouseClick)
    this.editorElement.addEventListener('mouseup', this.mouseUp)
    this.editorElement.addEventListener('mousedown', this.mouseDown)
    this.editorElement.addEventListener('mousemove', this.mouseMove)
    this.editorElement.addEventListener('mouseleave', this.mouseLeave)
}
