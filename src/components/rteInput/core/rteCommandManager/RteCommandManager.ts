import { NotifiableEntity } from '../../../../core/notifiableEntity/NotifiableEntity'
import {
    activeFormatDefault,
    FormatsEnum,
    IEditorState,
    IRteCommand,
    RteCommandType,
    tagMap,
    TextEditEnum,
    trackFormating
} from '../rteInput.types'
import { IRteCommandManager } from './rteCommandManager.types'

export const RteCommandManager = function (this: IRteCommandManager, editorElement: HTMLElement) {
    this.editorElement = editorElement
    this.history = []
    this.redoStack = []
    this.currentIndex = -1
    this.activeFormat = activeFormatDefault

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
        // For formatting commands, check if we should toggle instead of apply
        if (['bold', 'italic', 'underline', 'strikethrough'].includes(command.type)) {
            // If formatting already exists, remove it instead
            if (this.isFormatApplied(command.type)) {
                this.removeFormatting(command.type)
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
        case FormatsEnum.bold:
            this.applyFormatting('strong', range, selection)
            break
        case FormatsEnum.italic:
            this.applyFormatting('em', range, selection)
            break
        case FormatsEnum.underline:
            this.applyFormatting('u', range, selection)
            break
        case FormatsEnum.strikethrough:
            this.applyFormatting('s', range, selection)
            break
        case TextEditEnum.insertText:
            this.insertText(command.payload, range, selection)
            break
        case TextEditEnum.deleteText:
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
        content: this.editorElement.innerText,
        selection: selectionState,
        historyLength: this.history.length,
        canUndo: this.currentIndex >= 0,
        canRedo: this.redoStack.length > 0,
        activeFormatState: this.activeFormat
    }
}

export const getHistory = function (this: IRteCommandManager): IRteCommand[] {
    return [...this.history]
}

export const notifyStateChanges = function (this: IRteCommandManager) {
    const state = this.getState()
    this.notify('formattingStateChanged', state)
}

export const input = function (this: IRteCommandManager) {}

// Add isFormatApplied method
export const isFormatApplied = function (this: IRteCommandManager, formatType: string): boolean {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return false

    const range = selection.getRangeAt(0)
    if (range.collapsed) return false

    // Get the common ancestor of the selection
    const container = range.commonAncestorContainer

    const tagName = tagMap[formatType]
    if (!tagName) return false

    // Check if the selection is inside the formatting element
    let parent: Node | null = container
    while (parent && parent !== this.editorElement) {
        if (parent.nodeType === Node.ELEMENT_NODE && (parent as Element).tagName === tagName) {
            this.activeFormat = trackFormating(
                this.activeFormat,
                tagName as RteCommandType,
                (parent as Element).tagName === tagName
            )
            return true
        }
        parent = parent.parentNode
    }

    return false
}

// Add removeFormatting method
export const removeFormatting = function (this: IRteCommandManager, formatType: string) {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    if (range.collapsed) return

    const tagName = tagMap[formatType]
    if (!tagName) return

    // Create document fragment with the selection
    const fragment = range.extractContents()

    // Remove the formatting tags from the fragment
    this.unwrapFormatting(fragment, tagName)

    // Insert the clean fragment
    range.insertNode(fragment)

    // Update selection
    selection.removeAllRanges()
    selection.addRange(range)

    // Notify observers about the change
    this.notifyStateChanges()
}

// Helper method to recursively unwrap formatting
export const unwrapFormatting = function (this: IRteCommandManager, node: Node, tagName: string) {
    if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName === tagName) {
        // Replace this formatting element with its contents
        const parent = node.parentNode
        if (parent) {
            while (node.firstChild) {
                parent.insertBefore(node.firstChild, node)
            }
            parent.removeChild(node)
        }
        return
    }

    // Process child nodes
    const childNodes = Array.from(node.childNodes)
    childNodes.forEach((child) => {
        this.unwrapFormatting(child, tagName)
    })
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
    isFormatApplied,
    removeFormatting,
    unwrapFormatting,
    getState
})
