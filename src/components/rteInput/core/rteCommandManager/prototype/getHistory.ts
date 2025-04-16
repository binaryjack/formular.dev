import { IHistoryItem } from '../../rteInput.types'
import { IRteCommandManager } from '../rteCommandManager.types'

export const getHistory = function (this: IRteCommandManager): IHistoryItem[] {
    return [...this.history]
}
