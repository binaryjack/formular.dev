import { referencer } from '@core/field-engine/core/input-base/referencers/referencer'
import { ITextBaseInput } from '../text-base-input.types'

export const ref = function (this: ITextBaseInput, ref: HTMLInputElement | null) {
    if (this.field) {
        referencer(this.field, ref)
    } else {
        console.log('---ISSUE')
    }
}
