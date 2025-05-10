import { ICheckBoxBaseInput } from './check-box-base-input.types'

import { handleOnChanged } from './prototype/handle-on-changed'
import { initialize } from './prototype/initialize'

export const CheckBoxInput = function (this: ICheckBoxBaseInput) {
    this.isInitialized = false
    this.dependencyName = CheckBoxInput.name
} as any as ICheckBoxBaseInput

Object.assign(CheckBoxInput.prototype, {
    handleOnChanged,
    initialize
})
