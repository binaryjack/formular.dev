import { INotifiableEntity } from '../../../../core/notifiableEntity/notifiableEntityBase.types'
import { IEditorState, IRteCommand } from '../rteInput.types'

export type IRteCommandManager = IRteCommandManagerBase & INotifiableEntity

export interface IRteCommandManagerBase {
    new (editorElement: HTMLElement): IRteCommandManager
    /**PRIVATE */
    editorElement: HTMLElement
    history: IRteCommand[]
    redoStack: IRteCommand[]
    currentIndex: number
    /**PUBLIC */
    execute: (command: Omit<IRteCommand, 'timestamp'>) => boolean
    undo: () => boolean
    redo: () => boolean
    getHistory: () => IRteCommand[]
    /**PRIVATE */
    resetEditor: () => void
    applyCommand: (command: IRteCommand) => void
    applyFormatting: (tagName: string, range: Range, selection: Selection) => void
    insertText: (text: string, range: Range, selection: Selection) => void
    notifyStateChanges: () => void
    getState: () => IEditorState
    setup: () => void
}
