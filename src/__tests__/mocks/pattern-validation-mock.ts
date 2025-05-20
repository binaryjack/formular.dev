export const patternValidationMock = (name: string, value: string) => {
    return {
        pattern: value,
        error: {
            message: `This field requires a value matching the specified pattern!`,
            code: 'pattern',
            name: name
        },
        guide: {
            message: `Please enter a value that matches the specified pattern.`,
            code: 'pattern',
            name: name
        }
    }
}
