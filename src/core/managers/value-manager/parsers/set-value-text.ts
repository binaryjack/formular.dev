import { IValueManager } from '../value-manager.types'

export const setValueText = function (this: IValueManager, value: string) {
    this.input.value = value
    this.input.domManager.dmSetValue(this.input.id.toString(), this.input.value as string)
}
