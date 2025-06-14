import { IOptionBaseInput } from '../option-base-input.types'

export const getOptionBySequenceId = function (this: IOptionBaseInput, sequenceId: number) {
    if (this.options?.length === 0) {
        this.input.message(
            'warning',
            'IFieldInput.getOptionById',
            `there is no options related to the field of type: ${this.input.type}, name: ${this.name} SequenceId: ${sequenceId}`
        )
        return null
    }
    return this.options.find((o) => o.sequenceId === sequenceId)
}
