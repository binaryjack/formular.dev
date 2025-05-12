import { IValueManager } from '../value-manager.types'

export const setValueCheckBox = function (this: IValueManager, value: boolean) {
    this.input.checked = value
    this.input.dmSetChecked(this.input.id.toString(), value)
    this.input.value = value
}
