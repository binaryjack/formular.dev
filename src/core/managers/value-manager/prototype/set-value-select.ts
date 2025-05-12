import { IValueManager } from '../value-manager.types'

export const setValueSelect = function (this: IValueManager, value: string) {
    const optionById = this.input?.tryGetOptionBySequenceIdThenIdOrValue(
        Number(value),
        value as string,
        value as string
    )
    if (!optionById) {
        this.input.internalWarning(
            'IFieldInput.setValue',
            `Unable to find the option for this field:  type: ${this.input.type}, name: ${this.input.name} option Id or Value: ${value as string}`
        )
        return
    }
    this.input.value = optionById.id
    this.input.selectedOptionId = optionById.sequenceId
    this.input.domManager?.dmSetValue(this.input.id.toString(), this.input.value as string)
}
