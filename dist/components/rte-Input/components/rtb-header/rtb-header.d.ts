import { FormatsEnum, IEngineState, IMouseState } from '../../core/rti-engine.types';
interface IRtbHeader {
    engineState: IEngineState | null;
    handleCommand: (command: FormatsEnum) => boolean | undefined;
    handleUndo: () => void;
    handleRedo: () => void;
    mouseState: IMouseState;
}
export declare const RtbHeader: ({ engineState, handleCommand, handleUndo, handleRedo, mouseState }: IRtbHeader) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
