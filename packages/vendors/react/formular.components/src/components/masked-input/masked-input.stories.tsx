import type { Meta, StoryObj } from '@storybook/react'
import MaskedInput from './masked-input'

const meta: Meta<typeof MaskedInput> = {
    title: 'Components/Form/MaskedInput',
    component: MaskedInput,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A masked input component that formats user input according to a specified mask pattern. Useful for phone numbers, dates, SSNs, and other formatted inputs.'
            }
        }
    },
    argTypes: {
        mask: {
            control: 'text',
            description: 'Mask format pattern (e.g., "999-999-9999" for phone numbers)'
        },
        value: {
            control: 'text',
            description: 'Current input value'
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text'
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes'
        }
    }
}

export default meta
type Story = StoryObj<typeof MaskedInput>

// Phone number format
export const PhoneNumber: Story = {
    args: {
        mask: '999-999-9999',
        placeholder: '123-456-7890',
        className:
            'border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
    }
}

// Social Security Number format
export const SSN: Story = {
    args: {
        mask: '999-99-9999',
        placeholder: '123-45-6789',
        className:
            'border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
    }
}

// Date format
export const DateFormat: Story = {
    args: {
        mask: '99/99/9999',
        placeholder: 'MM/DD/YYYY',
        className:
            'border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
    }
}

// Credit card format
export const CreditCard: Story = {
    args: {
        mask: '9999-9999-9999-9999',
        placeholder: '1234-5678-9012-3456',
        className:
            'border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
    }
}

// Custom mask showcase
export const CustomMasks: Story = {
    render: () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Common Masked Input Formats</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <div className="block text-sm font-medium text-gray-700">Phone Number</div>
                        <MaskedInput
                            mask="999-999-9999"
                            placeholder="123-456-7890"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="block text-sm font-medium text-gray-700">
                            Social Security Number
                        </div>
                        <MaskedInput
                            mask="999-99-9999"
                            placeholder="123-45-6789"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="block text-sm font-medium text-gray-700">
                            Date (MM/DD/YYYY)
                        </div>
                        <MaskedInput
                            mask="99/99/9999"
                            placeholder="MM/DD/YYYY"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="block text-sm font-medium text-gray-700">Credit Card</div>
                        <MaskedInput
                            mask="9999-9999-9999-9999"
                            placeholder="1234-5678-9012-3456"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="block text-sm font-medium text-gray-700">ZIP Code</div>
                        <MaskedInput
                            mask="99999-9999"
                            placeholder="12345-6789"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="block text-sm font-medium text-gray-700">Time (HH:MM)</div>
                        <MaskedInput
                            mask="99:99"
                            placeholder="12:30"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Interactive example with onChange
export const WithOnChange: Story = {
    render: () => {
        const handleChange = (value: string) => {
            console.log('Masked input value:', value)
        }

        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Interactive Example</h3>
                <p className="text-sm text-gray-600">
                    Type in the input below and check the console for formatted values.
                </p>
                <div className="space-y-2">
                    <div className="block text-sm font-medium text-gray-700">Phone Number</div>
                    <MaskedInput
                        mask="999-999-9999"
                        placeholder="Enter phone number"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>
        )
    }
}
