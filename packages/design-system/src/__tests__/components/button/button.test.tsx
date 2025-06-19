import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from '../../../components/button/button'

describe('Button Component', () => {
    test('renders button with children', () => {
        render(<Button>Click me</Button>)
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    test('handles click events', () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick}>Click me</Button>)

        fireEvent.click(screen.getByRole('button', { name: /click me/i }))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    test('applies disabled state', () => {
        render(<Button disabled>Disabled button</Button>)
        const button = screen.getByRole('button', { name: /disabled button/i })

        expect(button).toBeDisabled()
        expect(button).toHaveClass('opacity-50', 'cursor-not-allowed')
    })

    test('applies variant classes correctly', () => {
        const { rerender } = render(<Button variant="primary">Primary</Button>)
        expect(screen.getByRole('button')).toHaveClass('bg-blue-600')

        rerender(<Button variant="secondary">Secondary</Button>)
        expect(screen.getByRole('button')).toHaveClass('bg-gray-600')

        rerender(<Button variant="outline">Outline</Button>)
        expect(screen.getByRole('button')).toHaveClass('border', 'bg-white')
    })

    test('applies size classes correctly', () => {
        const { rerender } = render(<Button size="sm">Small</Button>)
        expect(screen.getByRole('button')).toHaveClass('px-3', 'py-2', 'text-sm')

        rerender(<Button size="md">Medium</Button>)
        expect(screen.getByRole('button')).toHaveClass('px-4', 'py-2', 'text-base')

        rerender(<Button size="lg">Large</Button>)
        expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3', 'text-lg')
    })
})
