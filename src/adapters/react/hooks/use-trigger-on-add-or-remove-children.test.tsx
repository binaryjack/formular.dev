import { useEffect } from 'react'

import { act, render, waitFor } from '@testing-library/react'
import { useTriggerOnAddOrRemoveChildren } from './use-trigger-on-add-or-remove-children'

function TestComponent() {
    const { trigger, elementRef } = useTriggerOnAddOrRemoveChildren<HTMLDivElement>()

    useEffect(() => {
        // This effect is just to trigger re-render for test
    }, [trigger])

    return (
        <div>
            <div data-testid="container" ref={elementRef}></div>
            <span data-testid="status">{trigger}</span>
        </div>
    )
}

describe('useTriggerOnAddOrRemoveChildren', () => {
    it('should detect when children are added and removed', async () => {
        jest.useFakeTimers()
        const { getByTestId, findByTestId } = render(<TestComponent />)
        const container = getByTestId('container')
        const status = getByTestId('status')

        // Initially, should have no children
        expect(status.textContent).toBe('hasNoChilds')

        // Add a child
        act(() => {
            const child = document.createElement('div')
            container.appendChild(child)
            jest.runAllTimers()
        })
        await waitFor(() => {
            expect(status.textContent).toBe('hasChilds')
        })

        // Remove the child
        act(() => {
            while (container.firstChild) {
                container.removeChild(container.firstChild)
            }
            jest.runAllTimers()
        })
        await waitFor(() => {
            expect(status.textContent).toBe('hasNoChilds')
        })

        jest.useRealTimers()
    })
})
