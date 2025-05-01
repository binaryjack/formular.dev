import { IDropDownBaseInput } from './drop-down-base-input.types'
import { getValue } from './prototype/get-value'

import { handleOnChanged } from './prototype/handle-on-changed'
import { handleOnClick } from './prototype/handle-on-click'
import { handleOnSelected } from './prototype/handle-on-selected'
import { initializeClickOptionsBased } from './prototype/initialize-click-options-based'
import { initializeOptionBasedOnly } from './prototype/initialize-options-based-only'
import { onSelectItem } from './prototype/on-select-item'
import { ref } from './prototype/ref'
import { refOption } from './prototype/ref-option'
import { register } from './prototype/register'
import { registerOption } from './prototype/register-option'
import { setValue } from './prototype/set-value'

export const DropDownBaseInput = function (this: IDropDownBaseInput) {} as any as IDropDownBaseInput

Object.assign(DropDownBaseInput.prototype, {
    initializeOptionBasedOnly,
    initializeClickOptionsBased,
    handleOnChanged,
    handleOnClick,
    handleOnSelected,
    ref,
    register,
    refOption,
    registerOption,
    onSelectItem,
    getValue,
    setValue
})
