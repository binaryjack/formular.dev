import { IValueStrategy } from '../value-strategy.types'

export const setValueText = function (this: IValueStrategy, value: string) {
    this.field.value = value
    this.field.dmSetValue(this.field.id.toString(), this.field.value as string)
}
