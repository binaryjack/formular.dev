import { IRtiEngine } from '../rtiEngine.types'

export const resetEditor = function (this: IRtiEngine) {
    this.editorElement.innerHTML = ''
}
