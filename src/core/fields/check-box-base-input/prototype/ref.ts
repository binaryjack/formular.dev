import { referencer } from '@core/fields/field-base-input/referencers/referencer'
import { ICheckBoxInput } from '../check-box-base-input.types'

export const ref = function (this: ICheckBoxInput, ref: HTMLInputElement | null) {
    referencer(this, ref)
}
