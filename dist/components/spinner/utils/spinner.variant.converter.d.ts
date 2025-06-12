import { AppBreakPointSizesType, VariantNameType } from '../../../style/global.types';
export interface ISpinnerVariantProperties {
    width: number;
    height: number;
    frameWidth: number;
    frameHeight: number;
    strokeWidth: number;
    strokeColor: string;
    activeColor: string;
}
export declare const spinnerSizeConverter: (size: AppBreakPointSizesType) => number;
export declare const spinnerFrameSizeConverter: (size: AppBreakPointSizesType) => number;
export declare const spinnerStrokeSizeConverter: (size: AppBreakPointSizesType) => number;
export declare const getSpinnerVariant: (variantSize: AppBreakPointSizesType, variantName: VariantNameType) => ISpinnerVariantProperties;
