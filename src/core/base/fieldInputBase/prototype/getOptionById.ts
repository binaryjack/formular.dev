import { IFieldInput } from '../fieldInput.types'

export const getOptionById = function (this: IFieldInput, id: string) {
    if (this.options?.length === 0) {
        this.internalWarning(
            'IFieldInput.getOptionById',
            `there is no options related to the field of type: ${this.type}, name: ${this.name} `
        )
        return null
    }
    return this.options.find((o) => o.id?.localeCompare?.(id))
}
