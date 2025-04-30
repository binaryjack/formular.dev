import { IOptionBaseInput } from '../option-based-input.types'

export const tryGetOptionBySequenceIdThenIdOrValue = function (
    this: IOptionBaseInput,
    sequenceId: number,
    id: string,
    value: string
) {
    if (this.field.options?.length === 0) {
        this.field?._tracker?.internalWarning(
            'IFieldInput.tryGetOptionBySequenceIdThenIdOrValue',
            `there is no options related to the field of type:  type: ${this.field.type}, name: ${this.field.name}, sequenceId: ${sequenceId}`
        )

        return null
    }
    return (
        this.field.options?.find(
            (o) => o.sequenceId === sequenceId || o.id === `${id}` || o.value === value
        ) ?? null
    )
}
