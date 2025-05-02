import { ICheckBoxInput } from '../check-box-base-input.types'

export const ref = function (this: ICheckBoxInput, ref: HTMLInputElement | null) {
    this._field._dom?.dmRegister(ref)
}
