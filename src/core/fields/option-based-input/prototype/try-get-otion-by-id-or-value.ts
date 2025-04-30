import { IOptionBaseInput } from '../option-based-input.types'

export const tryGetOptionByIdOrValue = function (
    this: IOptionBaseInput,
    id: string,
    value: string
) {
    if (this.field.options?.length === 0) {
        this.field?._tracker?.internalWarning(
            'IFieldInput.tryGetOptionByIdOrValue',
            `there is no options related to the field of type: ${this.field.type}, name: ${this.field.name}`
        )

        return null
    }

    return this.field.options?.find((o) => o.id === `${id}` || o.value === value) ?? null
}
