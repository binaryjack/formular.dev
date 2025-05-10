import { IOptionBaseInput } from '../option-base-input.types'

export const getOptionByValue = function (this: IOptionBaseInput, value: string) {
    if (this.options?.length === 0) {
        this.field.message(
            'warning',
            'IFieldInput.getOptionByValue',
            `there is no options related to the field of type: ${this.field.type}, name: ${this.name} `
        )
        return null
    }
    return this.options.find((o) => o.value === value)
}
