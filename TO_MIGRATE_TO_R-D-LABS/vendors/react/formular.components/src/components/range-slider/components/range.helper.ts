import { SnapPoint } from './range-slider.types'

export const countDecimals = function (value: number) {
    if (Math.floor(value.valueOf()) === value.valueOf()) return 0

    const str = value.toString()
    if (str.indexOf('.') !== -1 && str.indexOf('-') !== -1) {
        return str.split('-')[1].length || 0
    } else if (str.indexOf('.') !== -1) {
        return str.split('.')[1].length || 0
    }
    return str.split('-')[1].length || 0
}

export const addNewSnapPoint = (
    point: number,
    thresholdLow: number,
    thresholdHigh: number,
    currentPercentageSnap: number
): SnapPoint => {
    return {
        point,
        active: false,
        thresholdLow,
        thresholdHigh,
        currentPercentageSnap
    }
}
