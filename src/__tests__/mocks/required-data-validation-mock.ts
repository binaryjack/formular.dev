export const requiredDataValidationMock = (name: string, value: boolean) => {
    return {
        required: value,
        error: {
            message: `This field is required!`,
            code: 'required',
            name: name
        },
        guide: {
            message: `Please provide a value for this field.`,
            code: 'required',
            name: name
        }
    }
}
