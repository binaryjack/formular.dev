import { IClickBaseInput } from '../click-base-input.types'

export const ref = function (this: IClickBaseInput, ref: HTMLInputElement | null) {
    this.field.dmRegister(ref)
}
