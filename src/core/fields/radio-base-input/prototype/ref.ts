import { referencer } from '@core/fields/field-base-input/referencers/referencer'
import { IRadioBaseInput } from '../radio-base-input.types'

export const ref = function (this: IRadioBaseInput, ref: HTMLInputElement | null) {
    referencer(this, ref)
}
