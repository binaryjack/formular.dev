import { referencer } from '@core/field-engine/core/referencers/referencer'
import { IRadioBaseInput } from '../radio-base-input.types'

export const ref = function (this: IRadioBaseInput, ref: HTMLInputElement | null) {
    referencer(this.input, ref)
}
