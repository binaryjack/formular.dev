import { IOptionBaseInput } from '../option-based-input.types'

export const getOptionById = function (this: IOptionBaseInput, id: string) {
    if (this.field.options?.length === 0) {
        this.field.internalWarning(
            'IFieldInput.getOptionById',
            `there is no options related to the field of type: ${this.field.type}, name: ${this.field.name} `
        )
        return null
    }
    return this.field.options.find((o) => o.id === id)
}
