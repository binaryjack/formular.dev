import { IMedia, IMediaBreakpoints, IMediaRange, IMediaScren } from './screen.models'
import { ScreenBreakPointType, ScreenOrientationType } from './screen.types'

export const getMediaBreakpoints = (media: IMedia) => {
    return {
        isXXS: media.media === 'XXS',
        isXS: media.media === 'XS',
        isS: media.media === 'S',
        isM: media.media === 'M',
        isL: media.media === 'L',
        isXL: media.media === 'XL',
        isXXL: media.media === 'XXL'
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

    const min = Math.min(x, y)
    let om = MediaRanges.find((o) => o.max >= min)
    if (!om) {
        om = MediaRanges[MediaRanges.length - 1]
    }

    return newMedia(om.x, om.y, om.media, _orientations)
}

export const mediaBreakpointsDefault: IMediaBreakpoints = {
    isXXS: false,
    isXS: false,
    isS: false,
    isM: false,
    isL: false,
    isXL: false,
    isXXL: false
}

export const MediaRanges: IMediaRange[] = [
    newMediaRange(0, 320, 480, 'XXS'),
    newMediaRange(481, 481, 600, 'XS'),
    newMediaRange(601, 601, 768, 'S'),
    newMediaRange(769, 769, 1024, 'M'),
    newMediaRange(1025, 1025, 1280, 'L'),
    newMediaRange(1281, 1281, 1440, 'XL'),
    newMediaRange(1441, 1441, 5400, 'XXL')
]
