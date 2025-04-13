import { ISelection } from '../../rteInput.types'
import { ISelectionManager } from '../selectionManager.types'

export const getCurrentSelection = function (this: ISelectionManager): ISelection | null {
    return this.currentSelection
}
