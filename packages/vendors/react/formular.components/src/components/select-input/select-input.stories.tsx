import type { Meta, StoryObj } from '@storybook/react'
import { cx } from 'formular.design.system'
import { createMockFormular, createMockTextFieldDescriptor } from 'formular.dev.lib'
import FormularForm from '../formular-form/formular-form'
import SelectInput from './select-input'

// Mock type for option items
type MockOptionItem = {
    id: string | number
    value: string
    text: string
    sequenceId: number
    disabled?: boolean
    selected?: boolean
}

// Create mock form with proper field descriptors
const createMockFormWithSelectField = (
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
    if (
        formular.fields &&
        typeof formular.fields === 'object' &&
        formular.fields.hasOwnProperty(fieldName)
    ) {
        ;(formular.fields as any)[fieldName].optionData = options
    }

    return formular
}

// Wrapper component to provide form context
const SelectWrapper = ({
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
    const formular = createMockFormWithSelectField(
        fieldName,
        label,
        options,
        required,
        defaultValue
    )

    return (
        <FormularForm formular={formular as any}>
            <div className={cx('w-full max-w-md')}>
                <SelectInput fieldName={fieldName} />
            </div>
        </FormularForm>
    )
}

// Default options for stories
const countryOptions: MockOptionItem[] = [
    {
        id: '1',
        value: 'us',
        text: 'United States',
        sequenceId: 0,
        disabled: false,
        selected: false
    },
    { id: '2', value: 'ca', text: 'Canada', sequenceId: 1, disabled: false, selected: false },
    { id: '3', value: 'mx', text: 'Mexico', sequenceId: 2, disabled: false, selected: false },
    {
        id: '4',
        value: 'uk',
        text: 'United Kingdom',
        sequenceId: 3,
        disabled: false,
        selected: false
    },
    { id: '5', value: 'fr', text: 'France', sequenceId: 4, disabled: false, selected: false },
    { id: '6', value: 'de', text: 'Germany', sequenceId: 5, disabled: false, selected: false },
    { id: '7', value: 'jp', text: 'Japan', sequenceId: 6, disabled: false, selected: false }
]

// Options with some disabled entries
const countryOptionsWithDisabled: MockOptionItem[] = [
    {
        id: '1',
        value: 'us',
        text: 'United States',
        sequenceId: 0,
        disabled: false,
        selected: false
    },
    { id: '2', value: 'ca', text: 'Canada', sequenceId: 1, disabled: false, selected: false },
    { id: '3', value: 'mx', text: 'Mexico', sequenceId: 2, disabled: true, selected: false },
    {
        id: '4',
        value: 'uk',
        text: 'United Kingdom',
        sequenceId: 3,
        disabled: false,
        selected: false
    },
    { id: '5', value: 'fr', text: 'France', sequenceId: 4, disabled: true, selected: false },
    { id: '6', value: 'de', text: 'Germany', sequenceId: 5, disabled: false, selected: false },
    { id: '7', value: 'jp', text: 'Japan', sequenceId: 6, disabled: false, selected: false }
]

const categoryOptions: MockOptionItem[] = [
    {
        id: '1',
        value: 'electronics',
        text: 'Electronics',
        sequenceId: 0,
        disabled: false,
        selected: false
    },
    {
        id: '2',
        value: 'clothing',
        text: 'Clothing & Apparel',
        sequenceId: 1,
        disabled: false,
        selected: false
    },
    {
        id: '3',
        value: 'home',
        text: 'Home & Garden',
        sequenceId: 2,
        disabled: false,
        selected: false
    },
    {
        id: '4',
        value: 'sports',
        text: 'Sports & Outdoors',
        sequenceId: 3,
        disabled: false,
        selected: false
    },
    {
        id: '5',
        value: 'books',
        text: 'Books & Media',
        sequenceId: 4,
        disabled: false,
        selected: false
    }
]

const meta: Meta<typeof SelectWrapper> = {
    title: 'Components/Form/Select',
    component: SelectWrapper,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
# Select Input Component

A select dropdown component that integrates with the FORMULAR form management system. 

## Features

- **Automatic field binding**: Connects to form state via fieldName
- **Option management**: Handles option data from form schema
- **Real-time validation**: Shows validation errors as defined in form schema
- **Search functionality**: Filter options by typing in the dropdown
- **Accessibility features**: Keyboard navigation and ARIA attributes
- **Design system integration**: Uses design tokens for consistent styling

## Keyboard Navigation

- **Arrow Down**: Opens the dropdown
- **Arrow Up/Down**: Navigate through options when open
- **Enter**: Select the highlighted option
- **Delete**: Clear the current selection
                `
            }
        }
    },
    argTypes: {
        fieldName: {
            control: 'text',
            description: 'Unique identifier for the select field'
        },
        label: {
            control: 'text',
            description: 'Label text for the select field'
        },
        options: {
            control: 'object',
            description: 'Array of option items for the select dropdown'
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
            <div className={cx('p-6 bg-white rounded-lg shadow-md')}>
                <Story />
            </div>
        )
    ]
}

export default meta
type Story = StoryObj<typeof SelectWrapper>

// Default story with country options
export const Default: Story = {
    args: {
        fieldName: 'country',
        label: 'Select Country',
        options: countryOptions,
        required: false
    }
}

// Required select field
export const Required: Story = {
    args: {
        fieldName: 'required-country',
        label: 'Country (Required)',
        options: countryOptions,
        required: true
    }
}

// Pre-selected option
export const PreSelected: Story = {
    args: {
        fieldName: 'preselected-country',
        label: 'Country',
        options: countryOptions,
        defaultValue: 'ca'
    }
}

// Different options
export const Categories: Story = {
    args: {
        fieldName: 'category',
        label: 'Product Category',
        options: categoryOptions,
        required: false
    }
}

// Select with disabled options
export const WithDisabledOptions: Story = {
    args: {
        fieldName: 'countries-with-disabled',
        label: 'Countries (Some Disabled)',
        options: countryOptionsWithDisabled,
        required: false
    },
    parameters: {
        docs: {
            description: {
                story: 'Select component with some options disabled. Mexico and France are not selectable in this example.'
            }
        }
    }
}

// All stories in one view
export const SelectVariants: Story = {
    render: () => (
        <div className={cx('space-y-10')}>
            <div className={cx('p-6 bg-primary-50 rounded-lg')}>
                <h3 className={cx('text-lg font-semibold mb-3 text-primary-800')}>
                    Standard Select
                </h3>
                <p className={cx('text-sm text-secondary-600 mb-4')}>
                    Basic select dropdown with country options.
                </p>
                <SelectWrapper
                    fieldName="standard-country"
                    label="Country"
                    options={countryOptions}
                />
            </div>

            <div className={cx('p-6 bg-error-50 rounded-lg')}>
                <h3 className={cx('text-lg font-semibold mb-3 text-error-800')}>Required Select</h3>
                <p className={cx('text-sm text-secondary-600 mb-4')}>
                    This field is required and will show validation errors if left empty.
                </p>
                <SelectWrapper
                    fieldName="required-country"
                    label="Country (Required)"
                    options={countryOptions}
                    required={true}
                />
            </div>

            <div className={cx('p-6 bg-success-50 rounded-lg')}>
                <h3 className={cx('text-lg font-semibold mb-3 text-success-800')}>
                    Pre-selected Value
                </h3>
                <p className={cx('text-sm text-secondary-600 mb-4')}>
                    Select with a pre-selected value (Canada).
                </p>
                <SelectWrapper
                    fieldName="preselected-country"
                    label="Country"
                    options={countryOptions}
                    defaultValue="ca"
                />
            </div>

            <div className={cx('p-6 bg-secondary-50 rounded-lg')}>
                <h3 className={cx('text-lg font-semibold mb-3 text-secondary-800')}>
                    Category Select
                </h3>
                <p className={cx('text-sm text-secondary-600 mb-4')}>
                    Select with a different set of options (product categories).
                </p>
                <SelectWrapper
                    fieldName="category"
                    label="Product Category"
                    options={categoryOptions}
                />
            </div>

            <div className={cx('p-6 bg-warning-50 rounded-lg')}>
                <h3 className={cx('text-lg font-semibold mb-3 text-warning-800')}>
                    With Disabled Options
                </h3>
                <p className={cx('text-sm text-secondary-600 mb-4')}>
                    Select with some options disabled (Mexico and France cannot be selected).
                </p>
                <SelectWrapper
                    fieldName="disabled-options"
                    label="Countries (Some Disabled)"
                    options={countryOptionsWithDisabled}
                />
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'A comprehensive demonstration of all select field variants using design system tokens.'
            }
        }
    }
}
