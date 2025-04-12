import { NotifiableEntity } from '../../../../core/notifiableEntity/NotifiableEntity'
import { IEditorState, IRteCommand } from '../rteInput.types'
import { IRteCommandManager } from './rteCommandManager.types'

export const RteCommandManager = function (this: IRteCommandManager, editorElement: HTMLElement) {
    this.editorElement = editorElement
    this.history = []
    this.redoStack = []
    this.currentIndex = -1

    NotifiableEntity.call(this)
    this.setup()
} as any as IRteCommandManager

export const setup = function (this: IRteCommandManager) {
    // this.accept(
    //     notify(
    //         `${this.editorElement.id}_format_text_${this.name}`,
    //         this.notifyStateChanges.bind(this),
    //         'formattingStateChanged'
    //     )
    // )
}

export const execute = function (
    this: IRteCommandManager,
    command: Omit<IRteCommand, 'timestamp'>
): boolean {
    const fullCommand = {
        ...command,
        timestamp: Date.now()
    }

    try {
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

export const redo = function (this: IRteCommandManager): boolean {
    if (this.redoStack.length === 0) return false

    const command = this.redoStack.pop()!
    this.history.push(command)
    this.currentIndex++
    this.applyCommand(command)

    return true
}

export const resetEditor = function (this: IRteCommandManager) {
    this.editorElement.innerHTML = ''
}

export const applyFormatting = function (
    this: IRteCommandManager,
    tagName: string,
    range: Range,
    selection: Selection
) {
    if (range.collapsed) return // No selection

    // Create element with desired formatting
    const formattingElement = document.createElement(tagName)

    // Move content from selection to our new element
    formattingElement.appendChild(range.extractContents())

    // Insert the formatted element
    range.insertNode(formattingElement)

    // Update selection
    selection.removeAllRanges()
    const newRange = document.createRange()
    newRange.selectNodeContents(formattingElement)
    selection.addRange(newRange)
}

export const insertText = function (
    this: IRteCommandManager,
    text: string,
    range: Range,
    selection: Selection
) {
    const textNode = document.createTextNode(text)
    range.insertNode(textNode)

    // Position cursor after inserted text
    range.setStartAfter(textNode)
    range.setEndAfter(textNode)
    selection.removeAllRanges()
    selection.addRange(range)
}

export const applyCommand = function (this: IRteCommandManager, command: IRteCommand) {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)

    switch (command.type) {
        case 'bold':
            this.applyFormatting('strong', range, selection)
            break
        case 'italic':
            this.applyFormatting('em', range, selection)
            break
        case 'underline':
            this.applyFormatting('u', range, selection)
            break
        case 'strikethrough':
            this.applyFormatting('s', range, selection)
            break
        case 'insertText':
            this.insertText(command.payload, range, selection)
            break
        case 'deleteText':
            range.deleteContents()
            break
        default:
            throw new Error(`Unknown command type: ${command.type}`)
    }

    // Notify observers about the change
    this.notifyStateChanges()
}

export const getState = function (this: IRteCommandManager): IEditorState {
    const selection = window.getSelection()
    let selectionState = null

    if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        if (this.editorElement.contains(range.commonAncestorContainer)) {
            selectionState = {
                text: selection.toString(),
                start: range.startOffset,
                end: range.endOffset,
                isCollapsed: selection.isCollapsed
            }
        }
    }

    return {
        html: this.editorElement.innerHTML,
        text: this.editorElement.textContent ?? '',
        content: '',
        selection: selectionState,
        historyLength: this.history.length,
        canUndo: this.currentIndex >= 0,
        canRedo: this.redoStack.length > 0
    }
}

export const getHistory = function (this: IRteCommandManager): IRteCommand[] {
    return [...this.history]
}

export const notifyStateChanges = function (this: IRteCommandManager) {
    const state = this.getState()
    this.notify('formattingStateChanged', state)
}

RteCommandManager.prototype = {
    ...NotifiableEntity.prototype
}

Object.assign(RteCommandManager.prototype, {
    setup,
    execute,
    undo,
    redo,
    applyCommand,
    getHistory,
    resetEditor,
    applyFormatting,
    insertText,
    notifyStateChanges,
    getState
})
