import { referencer } from '@core/fields/field-base-input/referencers/referencer'
import { ISelectInput } from '../select-base-input.types'

export const ref = function (this: ISelectInput, ref: HTMLInputElement | null) {
    referencer(this, ref)
}
