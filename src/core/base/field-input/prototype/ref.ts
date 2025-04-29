import { IFieldInput } from '../field-input.types'

export const ref = function (this: IFieldInput, ref: HTMLInputElement | null) {
    this.dmRegister(ref)
}
