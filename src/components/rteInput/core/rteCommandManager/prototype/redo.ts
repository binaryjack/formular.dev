import { IRteCommandManager } from '../rteCommandManager.types'

export const redo = function (this: IRteCommandManager): boolean {
    if (this.redoStack.length === 0) return false

    const command = this.redoStack.pop()!
    this.history.push(command)
    this.currentIndex++
    this.applyCommand(command)

    return true
}
