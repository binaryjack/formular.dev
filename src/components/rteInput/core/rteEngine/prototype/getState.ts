import { IEngineState } from '../../rteInput.types'
import { IRteEngine } from '../rteEngine.types'

export const getState = function (this: IRteEngine): IEngineState {
    return {
        mouseState: this.selectionManager.mouseState
    }
}
