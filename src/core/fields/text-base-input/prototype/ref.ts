import { ITextInput } from '../text-base-input.types'

export const ref = function (this: ITextInput, ref: HTMLInputElement | null) {
    this.dmRegister(ref)
}
