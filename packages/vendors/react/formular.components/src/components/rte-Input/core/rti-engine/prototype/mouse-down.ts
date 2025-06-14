import { IRtiEngine } from '../rti-engine.types'

export const mouseDown = function (this: IRtiEngine) {
    if (!this.editorElement) {
        console.error('Cannot perform current action: Editor Element is null or not yet available')
        return
    }
    this.mouseDownState?.(true)
}
