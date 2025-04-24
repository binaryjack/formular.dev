import { IRteCommand } from '../../rti-engine.types'
import { ICommandManager } from '../command-manager.types'

export const execute = function (
    this: ICommandManager,
    command: Omit<IRteCommand, 'timestamp'>
): boolean {
    // Capture the current selection before doing anything
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return false

    try {
        // Check formats
        this.engine.formatManager.checkForAnyAppliedFormat()

        // Delay format checking until after command execution
        const wasFormatApplied = this.engine.formatManager.isFormatApplied(command.type)

        // CRITICAL: Save the current editor HTML state BEFORE making changes
        const previousState = JSON.stringify(this.editorElement.innerHTML)

        // Wait for a microtask to ensure DOM is updated

        if (wasFormatApplied) {
            // Remove format
            this.engine.formatManager.removeFormatting(command.type)
        } else {
            // Apply format
            this.applyCommand({ ...command, timestamp: Date.now() })
        }

        // Get the new state AFTER making changes
        const newState = JSON.stringify(this.editorElement.innerHTML)

        // Only record in history if the content actually changed
        if (previousState !== newState) {
            // Create history entry with both states for proper undo/redo
            this.engine.historyManager.addToHistory({
                commandType: command.type,
                timestamp: Date.now(),
                previousState: previousState,
                newState: newState
            })
        }

        // Clean HTML structure - sanitize and normalize
        this.engine.cleanHtml()

        // Only notify once after everything is done
        this.engine.notifyStateChanges()

        return true
    } catch (error) {
        console.error('Failed to execute command:', error)
        return false
    }
}
