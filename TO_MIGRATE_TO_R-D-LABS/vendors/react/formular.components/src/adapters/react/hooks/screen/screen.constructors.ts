import { ComponentSizeType, ScreenOrientationType } from 'formular.design.system'
import { IMedia, IMediaBreakpoints, IMediaRange, IMediaScreen } from './screen.models'

export const getMediaBreakpoints = (media: IMedia) => {
    return {
        is2XS: media.media === '2xs',
        isXS: media.media === 'xs',
        isSM: media.media === 'sm',
        isMD: media.media === 'md',
        isLG: media.media === 'lg',
        isXL: media.media === 'xl',
        is2XL: media.media === '2xl'
    }
}

export const newMediaRange = (
    min: number,
    x: number,
    y: number,
    media: ComponentSizeType
): IMediaRange => {
    const max = Math.max(x, y)
    return { min, max, x, y, media }
}

export const newMediaScreen = (x: number, y: number, media: ComponentSizeType): IMediaScreen => {
    return { x, y, media }
}

export const newMedia = (
    x: number,
    y: number,
    media: ComponentSizeType,
    orientation: ScreenOrientationType
): IMedia => {
    return { x, y, media, orientation }
}

export const getMediaScreenAspectRatio = (x: number, y: number): IMedia => {
    const _orientations: ScreenOrientationType = x >= y ? 'landscape' : 'portrait'
    let om = MediaRanges.find((o) => o.x >= x)
    om ??= MediaRanges[MediaRanges.length - 1]

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
    newMediaRange(0, 320, 480, '2xs'),
    newMediaRange(481, 481, 639, 'xs'),
    newMediaRange(640, 640, 767, 'sm'),
    newMediaRange(768, 768, 1023, 'md'),
    newMediaRange(1024, 1024, 1279, 'lg'),
    newMediaRange(1280, 1280, 1535, 'xl'),
    newMediaRange(1536, 1536, 5400, '2xl')
]
