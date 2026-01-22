import { referencer } from '@core/input-engine/core/referencers/referencer'
import { IMaskedBaseInput } from '../masked-base-input.types'

export const ref = function (this: IMaskedBaseInput, ref: HTMLInputElement | null) {
    if (this.input) {
        referencer(this.input, ref)
    } else {
        console.log('---ISSUE')
    }
}
