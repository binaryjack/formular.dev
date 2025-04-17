import { IHistoryItem } from '../rteInput.types'
import { IRtiEngine } from '../rtiEngine/rtiEngine.types'

export interface IHistoryManager {
    new (editorElement: HTMLElement, engine: IRtiEngine): IHistoryManager
    editorElement: HTMLElement
    engine: IRtiEngine
    currentIndex: number
    history: IHistoryItem[]
    redoStack: IHistoryItem[]
    undo: () => boolean
    redo: () => boolean
    getHistory: () => IHistoryItem[]
    addToHistory: (state: IHistoryItem) => void
}
