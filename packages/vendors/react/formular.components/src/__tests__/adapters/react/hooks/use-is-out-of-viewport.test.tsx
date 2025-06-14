import useIsOutOfViewport from '@adapters/react/hooks/use-is-out-of-viewport'
import { act, render } from '@testing-library/react'
import { useRef } from 'react'

function setupTestComponent(throttleDelay = 0) {
    function TestComponent() {
        const ref = useRef<HTMLDivElement>(null)
        const { isTopOut, isBottomOut } = useIsOutOfViewport(ref, throttleDelay)
        return (
            <div>
                <div ref={ref} data-testid="test-div">
                    Test
                </div>
                <span data-testid="top-out">{isTopOut ? 'true' : 'false'}</span>
                <span data-testid="bottom-out">{isBottomOut ? 'true' : 'false'}</span>
            </div>
        )
    }
    return render(<TestComponent />)
}

describe('useIsOutOfViewport', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.useFakeTimers()
    })
    afterEach(() => {
        jest.runOnlyPendingTimers()
        jest.useRealTimers()
    })

    it('should return false for both when element is fully in viewport', () => {
        // Mock BEFORE render
        const mockRect = {
            top: 10,
            bottom: window.innerHeight - 10,
            left: 0,
            right: 0,
            width: 100,
            height: 100,
            x: 0,
            y: 0,
            toJSON: () => {}
        } as DOMRect
        jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(mockRect)
        const { getByTestId } = setupTestComponent()
        act(() => {
            jest.runAllTimers()
            document.dispatchEvent(new Event('scroll'))
            jest.runAllTimers()
        })
        expect(getByTestId('top-out').textContent).toBe('false')
        expect(getByTestId('bottom-out').textContent).toBe('false')
    })

    it('should return true for isTopOut when element is above viewport', () => {
        const mockRect = {
            top: -10,
            bottom: 10,
            left: 0,
            right: 0,
            width: 100,
            height: 100,
            x: 0,
            y: 0,
            toJSON: () => {}
        } as DOMRect
        jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(mockRect)
        const { getByTestId } = setupTestComponent()
        act(() => {
            jest.runAllTimers()
            document.dispatchEvent(new Event('scroll'))
            jest.runAllTimers()
        })
        expect(getByTestId('top-out').textContent).toBe('true')
        expect(getByTestId('bottom-out').textContent).toBe('false')
    })

    it('should return true for isBottomOut when element is below viewport', () => {
        const mockRect = {
            top: window.innerHeight - 10,
            bottom: window.innerHeight + 10,
            left: 0,
            right: 0,
            width: 100,
            height: 100,
            x: 0,
            y: 0,
            toJSON: () => {}
        } as DOMRect
        jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(mockRect)
        const { getByTestId } = setupTestComponent()
        act(() => {
            jest.runAllTimers()
            document.dispatchEvent(new Event('scroll'))
            jest.runAllTimers()
        })
        expect(getByTestId('top-out').textContent).toBe('false')
        expect(getByTestId('bottom-out').textContent).toBe('true')
    })

    it('should handle both out of viewport', () => {
        const mockRect = {
            top: -10,
            bottom: window.innerHeight + 10,
            left: 0,
            right: 0,
            width: 100,
            height: 100,
            x: 0,
            y: 0,
            toJSON: () => {}
        } as DOMRect
        jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(mockRect)
        const { getByTestId } = setupTestComponent()
        act(() => {
            jest.runAllTimers()
            document.dispatchEvent(new Event('scroll'))
            jest.runAllTimers()
        })
        expect(getByTestId('top-out').textContent).toBe('true')
        expect(getByTestId('bottom-out').textContent).toBe('true')
    })
})
