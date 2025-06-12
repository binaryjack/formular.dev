import { IMedia, IMediaBreakpoints } from '../../../adapters/react/hooks/screen/screen.models';
import { IDebug } from '../debug/debug.types';
export interface IAppContext {
    breakpoints?: IMediaBreakpoints;
    media?: IMedia;
    isMobileDevice: boolean;
    debug?: IDebug;
    holdScroll: boolean;
    setHoldScroll: (hold: boolean) => void;
}
export declare const appContextDefault: {
    breakpoints: undefined;
    media: undefined;
    currentY: number;
    middleScreenY: number;
    middleScreenRefPositionY: number;
    isMobileDevice: boolean;
    debug: undefined;
    holdScroll: boolean;
    setHoldScroll: () => void;
};
export declare const AppContext: import('react').Context<IAppContext>;
declare const useAppContext: () => IAppContext;
export default useAppContext;
