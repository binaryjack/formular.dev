import { conventions } from '@components/context/conventions/conventions'

export const maxLengthValidationMock = (name: string, value: number) => {
    return {
        maxLength: value,
        error: {
            message: `This field requires a value with a length not exceeding ${conventions.tokens.validationDataToken1} characters!`,
            code: 'maxLength',
            name: name
        },
        guide: {
            message: `Please enter a value with fewer than ${conventions.tokens.validationDataToken1} characters.`,
            code: 'maxLength',
            name: name
        }
    }
}
