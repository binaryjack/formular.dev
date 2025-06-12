import { IStateData } from './core/rti-engine.types';
export interface IRteInputProps {
    id: string;
    onStateChange: (state: IStateData) => void;
    initialState: IStateData;
    externalEditorRef?: React.RefObject<HTMLDivElement>;
    debug?: boolean;
}
export declare const RteInput: ({ id, onStateChange, initialState, externalEditorRef, debug }: IRteInputProps) => import("@emotion/react/jsx-runtime").JSX.Element;
