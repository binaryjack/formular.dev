import { IRteCommand } from '../../rti-engine.types'
import { IRtiEngine } from '../rti-engine.types'

export const execute = function (this: IRtiEngine, command: Omit<IRteCommand, 'timestamp'>) {
    this.commandManager.execute(command)
    this.formatManager.checkForAnyAppliedFormat()
}
