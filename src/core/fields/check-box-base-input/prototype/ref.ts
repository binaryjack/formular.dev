import { referencer } from '@core/fields/field-base-input/referencers/referencer'
import { ICheckBoxBaseInput } from '../check-box-base-input.types'

export const ref = function (this: ICheckBoxBaseInput, ref: HTMLInputElement | null) {
    referencer(this.field, ref)
}
