import { IRteCommand } from '../../rteInput.types'
import { IRteCommandManager } from '../rteCommandManager.types'

export const getHistory = function (this: IRteCommandManager): IRteCommand[] {
    return [...this.history]
}
