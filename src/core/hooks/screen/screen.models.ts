import { AppBreakPointSizesType, ScreenOrientationType } from '../../../style/global.types'

export interface IMediaBreakpoints {
    /** Extra Small Screen 320 * 480px */
    is2XS: boolean

    /** Small Screen 481 * 640px */
    isXS: boolean

    /** Small Tablets 641 * 768px */
    isSM: boolean

    /** Small Tablets 769 * 1024px */
    isMD: boolean

    /** laptops 1025 * 1280px */
    isLG: boolean

    /** Wide Screen 1281 * 1440px */
    isXL: boolean

    /** Ultra Wide Screen 1441 => up */
    is2XL: boolean
}

export interface IMediaScren {
    x: number
    y: number
    media: AppBreakPointSizesType
}

export interface IMediaRange extends IMediaScren {
    min: number
    max: number
}

export interface IMedia extends IMediaScren {
    orientation: ScreenOrientationType
}

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
