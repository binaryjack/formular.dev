import { IRteCommandManager } from '../rteCommandManager.types'

export const resetEditor = function (this: IRteCommandManager) {
    this.editorElement.innerHTML = ''
}
