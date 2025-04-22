import { IFieldInput } from '../fieldInput.types'

export const tryGetOptionByIdOrValue = function (this: IFieldInput, id: string, value: string) {
    if (this.options?.length === 0) {
        this.internalWarning(
            'IFieldInput.tryGetOptionByIdOrValue',
            `there is no options related to the field of type:  type: ${this.type}, name: ${this.name}`
        )

        return null
    }
    return (
        this.options.find((o) => o.id?.localeCompare?.(id)) ??
        this.options.find((o) => o.value?.localeCompare?.(value))
    )
}
