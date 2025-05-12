import { conventions } from '@components/context/conventions/conventions'

export const validationOptionsMock = {
    max: {
        max: 100,
        error: `This field requires a value that must not be greater than ${conventions.tokens.validationDataToken1}!`,
        guide: `please enter a value less than ${conventions.tokens.validationDataToken1}.`
    },
    min: {
        min: 0,
        error: `This field requires a value that must not be less than ${conventions.tokens.validationDataToken1}!`,
        guide: `please enter a value greater than ${conventions.tokens.validationDataToken1}.`
    },
    maxLength: {
        maxLength: 50,
        error: `This field requires a value with a length not exceeding ${conventions.tokens.validationDataToken1} characters!`,
        guide: `please enter a value with fewer than ${conventions.tokens.validationDataToken1} characters.`
    },
    minLength: {
        minLength: 5,
        error: `This field requires a value with a length of at least ${conventions.tokens.validationDataToken1} characters!`,
        guide: `please enter a value with more than ${conventions.tokens.validationDataToken1} characters.`
    },
    pattern: {
        pattern: '',
        error: `This field requires a value matching the specified pattern!`,
        guide: `please enter a value that matches the specified pattern.`
    },
    requiredData: {
        required: false,
        error: `This field is required!`,
        guide: `please provide a value for this field.`
    }
}
