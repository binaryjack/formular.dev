import { referencer } from '@core/fields/field-base-input/referencers/referencer'
import { ISelectBaseInput } from '../select-base-input.types'

export const ref = function (this: ISelectBaseInput, ref: HTMLInputElement | null) {
    referencer(this.field, ref)
}
