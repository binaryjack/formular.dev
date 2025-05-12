import { referencer } from '@core/input-engine/core/referencers/referencer'
import { ISelectBaseInput } from '../select-base-input.types'

export const ref = function (this: ISelectBaseInput, ref: HTMLInputElement | null) {
    referencer(this.input, ref)
}
