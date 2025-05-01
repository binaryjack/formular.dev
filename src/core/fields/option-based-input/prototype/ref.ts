import { IOptionInput } from '../option-base-input.types'

export const ref = function (this: IOptionInput, ref: HTMLInputElement | null) {
    this.dmRegister(ref)
}
