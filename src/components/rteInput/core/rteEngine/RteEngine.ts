import { RteCommandManager } from '../rteCommandManager/RteCommandManager'
import { IRteCommand } from '../rteInput.types'
import { SelectionManager } from '../selectionManager/SelectionManager'
import { IRteEngine } from './rteEngine.types'

export const RteEngine = function (this: IRteEngine, editorElement: HTMLElement) {
    this.editorElement = editorElement
    this.commandManager = new RteCommandManager(this.editorElement)
    this.selectionManager = new SelectionManager(this.editorElement)
    this.mouseState = { move: false, down: false }
} as any as IRteEngine

export const handleSelectionChanged = function (this: IRteEngine) {
    const currentSelection = this.selectionManager.captureSelection()
    if (!currentSelection) {
        this.mouseState = { move: false, down: false }
        return
    }
    // Only process if the selection is within our editor
    console.log('SELECTED :', currentSelection.text, currentSelection)
    this.mouseState = { move: false, down: false }
    this.commandManager.notifyStateChanges()
}

export const handleResetSelection = function (this: IRteEngine, currentTarget: HTMLElement) {
    if (this.mouseState.down && this.mouseState.move) return
    // If we clicked directly on the editor container (not on text)
    // This checks if the click target is the div itself, not a text node
    if (currentTarget !== this.editorElement) return
    console.log('CLICKED', 'reseting selection')
    // Clear any existing selection
    this.selectionManager.resetSelection()
    this.commandManager.notifyStateChanges()
}

export const handleMouseMoveState = function (this: IRteEngine, mouseMoving: boolean) {
    this.mouseState = { ...this.mouseState, move: mouseMoving }
    this.commandManager.notifyStateChanges()
}

export const handleMouseDownState = function (this: IRteEngine, mouseDown: boolean) {
    this.mouseState = { ...this.mouseState, down: mouseDown }
    this.commandManager.notifyStateChanges()
}

export const execute = function (this: IRteEngine, command: Omit<IRteCommand, 'timestamp'>) {
    this.commandManager.execute(command)
}

Object.assign(RteEngine.prototype, {
    handleSelectionChanged,
    handleResetSelection,
    handleMouseMoveState,
    handleMouseDownState,
    execute
})
