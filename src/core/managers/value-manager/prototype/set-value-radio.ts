import { IValueManager } from '../value-manager.types'

export const setValueRadio = function (this: IValueManager, value: string) {
    const radioItem = this.input?.tryGetOptionByIdOrValue(value as string, value as string)
    if (!radioItem) {
        this.input.message(
            'error',
            'IFieldInput.setValue',
            `Unable to find the option for this field:  type: ${this.input.type}, name: ${this.input.name} option Id or Value: ${value as string}`
        )
        return
    }
    this.input.value = radioItem.value
    this.input.selectedOptionId = radioItem.sequenceId
    this.input.domManager?.dmSetChecked(radioItem.id, true)
}
