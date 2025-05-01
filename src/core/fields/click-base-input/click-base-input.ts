import { IFieldInput } from '../field-base-input/field-input-base-types'
import { IClickInput } from './click-base-input.types'
import { handleOnClicked } from './prototype/handle-on-clicked'
import { initializeInputBased } from './prototype/initialize-input-based'
import { initializeOptionsBased } from './prototype/initialize-option-based'

export const ClickBaseInput = function (this: IClickInput, field: IFieldInput) {
    this.field = field
} as any as IClickInput

Object.assign(ClickBaseInput.prototype, {
    handleOnClicked,
    initializeInputBased,
    initializeOptionsBased
})
