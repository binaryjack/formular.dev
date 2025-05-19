import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'

export const validationOptionsForRadioMock: IValidationOptions = {
    max: undefined,
    min: undefined,
    maxLength: undefined,
    minLength: undefined,
    pattern: undefined,
    requiredData: {
        required: true,
        error: {
            message: `This field is required!`,
            code: 'required',
            name: 'sandboxField'
        },
        guide: {
            message: `Please provide a value for this field.`,
            code: 'required',
            name: 'sandboxField'
        }
    }
}
