import { conventions } from '@components/context/conventions/conventions'
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'

export const validationOptionsMock: IValidationOptions = {
    max: {
        max: 100,
        error: {
            message: `This field requires a value that must not be greater than ${conventions.tokens.validationDataToken1}!`,
            code: 'max',
            name: 'sandboxField'
        },
        guide: {
            message: `Please enter a value less than ${conventions.tokens.validationDataToken1}.`,
            code: 'max',
            name: 'sandboxField'
        }
    },
    min: {
        min: 3,
        error: {
            message: `This field requires a value that must not be less than ${conventions.tokens.validationDataToken1}!`,
            code: 'min',
            name: 'sandboxField'
        },
        guide: {
            message: `Please enter a value greater than ${conventions.tokens.validationDataToken1}.`,
            code: 'min',
            name: 'sandboxField'
        }
    },
    maxLength: {
        maxLength: 3,
        error: {
            message: `This field requires a value with a length not exceeding ${conventions.tokens.validationDataToken1} characters!`,
            code: 'maxLength',
            name: 'sandboxField'
        },
        guide: {
            message: `Please enter a value with fewer than ${conventions.tokens.validationDataToken1} characters.`,
            code: 'maxLength',
            name: 'sandboxField'
        }
    },
    minLength: {
        minLength: 0,
        error: {
            message: `This field requires a value with a length of at least ${conventions.tokens.validationDataToken1} characters!`,
            code: 'minLength',
            name: 'sandboxField'
        },
        guide: {
            message: `Please enter a value with more than ${conventions.tokens.validationDataToken1} characters.`,
            code: 'minLength',
            name: 'sandboxField'
        }
    },
    pattern: {
        pattern: '',
        error: {
            message: `This field requires a value matching the specified pattern!`,
            code: 'pattern',
            name: 'sandboxField'
        },
        guide: {
            message: `Please enter a value that matches the specified pattern.`,
            code: 'pattern',
            name: 'sandboxField'
        }
    },
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
