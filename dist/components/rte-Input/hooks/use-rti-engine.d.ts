import { FormatsEnum, IEngineState, IStateData } from '../core/rti-engine.types';
export declare const useRtiEngine: (editorRef: React.RefObject<HTMLDivElement>, initialState: IStateData, onStateChanged?: (state: IStateData) => void) => {
    handleMouseDown: () => void | undefined;
    handleMouseMove: () => void | undefined;
    handleMouseUp: (e: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent) => void;
    handleSelectionChangeOnClick: () => void | undefined;
    handleCommand: (command: FormatsEnum) => boolean | undefined;
    handleInput: () => void;
    handleUndo: () => boolean | undefined;
    handleRedo: () => boolean | undefined;
    mouseState: import('../core/rti-engine.types').IMouseState;
    handleMouseLeave: () => void | undefined;
    normalizeStructure: () => void | undefined;
    handleOnBlur: () => void;
    handlePaste: (e: React.ClipboardEvent<HTMLDivElement>) => void;
    state: IEngineState;
};
