import { INotifiableEntity } from '../../../../core/notifiableEntity/notifiableEntityBase.types'
import { IEditorState, IFormatDefinition, IHistoryItem, IRteCommand } from '../rteInput.types'

export type IRteCommandManager = IRteCommandManagerBase & INotifiableEntity

export interface IRteCommandManagerBase {
    new (editorElement: HTMLElement): IRteCommandManager
    /**PRIVATE */
    editorElement: HTMLElement
    history: IHistoryItem[]
    redoStack: IHistoryItem[]
    currentIndex: number
    activeFormat: IFormatDefinition[]
    lastContent: string
    /**PUBLIC */
    execute: (command: Omit<IRteCommand, 'timestamp'>) => boolean
    isFormatApplied: (formatOrTagName: string) => boolean
    checkForAnyAppliedFormat: () => void

    undo: () => boolean
    redo: () => boolean
    input: (text: string) => void
    getHistory: () => IHistoryItem[]
    addToHistory: (state: IHistoryItem) => void
    /**PRIVATE */
    resetEditor: () => void
    applyCommand: (command: IRteCommand) => void
    applyFormatting: (tagName: string, range: Range, selection: Selection) => void
    applyListFormatting: (range: Range, selection: Selection) => void

    removeFormatting: (formatType: string) => void
    removeListFormatting: (range: Range, selection: Selection) => void

    insertText: (text: string, range: Range, selection: Selection) => void
    updateActiveFormat: (tagName: string, active: boolean) => void
    getAllNodesInRange: (range: Range) => Node[]

    normalizeHtml: () => void
    sanitizeHtml: () => void
    sanitizeNode: () => void
    cleanHtml: () => void

    processFragmentFormatting: (fragment: DocumentFragment, tagName: string) => DocumentFragment
    processFragment: (fragment: DocumentFragment, tagName: string) => DocumentFragment
    unwrapFormatting: (node: Node, tagName: string) => void
    getState: () => IEditorState
    notifyStateChanges: () => void
    setup: () => void
}
