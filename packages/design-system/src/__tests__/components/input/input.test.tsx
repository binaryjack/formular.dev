import { fireEvent, render, screen } from '@testing-library/react'
import { Input } from '../../../components/input/input'

describe('Input Component', () => {
    test('renders input with placeholder', () => {
        render(<Input placeholder="Enter text" />)
        expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    test('handles value changes', () => {
        const handleChange = jest.fn()
        render(<Input value="" onChange={handleChange} />)

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'test value' } })

        expect(handleChange).toHaveBeenCalledTimes(1)
    })

    test('applies disabled state', () => {
        render(<Input disabled placeholder="Disabled input" />)
        const input = screen.getByRole('textbox')

        expect(input).toBeDisabled()
        expect(input).toHaveClass('bg-gray-100', 'cursor-not-allowed')
    })

    test('applies variant classes correctly', () => {
        const { rerender } = render(<Input variant="default" />)
        expect(screen.getByRole('textbox')).toHaveClass('border-gray-300')

        rerender(<Input variant="error" />)
        expect(screen.getByRole('textbox')).toHaveClass('border-red-300')

        rerender(<Input variant="success" />)
        expect(screen.getByRole('textbox')).toHaveClass('border-green-300')
    })

    test('applies size classes correctly', () => {
        const { rerender } = render(<Input size="sm" />)
        expect(screen.getByRole('textbox')).toHaveClass('px-3', 'py-2', 'text-sm')

        rerender(<Input size="md" />)
        expect(screen.getByRole('textbox')).toHaveClass('px-4', 'py-2', 'text-base')

        rerender(<Input size="lg" />)
        expect(screen.getByRole('textbox')).toHaveClass('px-6', 'py-3', 'text-lg')
    })

    test('handles focus and blur events', () => {
        const handleFocus = jest.fn()
        const handleBlur = jest.fn()

        render(<Input onFocus={handleFocus} onBlur={handleBlur} />)
        const input = screen.getByRole('textbox')

        fireEvent.focus(input)
        expect(handleFocus).toHaveBeenCalledTimes(1)

        fireEvent.blur(input)
        expect(handleBlur).toHaveBeenCalledTimes(1)
    })
})
