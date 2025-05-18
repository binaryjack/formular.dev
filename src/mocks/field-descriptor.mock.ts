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
            error: { message: 'This field is required.', code: 'required', name: '' },
            guide: { message: 'Please provide a value for this field.', code: 'required', name: '' }
        },
        minLength: {
            minLength: 3,
            error: {
                message: 'The value must be at least 3 characters long.',
                code: 'required',
                name: ''
            },
            guide: { message: 'Enter at least 3 characters.', code: 'required', name: '' }
        },
        maxLength: {
            maxLength: 10,
            error: {
                message: 'The value must not exceed 10 characters.',
                code: 'required',
                name: ''
            },
            guide: { message: 'Enter no more than 10 characters.', code: 'required', name: '' }
        },
        pattern: {
            pattern: '\\d+',
            error: { message: 'Only numeric values are allowed.', code: 'required', name: '' },
            guide: { message: 'Enter numbers only.', code: 'required', name: '' }
        }
    },
    options: mockOptions,
    shouldValidate: true
}
