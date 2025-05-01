import { IOptionInput } from '../option-base-input.types'

export const getOptionBySequenceId = function (this: IOptionInput, sequenceId: number) {
    if (this.options?.length === 0) {
        this.internalWarning(
            'IFieldInput.getOptionById',
            `there is no options related to the field of type: ${this.type}, name: ${this.name} SequenceId: ${sequenceId}`
        )
        return null
    }
    return this.options.find((o) => o.sequenceId === sequenceId)
}
