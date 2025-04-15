import { IRteCommand } from '../../rteInput.types'
import { IRteCommandManager } from '../rteCommandManager.types'

export const execute = function (
    this: IRteCommandManager,
    command: Omit<IRteCommand, 'timestamp'>
): boolean {
    // Capture the current selection before doing anything
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return false

    try {
        // Check formats
        this.checkForAnyAppliedFormat()

        // Delay format checking until after command execution
        const wasFormatApplied = this.isFormatApplied(command.type)

        // Wait for a microtask to ensure DOM is updated

        if (wasFormatApplied) {
            // Remove format
            this.removeFormatting(command.type)
        } else {
            // Apply format
            this.applyCommand({ ...command, timestamp: Date.now() })
        }

        // Clean HTML structure - sanitize and normalize
        this.cleanHtml()

        // Only notify once after everything is done
        this.notifyStateChanges()

        return true
    } catch (error) {
        console.error('Failed to execute command:', error)
        return false
    }
}
