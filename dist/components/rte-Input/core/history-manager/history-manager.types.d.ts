import { IHistoryItem } from '../rti-engine.types';
import { IRtiEngine } from '../rti-engine/rti-engine.types';
export interface IHistoryManager {
    new (editorElement: HTMLElement, engine: IRtiEngine): IHistoryManager;
    editorElement: HTMLElement;
    engine: IRtiEngine;
    currentIndex: number;
    history: IHistoryItem[];
    redoStack: IHistoryItem[];
    undo: () => boolean;
    redo: () => boolean;
    getHistory: () => IHistoryItem[];
    addToHistory: (state: IHistoryItem) => void;
}
