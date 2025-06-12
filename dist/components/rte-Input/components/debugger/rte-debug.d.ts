import { IEngineState } from '../../core/rti-engine.types';
interface IRteDebugProps {
    editorRef: React.RefObject<HTMLDivElement>;
    engineState: IEngineState | null;
}
declare const RteDebug: (props: IRteDebugProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default RteDebug;
