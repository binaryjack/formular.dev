import { IEngineState } from '../../rteInput.types'
import { IRtiEngine } from '../rtiEngine.types'

export const setState = function (this: IRtiEngine, state: IEngineState) {
    if (!state) {
        return
    }
    this.editorElement.innerHTML = state.html
}
