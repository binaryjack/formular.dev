import { IOptionInput } from '../option-base-input.types'

export const tryGetOptionBySequenceIdThenIdOrValue = function (
    this: IOptionInput,
    sequenceId: number,
    id: string,
    value: string
) {
    if (this.options?.length === 0) {
        this.field().message(
            'warning',
            'IFieldInput.tryGetOptionBySequenceIdThenIdOrValue',
            `there is no options related to the field of type:  type: ${this.type}, name: ${this.name}, sequenceId: ${sequenceId}`
        )

        return null
    }
    return (
        this.options?.find(
            (o) => o.sequenceId === sequenceId || o.id === `${id}` || o.value === value
        ) ?? null
    )
}
