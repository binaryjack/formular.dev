import { ScreenBreakPointType, ScreenOrientationType } from './screen.types'

export interface IMediaBreakpoints {
    /** Extra Small Screen 320 * 480px */
    isXXS: boolean

    /** Small Screen 481 * 600px */
    isXS: boolean

    /** Small Tablets 601 * 768px */
    isS: boolean

    /** Small Tablets 769 * 1024px */
    isM: boolean

    /** laptops 1025 * 1280px */
    isL: boolean

    /** Wide Screen 1281 * 1440px */
    isXL: boolean

    /** Ultra Wide Screen 1441 => up */
    isXXL: boolean
}

export interface IMediaScren {
    x: number
    y: number
    media: ScreenBreakPointType
}

export interface IMediaRange extends IMediaScren {
    min: number
    max: number
}

export interface IMedia extends IMediaScren {
    orientation: ScreenOrientationType
}

/** Extra Small Screen 320 * 480px */
/** Small Screen 481 * 600px */
/** Small Tablets 601 * 768px */
/** Small Tablets 769 * 1024px */
/** laptops 1025 * 1280px */
/** Wide Screen 1281 * 1440px */
/** Ultra Wide Screen 1441 => up */

export interface AspectRatio {
    isDesktopPortrait: boolean
    isTabletPortrait: boolean
    isMobilePortrait: boolean
    isDesktopLandscape: boolean
    isTabletLandscape: boolean
    isMobileLandscape: boolean
}

export interface IMediaScreenResult {
    breakpoints: IMediaBreakpoints
    media: IMedia
    windowX: number
    windowY: number
}
