import { referencer } from '@core/input-engine/core/referencers/referencer'
import { INumericBaseInput } from '../numeric-base-input.types'

export const ref = function (this: INumericBaseInput, ref: HTMLInputElement | null) {
    if (this.input) {
        referencer(this.input, ref)
    } else {
        console.log('---ISSUE')
    }
}
