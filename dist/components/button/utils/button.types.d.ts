import { AppBreakPointSizesType } from '../../../style/global.types';
export interface IButtonBaseSize {
    width: string;
    height: string;
    px: string;
    my: string;
}
export declare const buttonSizes: Record<string, IButtonBaseSize>;
export declare const getButtonXYSizes: (size: AppBreakPointSizesType) => IButtonBaseSize;
