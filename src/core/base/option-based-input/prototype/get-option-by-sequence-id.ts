import { IOptionBaseInput } from '../option-based-input'

export const getOptionBySequenceId = function (this: IOptionBaseInput, sequenceId: number) {
    if (this.field.options?.length === 0) {
        this.field.internalWarning(
            'IFieldInput.getOptionById',
            `there is no options related to the field of type: ${this.field.type}, name: ${this.field.name} SequenceId: ${sequenceId}`
        )
        return null
    }
    return this.field.options.find((o) => o.sequenceId === sequenceId)
}
