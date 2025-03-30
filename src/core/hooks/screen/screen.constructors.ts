import { IMedia, IMediaBreakpoints, IMediaRange, IMediaScren } from './screen.models'
import { ScreenBreakPointType, ScreenOrientationType } from './screen.types'

export const getMediaBreakpoints = (media: IMedia) => {
    return {
        is2XS: media.media === '2XS',
        isXS: media.media === 'XS',
        isSM: media.media === 'SM',
        isMD: media.media === 'MD',
        isLG: media.media === 'LG',
        isXL: media.media === 'XL',
        is2XL: media.media === '2XL'
    }
}

export const newMediaRange = (
    min: number,
    x: number,
    y: number,
    media: ScreenBreakPointType
): IMediaRange => {
    const max = Math.max(x, y)
    return { min, max, x, y, media }
}

export const newMediaScreen = (x: number, y: number, media: ScreenBreakPointType): IMediaScren => {
    return { x, y, media }
}

export const newMedia = (
    x: number,
    y: number,
    media: ScreenBreakPointType,
    orientation: ScreenOrientationType
): IMedia => {
    return { x, y, media, orientation }
}

export const getMediaScreenAspectRatio = (x: number, y: number): IMedia => {
    console.log()
    const _orientations: ScreenOrientationType = x >= y ? 'landscape' : 'portrait'
    const max = Math.max(x, y)
    const min = Math.min(x, y)
    let om = MediaRanges.find((o) => o.x >= x)
    if (!om) {
        om = MediaRanges[MediaRanges.length - 1]
    }
    console.log(om)
    return newMedia(om.x, om.y, om.media, _orientations)
}

export const mediaBreakpointsDefault: IMediaBreakpoints = {
    is2XS: false,
    isXS: false,
    isSM: false,
    isMD: false,
    isLG: false,
    isXL: false,
    is2XL: false
}

export const MediaRanges: IMediaRange[] = [
    newMediaRange(0, 320, 480, '2XS'),
    newMediaRange(481, 481, 639, 'XS'),
    newMediaRange(640, 640, 767, 'SM'),
    newMediaRange(768, 768, 1023, 'MD'),
    newMediaRange(1024, 1024, 1279, 'LG'),
    newMediaRange(1280, 1280, 1535, 'XL'),
    newMediaRange(1536, 1536, 5400, '2XL')
]
