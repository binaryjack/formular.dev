import { conventions } from '@components/context/conventions/conventions'

export const maxValidationMock = (name: string, value: number) => {
    return {
        max: value,
        error: {
            message: `This field requires a value that must not be greater than ${conventions.tokens.validationDataToken1}!`,
            code: 'max',
            name: name
        },
        guide: {
            message: `Please enter a value less than ${conventions.tokens.validationDataToken1}.`,
            code: 'max',
            name: name
        }
    }
}
