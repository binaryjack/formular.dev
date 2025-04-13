import { FormatsArray, IRteCommand } from '../../rteInput.types'
import { IRteCommandManager } from '../rteCommandManager.types'

export const execute = function (
    this: IRteCommandManager,
    command: Omit<IRteCommand, 'timestamp'>
): boolean {
    const fullCommand = {
        ...command,
        timestamp: Date.now()
    }

    try {
        // For formatting commands, check if we should toggle instead of apply
        if (FormatsArray.includes(command.type)) {
            // If formatting already exists, remove it instead
            if (this.isFormatApplied(command.type)) {
                this.removeFormatting(command.type)
                this.notifyStateChanges() // Make sure to notify here
                return true
            }
        }

        this.applyCommand(fullCommand)

        // Add to history and clear redo stack
        this.history = [...this.history.slice(0, this.currentIndex + 1), fullCommand]
        this.currentIndex = this.history.length - 1
        this.redoStack = []

        return true
    } catch (error) {
        console.error('Failed to execute command:', error)
        return false
    }
}
