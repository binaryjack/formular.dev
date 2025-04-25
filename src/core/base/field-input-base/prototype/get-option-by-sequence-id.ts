import { IFieldInput } from '../field-input.types'

export const getOptionBySequenceId = function (this: IFieldInput, sequenceId: number) {
    if (this.options?.length === 0) {
        this.internalWarning(
            'IFieldInput.getOptionById',
            `there is no options related to the field of type: ${this.type}, name: ${this.name} SequenceId: ${sequenceId}`
        )
        return null
    }
    return this.options.find((o) => o.sequenceId === sequenceId)
}
