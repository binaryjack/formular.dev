import type { Meta, StoryObj } from '@storybook/react'
import { createMockFormular, createMockTextFieldDescriptor } from 'formular.dev.lib'
import FormularForm from '../formular-form/formular-form'
import CheckInput from './check-input'

// Create mock form with proper field descriptors
const createMockFormWithFields = (fieldDescriptors: any[]) => {
    const formular = createMockFormular(fieldDescriptors)
    return formular
}

// Wrapper component to provide form context
const CheckInputWrapper = ({
    fieldName,
    label,
    required = false,
    defaultChecked = false
}: {
    fieldName: string
    label: string
    required?: boolean
    defaultChecked?: boolean
}) => {
    // Use text field descriptor but adapt for checkbox
    const fieldDescriptor = createMockTextFieldDescriptor(fieldName, {
        label,
        shouldValidate: required,
        defaultValue: defaultChecked
    })

    const formular = createMockFormWithFields([fieldDescriptor])

    return (
        <FormularForm formular={formular as any}>
            <div className="w-full max-w-md">
                <CheckInput fieldName={fieldName} />
            </div>
        </FormularForm>
    )
}

const meta: Meta<typeof CheckInputWrapper> = {
    title: 'Components/Form/CheckInput',
    component: CheckInputWrapper,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A checkbox input component that integrates with the FORMULAR form management system. Provides automatic field binding, boolean state management, real-time validation, and accessibility features.'
            }
        }
    },
    argTypes: {
        fieldName: {
            control: 'text',
            description: 'Unique identifier for the checkbox field'
        },
        label: {
            control: 'text',
            description: 'Label text for the checkbox'
        },
        required: {
            control: 'boolean',
            description: 'Whether the checkbox is required'
        },
        defaultChecked: {
            control: 'boolean',
            description: 'Default checked state'
        }
    }
}

export default meta
type Story = StoryObj<typeof CheckInputWrapper>

// Default story
export const Default: Story = {
    args: {
        fieldName: 'default-checkbox',
        label: 'Default Checkbox',
        required: false,
        defaultChecked: false
    }
}

// Required checkbox
export const Required: Story = {
    args: {
        fieldName: 'required-checkbox',
        label: 'Required Checkbox',
        required: true,
        defaultChecked: false
    }
}

// Pre-checked
export const PreChecked: Story = {
    args: {
        fieldName: 'checked-checkbox',
        label: 'Pre-checked Checkbox',
        required: false,
        defaultChecked: true
    }
}

// Different use cases showcase
export const UseCases: Story = {
    render: () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Common Use Cases</h3>

                <div className="space-y-3">
                    <CheckInputWrapper
                        fieldName="agree-terms"
                        label="I agree to the terms and conditions"
                        required={true}
                    />

                    <CheckInputWrapper
                        fieldName="subscribe-newsletter"
                        label="Subscribe to newsletter"
                        required={false}
                    />

                    <CheckInputWrapper
                        fieldName="remember-login"
                        label="Remember my login"
                        defaultChecked={true}
                    />

                    <CheckInputWrapper
                        fieldName="enable-notifications"
                        label="Enable push notifications"
                        required={false}
                    />
                </div>
            </div>
        </div>
    )
}

// Form integration example
export const FormIntegration: Story = {
    render: () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700">Form Integration Example</h3>
            <div className="border border-gray-200 rounded-lg p-6 bg-white">
                <h4 className="text-md font-medium text-gray-800 mb-4">Account Preferences</h4>
                <div className="space-y-4">
                    <CheckInputWrapper
                        fieldName="email-notifications"
                        label="Receive email notifications"
                        defaultChecked={true}
                    />

                    <CheckInputWrapper
                        fieldName="sms-notifications"
                        label="Receive SMS notifications"
                        required={false}
                    />

                    <CheckInputWrapper
                        fieldName="marketing-emails"
                        label="Receive marketing emails"
                        required={false}
                    />

                    <CheckInputWrapper
                        fieldName="privacy-agreement"
                        label="I have read and agree to the privacy policy"
                        required={true}
                    />
                </div>
            </div>
        </div>
    )
}
