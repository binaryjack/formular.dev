import { IHistoryItem } from '../../rteInput.types'
import { IHistoryManager } from '../hystoryManager.types'

export const getHistory = function (this: IHistoryManager): IHistoryItem[] {
    return [...this.history]
}
