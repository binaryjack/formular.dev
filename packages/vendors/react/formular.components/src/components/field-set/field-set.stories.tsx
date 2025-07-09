import type { Meta, StoryObj } from '@storybook/react'
import { cx } from 'formular.design.system'
import { MdInfoOutline } from 'react-icons/md'
import FieldSet from './field-set'

// Create a simple wrapper for demonstration purposes
const FieldSetDemo = ({
    inputId,
    label,
    type,
    flags,
    hasValidation = false,
    hasItemsDrawer = false,
    hasClear = false
}: {
    inputId: string
    label: string
    type: string
    flags: any
    hasValidation?: boolean
    hasItemsDrawer?: boolean
    hasClear?: boolean
}) => {
    return (
        <FieldSet
            inputId={inputId}
            label={label}
            type={type}
            flags={flags}
            validationChildren={
                hasValidation ? (
                    <div className={cx('text-sm text-error-600 flex items-center')}>
                        <MdInfoOutline className="mr-1" />
                        This field is required
                    </div>
                ) : undefined
            }
            itemsChildren={
                hasItemsDrawer ? (
                    <div className={cx('p-4 bg-white shadow-lg rounded')}>
                        <ul className={cx('space-y-2')}>
                            <li className={cx('hover:bg-primary-50 p-2 rounded cursor-pointer')}>
                                Option 1
                            </li>
                            <li className={cx('hover:bg-primary-50 p-2 rounded cursor-pointer')}>
                                Option 2
                            </li>
                            <li className={cx('hover:bg-primary-50 p-2 rounded cursor-pointer')}>
                                Option 3
                            </li>
                        </ul>
                    </div>
                ) : undefined
            }
            onClear={hasClear ? () => console.log('Clear clicked') : undefined}
            onClick={() => console.log('Field clicked')}
        >
            <div className={cx('border border-secondary-300 rounded p-2')}>
                {type === 'text' && (
                    <input
                        type="text"
                        className={cx('w-full outline-none')}
                        placeholder="Enter text..."
                    />
                )}
                {type === 'select' && (
                    <div className={cx('w-full flex justify-between items-center')}>
                        <span>Select an option...</span>
                        <span>▼</span>
                    </div>
                )}
            </div>
        </FieldSet>
    )
}

const meta: Meta<typeof FieldSetDemo> = {
    title: 'Components/Form/FieldSet',
    component: FieldSetDemo,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'FieldSet is a comprehensive field wrapper component that provides a unified interface for all FORMULAR input fields. It handles layout, labels, validation states, and input controls.'
            }
        }
    },
    argTypes: {
        inputId: { control: 'text' },
        label: { control: 'text' },
        type: {
            control: 'select',
            options: ['text', 'password', 'select', 'radio', 'checkbox']
        },
        flags: { control: 'object' },
        hasValidation: { control: 'boolean' },
        hasItemsDrawer: { control: 'boolean' },
        hasClear: { control: 'boolean' }
    },
    decorators: [
        (Story) => (
            <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
                <Story />
            </div>
        )
    ]
}

export default meta
type Story = StoryObj<typeof FieldSetDemo>

// Base story for a standard text input field
export const Default: Story = {
    args: {
        inputId: 'text-field',
        label: 'Text Field',
        type: 'text',
        flags: {
            valid: true,
            focus: false,
            dirty: false,
            required: false,
            busy: false
        },
        hasValidation: false,
        hasItemsDrawer: false,
        hasClear: true
    }
}

// Field with validation error
export const WithValidationError: Story = {
    args: {
        inputId: 'required-field',
        label: 'Required Field',
        type: 'text',
        flags: {
            valid: false,
            focus: false,
            dirty: true,
            required: true,
            busy: false
        },
        hasValidation: true,
        hasItemsDrawer: false,
        hasClear: true
    }
}

// Field with focus state
export const WithFocus: Story = {
    args: {
        inputId: 'focused-field',
        label: 'Focused Field',
        type: 'text',
        flags: {
            valid: true,
            focus: true,
            dirty: false,
            required: false,
            busy: false
        },
        hasValidation: false,
        hasItemsDrawer: false,
        hasClear: true
    }
}

// Select field with dropdown drawer
export const WithDropdownDrawer: Story = {
    args: {
        inputId: 'select-field',
        label: 'Select Field',
        type: 'select',
        flags: {
            valid: true,
            focus: false,
            dirty: false,
            required: false,
            busy: false
        },
        hasValidation: false,
        hasItemsDrawer: true,
        hasClear: true
    }
}

// Required field
export const RequiredField: Story = {
    args: {
        inputId: 'required-indicator',
        label: 'Required Field',
        type: 'text',
        flags: {
            valid: true,
            focus: false,
            dirty: false,
            required: true,
            busy: false
        },
        hasValidation: false,
        hasItemsDrawer: false,
        hasClear: true
    }
}

// Loading/busy state
export const BusyState: Story = {
    args: {
        inputId: 'busy-field',
        label: 'Loading Data...',
        type: 'text',
        flags: {
            valid: true,
            focus: false,
            dirty: false,
            required: false,
            busy: true
        },
        hasValidation: false,
        hasItemsDrawer: false,
        hasClear: false
    }
}

// All variants in one view
export const FieldSetVariants: Story = {
    render: () => (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-semibold mb-3">Standard Field</h3>
                <FieldSetDemo
                    inputId="standard-field"
                    label="Text Input"
                    type="text"
                    flags={{
                        valid: true,
                        focus: false,
                        dirty: false,
                        required: false,
                        busy: false
                    }}
                    hasClear={true}
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">Field with Focus</h3>
                <FieldSetDemo
                    inputId="focus-field"
                    label="Focused Input"
                    type="text"
                    flags={{
                        valid: true,
                        focus: true,
                        dirty: false,
                        required: false,
                        busy: false
                    }}
                    hasClear={true}
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">Required Field with Error</h3>
                <FieldSetDemo
                    inputId="error-field"
                    label="Required Input"
                    type="text"
                    flags={{
                        valid: false,
                        focus: false,
                        dirty: true,
                        required: true,
                        busy: false
                    }}
                    hasValidation={true}
                    hasClear={true}
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">Select Field with Dropdown</h3>
                <FieldSetDemo
                    inputId="select-field"
                    label="Select Option"
                    type="select"
                    flags={{
                        valid: true,
                        focus: false,
                        dirty: false,
                        required: false,
                        busy: false
                    }}
                    hasItemsDrawer={true}
                    hasClear={true}
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">Busy/Loading Field</h3>
                <FieldSetDemo
                    inputId="busy-field"
                    label="Loading Data..."
                    type="text"
                    flags={{
                        valid: true,
                        focus: false,
                        dirty: false,
                        required: false,
                        busy: true
                    }}
                    hasClear={false}
                />
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded'
    }
}
