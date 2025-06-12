import { RangeSlideBehavior, RangeSliderHandleStyle } from './components/range-slider.types';
interface RangeSliderSFProps {
    fieldName: string;
    min?: number;
    max?: number;
    step?: number;
    behavior?: RangeSlideBehavior;
    rangeFillColor?: string;
    handleFillColor?: string;
    handleStyle?: RangeSliderHandleStyle;
    handleStylePercentAdjust?: number;
    handlerStyleWidth?: number;
    handlerStyleHeight?: number;
    slideBarHeight?: number;
    debug?: boolean;
}
export declare const RangeSliderSF: ({ fieldName, min, max, step, behavior, rangeFillColor, handleFillColor, handleStyle, handleStylePercentAdjust, handlerStyleWidth, handlerStyleHeight, slideBarHeight, debug }: RangeSliderSFProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
