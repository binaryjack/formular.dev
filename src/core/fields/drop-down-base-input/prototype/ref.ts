import { referencer } from '@core/fields/field-base-input/referencers/referencer'
import { IDropDownInput } from '../drop-down-base-input.types'

export const ref = function (this: IDropDownInput, ref: HTMLInputElement | null) {
    referencer(this, ref)
}
