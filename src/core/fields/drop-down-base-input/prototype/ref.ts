import { IDropDownInput } from '../drop-down-base-input.types'

export const ref = function (this: IDropDownInput, ref: HTMLInputElement | null) {
    this._field._dom?.dmRegister(ref)
}
