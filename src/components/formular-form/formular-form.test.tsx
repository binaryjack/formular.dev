import { LoadingStatus } from '@core/status'
import { act, fireEvent, render, screen } from '@testing-library/react'
import FormularForm from './formular-form'

// Mocks
const mockFields = [{ input: { name: 'username' } }, { input: { name: 'email' } }]
const mockFormFlags = { isValid: true, isDirty: false }
const mockNotificationManager = {
    accept: jest.fn(),
    dismiss: jest.fn()
}
const mockFormular = {
    id: 'test-form',
    fields: mockFields,
    getFormFlags: () => mockFormFlags,
    isDirty: false,
    isValid: true,
    isBusy: LoadingStatus.Loaded,
    triggerKeyWordType: ['onChange'],
    notificationManager: mockNotificationManager,
    submit: jest.fn().mockResolvedValue({ username: 'test', email: 'test@example.com' })
}

describe('FormularForm', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders children and context', () => {
        render(
            <FormularForm formular={mockFormular as any}>
                <div>Child Element</div>
            </FormularForm>
        )
        expect(screen.getByText('Child Element')).toBeInTheDocument()
        expect(screen.getByText('onChange')).toBeInTheDocument()
        expect(screen.getByText('pristine')).toBeInTheDocument()
    })

    it('shows submit button if onSubmit is provided', () => {
        render(
            <FormularForm formular={mockFormular as any} onSubmit={jest.fn()}>
                <div>Field</div>
            </FormularForm>
        )
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
    })

    it('calls onSubmit with form data on submit', async () => {
        const onSubmit = jest.fn()
        render(
            <FormularForm formular={mockFormular as any} onSubmit={onSubmit}>
                <div>Field</div>
            </FormularForm>
        )
        const button = screen.getByRole('button', { name: /submit/i })
        await act(async () => {
            fireEvent.click(button)
        })
        expect(mockFormular.submit).toHaveBeenCalled()
        expect(onSubmit).toHaveBeenCalledWith({ username: 'test', email: 'test@example.com' })
    })

    it('shows error message if submit returns null', async () => {
        const mockFormularNull = { ...mockFormular, submit: jest.fn().mockResolvedValue(null) }
        render(
            <FormularForm formular={mockFormularNull as any} onSubmit={jest.fn()}>
                <div>Field</div>
            </FormularForm>
        )
        const button = screen.getByRole('button', { name: /submit/i })
        await act(async () => {
            fireEvent.click(button)
        })
        expect(
            screen.getByText(/Form submission returned null or empty object/)
        ).toBeInTheDocument()
    })

    it('shows error message if submit throws', async () => {
        const mockFormularError = {
            ...mockFormular,
            submit: jest.fn().mockRejectedValue(new Error('Test error'))
        }
        render(
            <FormularForm formular={mockFormularError as any} onSubmit={jest.fn()}>
                <div>Field</div>
            </FormularForm>
        )
        const button = screen.getByRole('button', { name: /submit/i })
        await act(async () => {
            fireEvent.click(button)
        })
        expect(screen.getByText(/Test error/)).toBeInTheDocument()
    })

    it('disables submit button when loading', async () => {
        const mockFormularError = {
            ...mockFormular,
            submit: jest.fn()
        }
        const onSubmit = jest.fn()
        render(
            <FormularForm formular={mockFormularError as any} onSubmit={onSubmit} isloading={true}>
                <div>Field</div>
            </FormularForm>
        )
        const button = screen.getByRole('button', { name: /submit/i })
        await act(async () => {
            fireEvent.click(button)
        })

        expect(button).toHaveAttribute('aria-busy', 'true')
    })

    it('calls notificationManager.accept and dismiss on mount/unmount', () => {
        const { unmount } = render(
            <FormularForm formular={mockFormular as any}>
                <div>Field</div>
            </FormularForm>
        )
        expect(mockNotificationManager.accept).toHaveBeenCalled()
        unmount()
        expect(mockNotificationManager.dismiss).toHaveBeenCalled()
    })
})
