import { IValueManager } from '../value-manager.types'

export const setValueText = function (this: IValueManager, value: string) {
    this.field.value = value
    this.field.dmSetValue(this.field.id.toString(), this.field.value as string)
}
