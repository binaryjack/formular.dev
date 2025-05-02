import { referencer } from '@core/fields/field-base-input/referencers/referencer'
import { IRadioInput } from '../radio-base-input.types'

export const ref = function (this: IRadioInput, ref: HTMLInputElement | null) {
    referencer(this, ref)
}
