import { IValueManager } from '../value-manager.types'

export const setValueSelect = function (this: IValueManager, value: string) {
    const optionById = this.field?.tryGetOptionBySequenceIdThenIdOrValue(
        Number(value),
        value as string,
        value as string
    )
    if (!optionById) {
        this.field.internalWarning(
            'IFieldInput.setValue',
            `Unable to find the option for this field:  type: ${this.field.type}, name: ${this.field.name} option Id or Value: ${value as string}`
        )
        return
    }
    this.field.value = optionById.id
    this.field.selectedOptionId = optionById.sequenceId
    this.field.domManager?.dmSetValue(this.field.id.toString(), this.field.value as string)
}
