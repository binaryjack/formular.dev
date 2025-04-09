export interface RangePosition {
    // x: number
    xPercentage: number
    step: number
}

export interface ReferenceObjects {
    width: number
    left: number
}

export interface SnapPoint {
    point: number
    active: boolean
    currentPercentageSnap: number
    thresholdLow: number
    thresholdHigh: number
}

export type RangeSlideBehavior = 'slide' | 'snap'
export type RangeSliderHandleStyle = 'thin' | 'circle'
