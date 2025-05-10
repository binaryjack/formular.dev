import { referencer } from '@core/field-engine/core/input-base/referencers/referencer'
import { ICheckBoxBaseInput } from '../check-box-base-input.types'

export const ref = function (this: ICheckBoxBaseInput, ref: HTMLInputElement | null) {
    referencer(this.field, ref)
}
