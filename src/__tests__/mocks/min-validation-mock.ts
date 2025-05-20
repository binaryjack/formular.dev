import { conventions } from '@components/context/conventions/conventions'

export const minValidationMock = (name: string, value: number) => {
    return {
        min: value,
        error: {
            message: `This field requires a value that must not be less than ${conventions.tokens.validationDataToken1}!`,
            code: 'min',
            name: name
        },
        guide: {
            message: `Please enter a value greater than ${conventions.tokens.validationDataToken1}.`,
            code: 'min',
            name: name
        }
    }
}
