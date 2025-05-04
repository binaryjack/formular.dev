import { referencer } from '@core/fields/field-base-input/referencers/referencer'
import { ITextBaseInput } from '../text-base-input.types'

export const ref = function (this: ITextBaseInput, ref: HTMLInputElement | null) {
    referencer(this, ref)
}
