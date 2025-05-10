import { IValueManager } from '../value-manager.types'

export const setValueCheckBox = function (this: IValueManager, value: boolean) {
    this.field.checked = value
    this.field.dmSetChecked(this.field.id.toString(), value)
    this.field.value = value
}
