import { IFieldInput } from '../field-base-input/field-input-base-types'
import { ITextBaseInput } from './text-base-input.types'

export const TextBaseInput = function (this: ITextBaseInput, field: IFieldInput) {
    this.field = field

    // Setup field input
} as any as ITextBaseInput

Object.assign(TextBaseInput.prototype, {
    handleOnChange,
    register,
    ref
})
