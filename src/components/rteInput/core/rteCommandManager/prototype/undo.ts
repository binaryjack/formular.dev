import { IRteCommandManager } from '../rteCommandManager.types'

export const undo = function (this: IRteCommandManager): boolean {
    if (this.currentIndex < 0) return false

    const command = this.history[this.currentIndex]
    this.redoStack.push(command)
    this.currentIndex--

    // Reapply all commands up to currentIndex
    this.resetEditor()
    for (let i = 0; i <= this.currentIndex; i++) {
        this.applyCommand(this.history[i])
    }

    return true
}
