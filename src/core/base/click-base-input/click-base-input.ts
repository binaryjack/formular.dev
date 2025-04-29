import { IFieldInput } from '../field-base-input/field-input-base-types'
import { IClickBaseInput } from './click-base-input.types'
import { handleOnClicked } from './prototype/handle-on-clicked'
import { ref } from './prototype/ref'
import { register } from './prototype/register'

export const ClickBaseInput = function (this: IClickBaseInput, field: IFieldInput) {
    this.field = field
} as any as IClickBaseInput

Object.assign(ClickBaseInput.prototype, {
    handleOnClicked,
    register,
    ref
})
