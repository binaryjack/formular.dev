import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { mockOptions } from './i-options-items.mock'

export const _mockDescriptor: IFieldDescriptor = {
    id: 0,
    name: 'testField',
    label: 'Test Field',
    value: 'test',
    defaultValue: 'super',
    isValid: true,
    isDirty: false,
    isPristine: true,
    isFocus: false,
    objectValue: null,
    type: 'text',
    errors: [],
    guides: [],
    validationOptions: {
        requiredData: {
            required: true,
            error: 'This field is required.',
            guide: 'Please provide a value for this field.'
        },
        minLength: {
            minLength: 3,
            error: 'The value must be at least 3 characters long.',
            guide: 'Enter at least 3 characters.'
        },
        maxLength: {
            maxLength: 10,
            error: 'The value must not exceed 10 characters.',
            guide: 'Enter no more than 10 characters.'
        },
        pattern: {
            pattern: '\\d+',
            error: 'Only numeric values are allowed.',
            guide: 'Enter numbers only.'
        }
    },
    options: mockOptions,
    shouldValidate: true
}
