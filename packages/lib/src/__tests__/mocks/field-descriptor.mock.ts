import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { mockOptions } from './mock-options'

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
        required: {
            value: true,
            error: { message: 'This field is required.', code: 'required', name: 'testField' },
            guide: {
                message: 'Please provide a value for this field.',
                code: 'required',
                name: 'testField'
            }
        },
        minLength: {
            value: 3,
            error: {
                message: 'The value must be at least 3 characters long.',
                code: 'minLength',
                name: ''
            },
            guide: { message: 'Enter at least 3 characters.', code: 'minLength', name: 'testField' }
        },
        maxLength: {
            value: 10,
            error: {
                message: 'The value must not exceed 10 characters.',
                code: 'maxLength',
                name: 'testField'
            },
            guide: {
                message: 'Enter no more than 10 characters.',
                code: 'maxLength',
                name: 'testField'
            }
        },
        pattern: {
            value: /\\d+/,
            error: {
                message: 'Only numeric values are allowed.',
                code: 'pattern',
                name: 'testField'
            },
            guide: { message: 'Enter numbers only.', code: 'pattern', name: 'testField' }
        }
    },
    options: mockOptions,
    shouldValidate: true
}
