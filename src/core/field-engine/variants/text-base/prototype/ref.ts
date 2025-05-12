import { referencer } from '@core/field-engine/core/referencers/referencer'
import { ITextBaseInput } from '../text-base-input.types'

export const ref = function (this: ITextBaseInput, ref: HTMLInputElement | null) {
    if (this.input) {
        referencer(this.input, ref)
    } else {
        console.log('---ISSUE')
    }
}
