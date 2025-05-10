import { IOptionBaseInput } from '../option-base-input.types'

export const getOptionById = function (this: IOptionBaseInput, id: string) {
    if (this.options?.length === 0) {
        this.field.message(
            'warning',
            'IFieldInput.getOptionById',
            `there is no options related to the field of type: ${this.field.type}, name: ${this.name} `
        )
        return null
    }
    return this.options.find((o) => o.id === id)
}
