import { IRtiEngine } from '../rti-engine.types'

export const resetEditor = function (this: IRtiEngine) {
    this.editorElement.innerHTML = ''
}
