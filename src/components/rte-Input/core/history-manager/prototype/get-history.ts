import { IHistoryItem } from '../../rti-engine.types'
import { IHistoryManager } from '../history-manager.types'

export const getHistory = function (this: IHistoryManager): IHistoryItem[] {
    return [...this.history]
}
