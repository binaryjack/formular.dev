import type { Meta, StoryObj } from '@storybook/react'
import { createMockFormular, createMockTextFieldDescriptor } from 'formular.dev.lib'
import FormularForm from '../formular-form/formular-form'
import InputText from './input-text'

// Create mock form with proper field descriptors
const createMockFormWithFields = (fieldDescriptors: any[]) => {
    const formular = createMockFormular(fieldDescriptors)
    return formular
}

// Wrapper component to provide form context
const InputTextWrapper = ({
    fieldName,
    label,
    required = false
}: {
    fieldName: string
    label: string
    required?: boolean
}) => {
    const fieldDescriptor = createMockTextFieldDescriptor(fieldName, {
        label,
        shouldValidate: required
    })

    const formular = createMockFormWithFields([fieldDescriptor])

    return (
        <FormularForm formular={formular as any}>
            <div className="w-full max-w-md">
                <InputText fieldName={fieldName} />
            </div>
        </FormularForm>
    )
}

const meta: Meta<typeof InputTextWrapper> = {
    title: 'Components/Form/InputText',
    component: InputTextWrapper,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A text input component that integrates with the FORMULAR form management system. Provides automatic field binding, real-time validation, keyboard navigation, and accessibility features.'
            }
        }
    },
    argTypes: {
        fieldName: {
            control: 'text',
            description: 'The name of the field as defined in the form schema'
        },
        label: {
            control: 'text',
            description: 'Label text for the input field'
        },
        required: {
            control: 'boolean',
            description: 'Whether the field is required'
        }
    },
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
    args: {
        fieldName: 'username',
        label: 'Username',
        required: false
    }
}

// Required field
export const Required: Story = {
    args: {
        fieldName: 'email',
        label: 'Email Address',
        required: true
    }
}

// Different field types
export const FirstName: Story = {
    args: {
        fieldName: 'firstName',
        label: 'First Name',
        required: true
    }
}

export const LastName: Story = {
    args: {
        fieldName: 'lastName',
        label: 'Last Name',
        required: true
    }
}

export const CompanyName: Story = {
    args: {
        fieldName: 'company',
        label: 'Company Name',
        required: false
    }
}

export const PhoneNumber: Story = {
    args: {
        fieldName: 'phone',
        label: 'Phone Number',
        required: false
    }
}

// Multiple inputs in a form
export const MultipleInputs: Story = {
    render: () => {
        const fieldDescriptors = [
            createMockTextFieldDescriptor('firstName', {
                label: 'First Name',
                shouldValidate: true
            }),
            createMockTextFieldDescriptor('lastName', {
                label: 'Last Name',
                shouldValidate: true
            }),
            createMockTextFieldDescriptor('email', {
                label: 'Email Address',
                shouldValidate: true
            }),
            createMockTextFieldDescriptor('company', {
                label: 'Company Name',
                shouldValidate: false
            })
        ]

        const formular = createMockFormWithFields(fieldDescriptors)

        return (
            <FormularForm formular={formular as any}>
                <div className="w-full max-w-md space-y-4">
                    <InputText fieldName="firstName" />
                    <InputText fieldName="lastName" />
                    <InputText fieldName="email" />
                    <InputText fieldName="company" />
                </div>
            </FormularForm>
        )
    }
}
