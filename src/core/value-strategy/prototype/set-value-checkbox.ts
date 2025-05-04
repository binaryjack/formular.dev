import { IValueStrategy } from '../value-strategy.types'

export const setValueCheckBox = function (this: IValueStrategy, value: boolean) {
    this.field().checked = value
    this.field().dmSetChecked(this.field().id.toString(), value)
    this.field().value = value
}
