import { IDebug } from './debug.types';
interface IVisualDebugProps {
    options?: IDebug;
    children: React.ReactNode;
}
export declare const VisualDebug: ({ options, children }: IVisualDebugProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
