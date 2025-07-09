import type { Meta, StoryObj } from '@storybook/react'
import { cx } from 'formular.design.system'
import ValidationResultComponent from './validation-result'

// Sample validation results for demonstration
const createMockValidationResults = (
    fieldName: string,
    state: boolean,
    error?: string,
    guide?: string,
    triggerEventTypes: ('onBlur' | 'onFocus' | 'onChange')[] = ['onBlur']
) => [
    {
        fieldName,
        state,
        error,
        guide,
        triggerEventTypes,
        code: 'MOCK_CODE', // Required field based on error
        name: 'Mock Validation'
    }
]

// Create a wrapper for demonstration purposes
const ValidationResultDemo = ({
    fieldName = 'testField',
    isValid = false,
    isFocus = false,
    error = 'This field is required',
    guide = 'Please enter a valid value',
    triggerEvents = ['onBlur']
}: {
    fieldName?: string
    isValid?: boolean
    isFocus?: boolean
    error?: string
    guide?: string
    triggerEvents?: ('onBlur' | 'onFocus' | 'onChange')[]
}) => {
    const validationResults = createMockValidationResults(
        fieldName,
        isValid,
        error,
        guide,
        triggerEvents
    )

    return (
        <div
            className={cx(
                'p-4 border rounded',
                isValid ? 'border-success-300' : 'border-error-300'
            )}
        >
            <div className={cx('mb-2')}>
                <label className={cx('block text-sm font-medium text-secondary-700 mb-1')}>
                    {fieldName}
                </label>
                <input
                    className={cx(
                        'w-full p-2 border rounded',
                        isValid ? 'border-success-300' : 'border-error-300',
                        isFocus ? 'ring-2 ring-primary-300' : ''
                    )}
                    type="text"
                    placeholder="Sample input field"
                />
            </div>
            <ValidationResultComponent validationResults={validationResults} isFocus={isFocus} />
        </div>
    )
}

const meta: Meta<typeof ValidationResultDemo> = {
    title: 'Components/Form/ValidationResult',
    component: ValidationResultDemo,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A component that displays validation messages for form fields. It can show error messages when a field is invalid and not focused, and guide messages when a field is focused.'
            }
        }
    },
    argTypes: {
        fieldName: { control: 'text' },
        isValid: { control: 'boolean' },
        isFocus: { control: 'boolean' },
        error: { control: 'text' },
        guide: { control: 'text' },
        triggerEvents: {
            control: 'inline-check',
            options: ['onBlur', 'onFocus', 'onChange']
        }
    },
    decorators: [
        (Story) => (
            <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
                <Story />
            </div>
        )
    ]
}

export default meta
type Story = StoryObj<typeof ValidationResultDemo>

// Error state (field is invalid and not focused)
export const ErrorState: Story = {
    args: {
        fieldName: 'username',
        isValid: false,
        isFocus: false,
        error: 'This field is required',
        guide: 'Enter your username',
        triggerEvents: ['onBlur']
    }
}

// Guide state (field is invalid but focused)
export const GuideState: Story = {
    args: {
        fieldName: 'password',
        isValid: false,
        isFocus: true,
        error: 'Password is too short',
        guide: 'Password must be at least 8 characters',
        triggerEvents: ['onFocus', 'onChange']
    }
}

// Valid state (no validation messages)
export const ValidState: Story = {
    args: {
        fieldName: 'email',
        isValid: true,
        isFocus: false,
        error: 'Invalid email format',
        guide: 'Enter a valid email address',
        triggerEvents: ['onBlur']
    }
}

// Multiple trigger events
export const MultipleEvents: Story = {
    args: {
        fieldName: 'address',
        isValid: false,
        isFocus: false,
        error: 'Please enter your address',
        guide: 'Enter your full address',
        triggerEvents: ['onBlur', 'onChange']
    }
}

// All validation states in one view
export const ValidationVariants: Story = {
    render: () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-3">Error State (Unfocused)</h3>
                <ValidationResultDemo
                    fieldName="username"
                    isValid={false}
                    isFocus={false}
                    error="This field is required"
                    guide="Enter your username"
                    triggerEvents={['onBlur']}
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">Guide State (Focused)</h3>
                <ValidationResultDemo
                    fieldName="password"
                    isValid={false}
                    isFocus={true}
                    error="Password is too short"
                    guide="Password must be at least 8 characters"
                    triggerEvents={['onFocus', 'onChange']}
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">Valid State (No Messages)</h3>
                <ValidationResultDemo
                    fieldName="email"
                    isValid={true}
                    isFocus={false}
                    error="Invalid email format"
                    guide="Enter a valid email address"
                    triggerEvents={['onBlur']}
                />
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded'
    }
}
