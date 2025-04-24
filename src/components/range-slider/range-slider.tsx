import { RangeSlideBehavior, RangeSliderHandleStyle } from './components/range-slider.types'
import { RangeSliderSF } from './range-slider.sf'

interface RangeSliderProps {
    fieldName: string
    min?: number
    max?: number
    step?: number
    behavior?: RangeSlideBehavior
    rangeFillColor?: string
    handleFillColor?: string
    handleStyle?: RangeSliderHandleStyle
    handleStylePercentAdjust?: number
    handlerStyleWidth?: number
    handlerStyleHeight?: number
    slideBarHeight?: number
    debug?: boolean
}

export const RangeSlider = ({
    fieldName,
    min,
    max,
    step,
    behavior,
    rangeFillColor,
    handleFillColor,
    handleStyle,
    handleStylePercentAdjust,
    handlerStyleWidth,
    handlerStyleHeight,
    slideBarHeight,
    debug
}: RangeSliderProps) => (
    <RangeSliderSF
        fieldName={fieldName}
        min={min}
        max={max}
        step={step}
        behavior={behavior}
        rangeFillColor={rangeFillColor}
        handleFillColor={handleFillColor}
        handleStyle={handleStyle}
        handleStylePercentAdjust={handleStylePercentAdjust}
        handlerStyleWidth={handlerStyleWidth}
        handlerStyleHeight={handlerStyleHeight}
        slideBarHeight={slideBarHeight}
        debug={debug}
    />
)
