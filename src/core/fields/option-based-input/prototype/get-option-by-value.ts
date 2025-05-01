import { IOptionInput } from '../option-base-input.types'

export const getOptionByValue = function (this: IOptionInput, value: string) {
    if (this.options?.length === 0) {
        this.internalWarning(
            'IFieldInput.getOptionByValue',
            `there is no options related to the field of type: ${this.type}, name: ${this.name} `
        )
        return null
    }
    return this.options.find((o) => o.value === value)
}
