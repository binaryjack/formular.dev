import { IValueStrategy } from '../value-strategy.types'

export const setValueSelect = function (this: IValueStrategy, value: string) {
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
    this.field.dom?.dmSetValue(this.field.id.toString(), this.field.value as string)
}
