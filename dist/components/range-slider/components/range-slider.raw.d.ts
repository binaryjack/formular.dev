import { RangeSlideBehavior, RangeSliderHandleStyle } from './range-slider.types';
interface RangeSliderRawProps {
    id: string;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    onChange: (value: number) => void;
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
export declare const RangeSliderRaw: ({ id, value, onChange, min, max, step, behavior, rangeFillColor, handleFillColor, handleStyle, debug, handleStylePercentAdjust, handlerStyleWidth, handlerStyleHeight, slideBarHeight }: RangeSliderRawProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
