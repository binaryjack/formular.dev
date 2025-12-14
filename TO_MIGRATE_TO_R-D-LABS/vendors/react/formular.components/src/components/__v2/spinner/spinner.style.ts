import { colorUtils, ComponentSizeType, ComponentVariantType } from 'formular.design.system'
import { ISpinnerOverriders } from './spinner.types'

const spinnerSizes: Record<
    ComponentSizeType,
    { main: number; frameSize: number; strokeSize: number }
> = {
    '2xs': { main: 8, frameSize: 42, strokeSize: 3 },
    xs: { main: 12, frameSize: 42, strokeSize: 3 },
    sm: { main: 15, frameSize: 42, strokeSize: 3 },
    md: { main: 18, frameSize: 48, strokeSize: 6 },
    lg: { main: 19, frameSize: 48, strokeSize: 6 },
    xl: { main: 22, frameSize: 48, strokeSize: 6 },
    '2xl': { main: 30, frameSize: 48, strokeSize: 6 }
}

const colorMap: Record<ComponentVariantType, { bg: string; fg: string }> = {
    primary: { bg: '#3b82f6', fg: '#ffffff' },
    secondary: { bg: '#6b7280', fg: '#f3f4f6' },
    success: { bg: '#10b981', fg: '#ffffff' },
    warning: { bg: '#f59e0b', fg: '#ffffff' },
    danger: { bg: '#ef4444', fg: '#ffffff' },
    info: { bg: '#06b6d4', fg: '#ffffff' },
    neutral: { bg: '#9ca3af', fg: '#ffffff' }
}

const getCirclePropertiesSize = (size: number, strokeSize: number) => {
    const availableSize = size - strokeSize * 2
    const radius = availableSize / 2
    const centerX = availableSize / 2
    const centerY = availableSize / 2
    return { radius, centerX, centerY }
}

export const useSpinnerStyle = (
    variantSize: ComponentSizeType,
    variantName: ComponentVariantType,
    overriders?: ISpinnerOverriders
) => {
    const colors = colorMap[variantName]
    const sizes = spinnerSizes[variantSize]

    const _strokeColor = overriders?.strokeColor ?? colorUtils.getColor('neutral', 300)
    const _activeColor = overriders?.activeColor ?? colorUtils.getColor(variantName, 500)
    const _mainSize = overriders?.mainSize ?? sizes.main
    const _frameSize = overriders?.frameSize ?? sizes.frameSize
    const _strokeSize = overriders?.strokeSize ?? sizes.strokeSize
    const { centerX, centerY, radius } = getCirclePropertiesSize(_frameSize, _strokeSize)
    const spinnerStyle = {
        spinner: {
            display: 'flex',
            width: `${_mainSize}px`,
            height: `${_mainSize}px`,
            viewBox: `0 0 ${_strokeSize} ${_strokeSize}`
        },

        circle: {
            stroke: _activeColor,
            cx: centerX,
            cy: centerY,
            r: radius,
            strokeOpacity: overriders?.strokeOpacity ?? 0.25
        },

        path: {
            segment: {
                stroke: _strokeColor
            },
            d: `M${centerX + radius} ${centerY}c0-${radius} -${radius}-${radius} -${radius}-${radius}`,
            strokeLinecap: 'round',
            strokeLinejoin: 'round'
        }
    }

    return {
        mainSize: sizes.main,
        frameSize: _frameSize,
        strokeSize: _strokeSize,
        strokeColor: colors.bg,
        activeColor: colors.fg,
        spinnerStyle: spinnerStyle
    }
}
