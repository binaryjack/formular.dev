import { referencer } from '@core/input-engine/core/referencers/referencer'
import { ICheckBoxBaseInput } from '../check-box-base-input.types'

export const ref = function (this: ICheckBoxBaseInput, ref: HTMLInputElement | null) {
    referencer(this.input, ref)
}
