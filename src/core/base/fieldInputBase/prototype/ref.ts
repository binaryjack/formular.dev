import { IFieldInput } from '../fieldInput.types'

export const ref = function (this: IFieldInput, ref: HTMLInputElement | null) {
    this.dmRegister(ref)
}
