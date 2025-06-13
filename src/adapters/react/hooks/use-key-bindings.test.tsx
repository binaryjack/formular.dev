import { fireEvent, render, renderHook } from '@testing-library/react'
import useKeyBindings, { IKeyBindings } from './use-key-bindings'

describe('useKeyBindings', () => {
    function setup<T extends HTMLElement>(options: Partial<IKeyBindings<T>>) {
        const result = renderHook(() => useKeyBindings<T>(options))
        // Create a dummy input to attach the handler
        const { handleKeyDown } = result.result.current
        const utils = render(<input data-testid="input" onKeyDown={handleKeyDown as any} />)
        const input = utils.getByTestId('input') as T
        return { input, ...utils }
    }

    it('calls onEnterCallback when Enter is pressed', () => {
        const onEnterCallback = jest.fn()
        const { input } = setup<HTMLInputElement>({ onEnterCallback })
        fireEvent.keyDown(input, { key: 'Enter' })
        expect(onEnterCallback).toHaveBeenCalled()
    })

    it('calls onEscapeCallback when Escape is pressed', () => {
        const onEscapeCallback = jest.fn()
        const { input } = setup<HTMLInputElement>({ onEscapeCallback })
        fireEvent.keyDown(input, { key: 'Escape' })
        expect(onEscapeCallback).toHaveBeenCalled()
    })

    it('calls onArrowDownCallback when ArrowDown is pressed', () => {
        const onArrowDownCallback = jest.fn()
        const { input } = setup<HTMLInputElement>({ onArrowDownCallback })
        fireEvent.keyDown(input, { key: 'ArrowDown' })
        expect(onArrowDownCallback).toHaveBeenCalled()
    })

    it('calls onArrowUpCallback when ArrowUp is pressed', () => {
        const onArrowUpCallback = jest.fn()
        const { input } = setup<HTMLInputElement>({ onArrowUpCallback })
        fireEvent.keyDown(input, { key: 'ArrowUp' })
        expect(onArrowUpCallback).toHaveBeenCalled()
    })

    it('calls onArrowLeftCallback when ArrowLeft is pressed', () => {
        const onArrowLeftCallback = jest.fn()
        const { input } = setup<HTMLInputElement>({ onArrowLeftCallback })
        fireEvent.keyDown(input, { key: 'ArrowLeft' })
        expect(onArrowLeftCallback).toHaveBeenCalled()
    })

    it('calls onArrowRightCallback when ArrowRight is pressed', () => {
        const onArrowRightCallback = jest.fn()
        const { input } = setup<HTMLInputElement>({ onArrowRightCallback })
        fireEvent.keyDown(input, { key: 'ArrowRight' })
        expect(onArrowRightCallback).toHaveBeenCalled()
    })

    it('calls onDeleteCallback when Delete is pressed', () => {
        const onDeleteCallback = jest.fn()
        const { input } = setup<HTMLInputElement>({ onDeleteCallback })
        fireEvent.keyDown(input, { key: 'Delete' })
        expect(onDeleteCallback).toHaveBeenCalled()
    })

    it('calls onKeyCallback for any key', () => {
        const onKeyCallback = jest.fn()
        const { input } = setup<HTMLInputElement>({ onKeyCallback })
        fireEvent.keyDown(input, { key: 'a' })
        expect(onKeyCallback).toHaveBeenCalled()
    })

    it('calls multiple callbacks if multiple keys match', () => {
        const onKeyCallback = jest.fn()
        const onEnterCallback = jest.fn()
        const { input } = setup<HTMLInputElement>({ onKeyCallback, onEnterCallback })
        fireEvent.keyDown(input, { key: 'Enter' })
        expect(onKeyCallback).toHaveBeenCalled()
        expect(onEnterCallback).toHaveBeenCalled()
    })
})
