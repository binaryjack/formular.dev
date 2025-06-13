import {
    getMediaBreakpoints,
    getMediaScreenAspectRatio,
    mediaBreakpointsDefault,
    MediaRanges,
    newMedia,
    newMediaRange,
    newMediaScreen
} from './screen.constructors'

describe('screen.constructors', () => {
    describe('getMediaBreakpoints', () => {
        it('should return correct breakpoints for each media', () => {
            expect(
                getMediaBreakpoints({ x: 0, y: 0, media: '2xs', orientation: 'portrait' })
            ).toEqual({
                is2XS: true,
                isXS: false,
                isSM: false,
                isMD: false,
                isLG: false,
                isXL: false,
                is2XL: false
            })
            expect(
                getMediaBreakpoints({ x: 0, y: 0, media: 'md', orientation: 'portrait' })
            ).toEqual({
                is2XS: false,
                isXS: false,
                isSM: false,
                isMD: true,
                isLG: false,
                isXL: false,
                is2XL: false
            })
        })
    })

    describe('newMediaRange', () => {
        it('should create a media range with correct min, max, x, y, media', () => {
            const range = newMediaRange(0, 320, 480, '2xs')
            expect(range).toEqual({ min: 0, max: 480, x: 320, y: 480, media: '2xs' })
        })
    })

    describe('newMediaScreen', () => {
        it('should create a media screen', () => {
            expect(newMediaScreen(320, 480, '2xs')).toEqual({ x: 320, y: 480, media: '2xs' })
        })
    })

    describe('newMedia', () => {
        it('should create a media object', () => {
            expect(newMedia(320, 480, '2xs', 'portrait')).toEqual({
                x: 320,
                y: 480,
                media: '2xs',
                orientation: 'portrait'
            })
        })
    })

    describe('getMediaScreenAspectRatio', () => {
        it('should return correct media for landscape', () => {
            const result = getMediaScreenAspectRatio(1024, 768)
            expect(result.media).toBe('lg')
            expect(result.orientation).toBe('landscape')
        })
        it('should return correct media for portrait', () => {
            const result = getMediaScreenAspectRatio(768, 1024)
            expect(result.media).toBe('md')
            expect(result.orientation).toBe('portrait')
        })
    })

    describe('mediaBreakpointsDefault', () => {
        it('should have all breakpoints set to false', () => {
            expect(mediaBreakpointsDefault).toEqual({
                is2XS: false,
                isXS: false,
                isSM: false,
                isMD: false,
                isLG: false,
                isXL: false,
                is2XL: false
            })
        })
    })

    describe('MediaRanges', () => {
        it('should contain all expected media ranges', () => {
            expect(MediaRanges.length).toBe(7)
            expect(MediaRanges[0].media).toBe('2xs')
            expect(MediaRanges[6].media).toBe('2xl')
        })
    })
})
