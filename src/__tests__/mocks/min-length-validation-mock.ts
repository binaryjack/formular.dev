import { conventions } from '@components/context/conventions/conventions'

export const minLengthValidationMock = (name: string, value: number) => {
    return {
        minLength: value,
        error: {
            message: `This field requires a value with a length of at least ${conventions.tokens.validationDataToken1} characters!`,
            code: 'minLength',
            name: name
        },
        guide: {
            message: `Please enter a value with more than ${conventions.tokens.validationDataToken1} characters.`,
            code: 'minLength',
            name: name
        }
    }
}
