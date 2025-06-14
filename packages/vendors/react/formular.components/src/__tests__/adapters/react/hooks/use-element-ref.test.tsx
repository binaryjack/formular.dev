import { useElementRef } from '@adapters/react/hooks/use-element-ref'
import { ScrollContextProvider } from '@components/context/scrolling/scrolling.context'
import { act, render } from '@testing-library/react'
import { useRef } from 'react'

const mockScreenProperties = {
    width: 1024,
    height: 768,
    scrollY: 100,
    screenTop: 0,
    centerScreen: 384,
    triggerPoint: 200,
    hasUpdates: 0
}

describe('useElementRef', () => {
    function TestComponent() {
        const ref = useRef<HTMLDivElement>(null)
        const { elementPositionRefs } = useElementRef(ref)
        return (
            <div ref={ref} data-testid="test-div">
                {JSON.stringify(elementPositionRefs)}
            </div>
        )
    }

    it('should return element position refs for the element', () => {
        const { getByTestId } = render(
            <ScrollContextProvider.Provider value={{ screenProperties: mockScreenProperties }}>
                <TestComponent />
            </ScrollContextProvider.Provider>
        )
        const div = getByTestId('test-div') as HTMLDivElement
        // Simulate getBoundingClientRect
        const rect = { height: 50, width: 100, top: 10, left: 20, right: 120, x: 20, y: 10 }
        jest.spyOn(div, 'getBoundingClientRect').mockReturnValue(rect as DOMRect)
        act(() => {
            window.dispatchEvent(new Event('scroll'))
        })
        // The hook should update after scroll
        expect(div.textContent).toContain('height')
        expect(div.textContent).toContain('width')
    })
})
