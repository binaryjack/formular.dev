import type { Meta, StoryObj } from '@storybook/react'
import { createMockFormular, createMockTextFieldDescriptor } from 'formular.dev.lib'
import FormularForm from '../formular-form/formular-form'
import RadioInput from './radio-input'

// Mock type for option items
type MockOptionItem = {
    id: string | number
    value: string
    text: string
    sequenceId: number
    disabled?: boolean
    selected?: boolean
}

// Create mock options for radio inputs
const createMockOptions = (count: number, prefix = 'Option'): MockOptionItem[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: `${i + 1}`,
        value: `value-${i + 1}`,
        text: `${prefix} ${i + 1}`,
        sequenceId: i,
        disabled: false,
        selected: false
    }))
}

// Create mock form with proper field descriptors
const createMockFormWithRadioField = (
    fieldName: string,
    label: string,
    options: MockOptionItem[],
    required = false,
    defaultValue = ''
) => {
    const fieldDescriptor = createMockTextFieldDescriptor(fieldName, {
        label,
        shouldValidate: required,
        defaultValue
    })

    const formular = createMockFormular([fieldDescriptor])

    // Add option data manually as this is how FORMULAR works with options
    if (formular.fields && formular.fields.indexOf(fieldName as any) > -1) {
        ;(formular.fields as Record<string, any>)[fieldName].optionData = options
    }

    return formular
}

// Wrapper component to provide form context
const RadioInputWrapper = ({
    fieldName,
    label,
    options,
    required = false,
    defaultValue = ''
}: {
    fieldName: string
    label: string
    options: MockOptionItem[]
    required?: boolean
    defaultValue?: string
}) => {
    const formular = createMockFormWithRadioField(fieldName, label, options, required, defaultValue)

    return (
        <FormularForm formular={formular as any}>
            <div className="w-full max-w-md">
                <RadioInput fieldName={fieldName} />
            </div>
        </FormularForm>
    )
}

// Default options for stories
const genderOptions: MockOptionItem[] = [
    { id: '1', value: 'male', text: 'Male', sequenceId: 0, disabled: false, selected: false },
    { id: '2', value: 'female', text: 'Female', sequenceId: 1, disabled: false, selected: false },
    { id: '3', value: 'other', text: 'Other', sequenceId: 2, disabled: false, selected: false }
]

const colorOptions: MockOptionItem[] = [
    { id: '1', value: 'red', text: 'Red', sequenceId: 0, disabled: false, selected: false },
    { id: '2', value: 'green', text: 'Green', sequenceId: 1, disabled: false, selected: false },
    { id: '3', value: 'blue', text: 'Blue', sequenceId: 2, disabled: false, selected: false },
    { id: '4', value: 'yellow', text: 'Yellow', sequenceId: 3, disabled: false, selected: false },
    { id: '5', value: 'purple', text: 'Purple', sequenceId: 4, disabled: false, selected: false }
]

const meta: Meta<typeof RadioInputWrapper> = {
    title: 'Components/Form/RadioInput',
    component: RadioInputWrapper,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A radio button group component that integrates with the FORMULAR form management system. Provides automatic field binding, option management, real-time validation, and accessibility features.'
            }
        }
    },
    argTypes: {
        fieldName: {
            control: 'text',
            description: 'Unique identifier for the radio field'
        },
        label: {
            control: 'text',
            description: 'Label text for the radio group'
        },
        options: {
            control: 'object',
            description: 'Array of option items for the radio group'
        },
        required: {
            control: 'boolean',
            description: 'Whether selecting an option is required'
        },
        defaultValue: {
            control: 'text',
            description: 'Default selected value'
        }
    },
    decorators: [
        (Story) => (
            <div className="p-6 bg-white rounded-lg shadow-md">
                <Story />
            </div>
        )
    ]
}

export default meta
type Story = StoryObj<typeof RadioInputWrapper>

// Default story with gender options
export const Default: Story = {
    args: {
        fieldName: 'gender',
        label: 'Gender',
        options: genderOptions,
        required: false
    }
}

// Required radio group
export const Required: Story = {
    args: {
        fieldName: 'required-gender',
        label: 'Gender (Required)',
        options: genderOptions,
        required: true
    }
}

// Pre-selected option
export const PreSelected: Story = {
    args: {
        fieldName: 'preselected-gender',
        label: 'Gender',
        options: genderOptions,
        defaultValue: 'female'
    }
}

// More options
export const MultipleOptions: Story = {
    args: {
        fieldName: 'favorite-color',
        label: 'Favorite Color',
        options: colorOptions,
        required: false
    }
}

// All stories in one view
export const RadioVariants: Story = {
    render: () => (
        <div className="space-y-10">
            <div>
                <h3 className="text-lg font-semibold mb-3">Standard Radio Group</h3>
                <RadioInputWrapper
                    fieldName="standard-gender"
                    label="Gender"
                    options={genderOptions}
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">Required Radio Group</h3>
                <RadioInputWrapper
                    fieldName="required-gender"
                    label="Gender (Required)"
                    options={genderOptions}
                    required={true}
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">Pre-selected Option</h3>
                <RadioInputWrapper
                    fieldName="preselected-gender"
                    label="Gender"
                    options={genderOptions}
                    defaultValue="female"
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">Multiple Options</h3>
                <RadioInputWrapper
                    fieldName="favorite-color"
                    label="Favorite Color"
                    options={colorOptions}
                />
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded'
    }
}
