import { IDebug } from './debug.types';
export interface IVisualDebugContext {
    options?: IDebug;
}
export declare const visualDebugContextDefault: IVisualDebugContext;
export declare const DebugContextProvider: import('react').Context<IVisualDebugContext>;
export declare const useVisualDebugContext: () => IVisualDebugContext;
