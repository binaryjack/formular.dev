import { ISelectBaseInput } from './select-base-input.types'

import { clear } from './prototype/clear'
import { handleOnChanged } from './prototype/handle-on-changed'
import { handleOnClear } from './prototype/handle-on-clear'
import { handleOnSelected } from './prototype/handle-on-selected'
import { initialize } from './prototype/initialize'
import { onSelectItem } from './prototype/on-select-item'
import { ref } from './prototype/ref'
import { register } from './prototype/register'

export const SelectBaseInput = function (this: ISelectBaseInput) {
    this.isInitialized = false
    this.dependencyName = SelectBaseInput.name
} as any as ISelectBaseInput

Object.assign(SelectBaseInput.prototype, {
    initialize,
    handleOnChanged,
    handleOnSelected,
    handleOnClear,
    clear,
    ref,
    register,
    onSelectItem
})
