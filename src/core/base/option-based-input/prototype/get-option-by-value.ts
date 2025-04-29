import { IOptionBaseInput } from '../option-based-input'

export const getOptionByValue = function (this: IOptionBaseInput, value: string) {
    if (this.field.options?.length === 0) {
        this.field.internalWarning(
            'IFieldInput.getOptionByValue',
            `there is no options related to the field of type: ${this.field.type}, name: ${this.name} `
        )
        return null
    }
    return this.field.options.find((o) => o.value === value)
}
