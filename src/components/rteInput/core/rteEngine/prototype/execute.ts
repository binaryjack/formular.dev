import { IRteCommand } from '../../rteInput.types'
import { IRteEngine } from '../rteEngine.types'

export const execute = function (this: IRteEngine, command: Omit<IRteCommand, 'timestamp'>) {
    this.commandManager.execute(command)
    this.commandManager.checkForAnyAppliedFormat()
}
