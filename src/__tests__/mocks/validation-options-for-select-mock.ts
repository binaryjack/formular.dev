import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'

export const validationOptionsForSelectMock: IValidationOptions = {
    requiredData: {
        required: true,
        error: {
            message: 'This field is required.',
            code: 'required',
            name: 'selectedOption'
        },
        guide: {
            message: 'Please select an option.',
            code: 'required',
            name: 'selectedOption'
        }
    },
    pattern: {
        pattern: '^[a-zA-Z0-9]*$',
        error: {
            message: 'Invalid selection.',
            code: 'pattern',
            name: 'selectedOption'
        },
        guide: {
            message: 'Please select a valid option.',
            code: 'pattern',
            name: 'selectedOption'
        }
    }
}
