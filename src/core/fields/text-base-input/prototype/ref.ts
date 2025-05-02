import { referencer } from '@core/fields/field-base-input/referencers/referencer'
import { ITextInput } from '../text-base-input.types'

export const ref = function (this: ITextInput, ref: HTMLInputElement | null) {
    referencer(this, ref)
}
