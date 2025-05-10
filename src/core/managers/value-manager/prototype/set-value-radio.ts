import { IValueManager } from '../value-manager.types'

export const setValueRadio = function (this: IValueManager, value: string) {
    const radioItem = this.field?.tryGetOptionByIdOrValue(value as string, value as string)
    if (!radioItem) {
        this.field.message(
            'error',
            'IFieldInput.setValue',
            `Unable to find the option for this field:  type: ${this.field.type}, name: ${this.field.name} option Id or Value: ${value as string}`
        )
        return
    }
    this.field.value = radioItem.value
    this.field.selectedOptionId = radioItem.sequenceId
    this.field.domManager?.dmSetChecked(radioItem.id, true)
}
