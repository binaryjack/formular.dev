import { ITextBaseInput } from '../text-base-input.types'

export const ref = function (this: ITextBaseInput, ref: HTMLInputElement | null) {
    this.field.dmRegister(ref)
}
