import { ISelection } from '../../rti-engine.types'
import { ISelectionManager } from '../selection-manager.types'

export const getCurrentSelection = function (this: ISelectionManager): ISelection | null {
    return this.currentSelection
}
