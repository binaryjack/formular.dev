import { IRteCommand } from '../../rteInput.types'
import { IRtiEngine } from '../rtiEngine.types'

export const execute = function (this: IRtiEngine, command: Omit<IRteCommand, 'timestamp'>) {
    this.commandManager.execute(command)
    this.formatManager.checkForAnyAppliedFormat()
}
