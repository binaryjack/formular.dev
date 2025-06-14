import useMediaScreens from '@adapters/react/hooks/screen/use-media-screens'
import { act, renderHook } from '@testing-library/react'

// Mock window properties and event listeners
describe('useMediaScreens', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const originalInnerWidth = window.innerWidth
    const originalInnerHeight = window.innerHeight

    beforeEach(() => {
        // Set default window size
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1024
        })
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 768
        })
        jest.clearAllMocks()
    })

    afterAll(() => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: originalInnerWidth
        })
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: originalInnerHeight
        })
    })

    it('should return initial window size and media info', () => {
        const { result } = renderHook(() => useMediaScreens())
        expect(result.current.windowX).toBe(1024)
        expect(result.current.windowY).toBe(768)
        expect(result.current.media).toBeDefined()
        expect(result.current.breakpoints).toBeDefined()
    })

    it('should update state on window resize', () => {
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 800
            })
            Object.defineProperty(window, 'innerHeight', {
                writable: true,
                configurable: true,
                value: 600
            })
            window.dispatchEvent(new Event('resize'))
        })
        const { result } = renderHook(() => useMediaScreens())
        expect(result.current.windowX).toBe(800)
        expect(result.current.windowY).toBe(600)
    })

    it('should add and remove resize event listeners', () => {
        const { unmount } = renderHook(() => useMediaScreens())
        expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
        unmount()
        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    })
})
