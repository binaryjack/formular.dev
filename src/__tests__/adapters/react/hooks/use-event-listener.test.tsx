import { useEventListener } from '@adapters/react/hooks/use-event-listener'
import { fireEvent, render } from '@testing-library/react'
import React, { useRef } from 'react'

describe('useEventListener', () => {
    it('attaches and detaches window event listeners', () => {
        const handler = jest.fn()
        function TestComponent() {
            useEventListener('resize', handler)
            return <div>Test</div>
        }
        render(<TestComponent />)
        fireEvent(window, new Event('resize'))
        expect(handler).toHaveBeenCalledTimes(1)
    })

    it('attaches event listener to element ref', () => {
        const handler = jest.fn()
        function TestComponent() {
            const ref = useRef<HTMLButtonElement>(null)
            useEventListener('click', handler, ref)
            return <button ref={ref}>Click me</button>
        }
        const { getByText } = render(<TestComponent />)
        fireEvent.click(getByText('Click me'))
        expect(handler).toHaveBeenCalledTimes(1)
    })

    it('updates handler when it changes', () => {
        const firstHandler = jest.fn()
        const secondHandler = jest.fn()
        function TestComponent({ handler }: { handler: (e: Event) => void }) {
            useEventListener('resize', handler)
            return <div>Test</div>
        }
        const { rerender } = render(<TestComponent handler={firstHandler} />)
        fireEvent(window, new Event('resize'))
        expect(firstHandler).toHaveBeenCalledTimes(1)
        rerender(<TestComponent handler={secondHandler} />)
        fireEvent(window, new Event('resize'))
        expect(secondHandler).toHaveBeenCalledTimes(1)
    })

    it('cleans up event listeners on unmount', () => {
        const handler = jest.fn()
        function TestComponent() {
            useEventListener('resize', handler)
            return <div>Test</div>
        }
        const { unmount } = render(<TestComponent />)
        unmount()
        fireEvent(window, new Event('resize'))
        expect(handler).not.toHaveBeenCalled()
    })

    it('attaches event listener to document', () => {
        const handler = jest.fn()
        function TestComponent() {
            const ref = { current: document } as React.RefObject<Document>
            useEventListener('visibilitychange', handler, ref)
            return <div>Test</div>
        }
        render(<TestComponent />)
        fireEvent(document, new Event('visibilitychange'))
        expect(handler).toHaveBeenCalledTimes(1)
    })
})
