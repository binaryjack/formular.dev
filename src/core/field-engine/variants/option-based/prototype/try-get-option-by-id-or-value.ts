import { IOptionBaseInput } from '../option-base-input.types'

export const tryGetOptionByIdOrValue = function (
    this: IOptionBaseInput,
    id: string,
    value: string
) {
    if (this.options?.length === 0) {
        this.field.message(
            'warning',
            'IFieldInput.tryGetOptionByIdOrValue',
            `there is no options related to the field of type: ${this.field.type}, name: ${this.name}`
        )

        return null
    }

    return this.options?.find((o) => o.id === `${id}` || o.value === value) ?? null
}
