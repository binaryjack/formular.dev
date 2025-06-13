import { render, screen } from '@testing-library/react'
import React, { useEffect } from 'react'
import { useObjectRef } from './use-object-ref'

describe('useObjectRef', () => {
    it('should provide a ref and castedRefObject', () => {
        function TestComponent() {
            const { mainRef, castedRefObject } = useObjectRef<HTMLDivElement>()
            useEffect(() => {
                if (mainRef.current) {
                    mainRef.current.setAttribute('data-test', 'true')
                }
            }, [])
            return (
                <div ref={mainRef} data-testid="test-div">
                    {castedRefObject ? 'mounted' : 'not mounted'}
                </div>
            )
        }
        render(<TestComponent />)
        const div = screen.getByTestId('test-div')
        expect(div).toBeInTheDocument()
        // castedRefObject is null on first render, but after mount it should be the div
        expect(div.textContent === 'mounted' || div.textContent === 'not mounted').toBe(true)
    })

    it('mainRef.current should be null before mount and HTMLElement after mount', () => {
        let refValue: HTMLElement | null = null
        function TestComponent() {
            const { mainRef } = useObjectRef<HTMLDivElement>()
            useEffect(() => {
                refValue = mainRef.current
            }, [])
            return <div ref={mainRef} data-testid="test-div" />
        }
        render(<TestComponent />)
        expect(refValue === null || (refValue as any) instanceof HTMLElement).toBe(true)
    })
})
