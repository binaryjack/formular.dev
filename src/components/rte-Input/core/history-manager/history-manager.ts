import { IRtiEngine } from '../rti-engine/rti-engine.types'
import { IHistoryManager } from './history-manager.types'
import { addToHistory } from './prototype/add-to-history'
import { getHistory } from './prototype/get-history'
import { redo } from './prototype/redo'
import { undo } from './prototype/undo'

export const HistoryManager = function (
    this: IHistoryManager,
    editorElement: HTMLElement,
    engine: IRtiEngine
) {
    this.engine = engine
    this.editorElement = editorElement
    this.history = []
    this.redoStack = []
    this.currentIndex = -1
} as any as IHistoryManager

Object.assign(HistoryManager.prototype, {
    undo,
    redo,
    getHistory,
    addToHistory
})
