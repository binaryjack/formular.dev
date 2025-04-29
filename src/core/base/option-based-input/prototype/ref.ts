import { IOptionBaseInput } from '../option-based-input'

export const ref = function (this: IOptionBaseInput, ref: HTMLInputElement | null) {
    this.field.dmRegister(ref)
}
