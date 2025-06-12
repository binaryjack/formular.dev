import { AppBreakPointSizesType, ScreenOrientationType } from '../../../../style/global.types';
import { IMedia, IMediaBreakpoints, IMediaRange, IMediaScren } from './screen.models';
export declare const getMediaBreakpoints: (media: IMedia) => {
    is2XS: boolean;
    isXS: boolean;
    isSM: boolean;
    isMD: boolean;
    isLG: boolean;
    isXL: boolean;
    is2XL: boolean;
};
export declare const newMediaRange: (min: number, x: number, y: number, media: AppBreakPointSizesType) => IMediaRange;
export declare const newMediaScreen: (x: number, y: number, media: AppBreakPointSizesType) => IMediaScren;
export declare const newMedia: (x: number, y: number, media: AppBreakPointSizesType, orientation: ScreenOrientationType) => IMedia;
export declare const getMediaScreenAspectRatio: (x: number, y: number) => IMedia;
export declare const mediaBreakpointsDefault: IMediaBreakpoints;
export declare const MediaRanges: IMediaRange[];
