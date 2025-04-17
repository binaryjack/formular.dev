import { IRtiEngine } from '../rtiEngine/rtiEngine.types'
import { IHistoryManager } from './hystoryManager.types'
import { addToHistory } from './prototype/addToHistory'
import { getHistory } from './prototype/getHistory'
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
