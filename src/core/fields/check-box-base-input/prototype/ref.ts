import { ITextInput } from '../check-box-base-input.types'

export const ref = function (this: ITextInput, ref: HTMLInputElement | null) {
    this.dmRegister(ref)
}
