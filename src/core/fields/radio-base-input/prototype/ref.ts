import { IRadioInput } from '../radio-base-input.types'

export const ref = function (this: IRadioInput, ref: HTMLInputElement | null) {
    this.field().dom()?.dmRegister(ref)
}
