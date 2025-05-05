import { ISelectBaseInput } from './select-base-input.types'

import { assignToInstance } from '@core/framework/utility/assign-to-instance'
import { handleOnChanged } from './prototype/handle-on-changed'
import { handleOnSelected } from './prototype/handle-on-selected'
import { initialize } from './prototype/initialize'
import { onSelectItem } from './prototype/on-select-item'
import { ref } from './prototype/ref'
import { refOption } from './prototype/ref-option'
import { register } from './prototype/register'
import { registerOption } from './prototype/register-option'

export const SelectBaseInput = function (this: ISelectBaseInput) {
    /** */
} as any as ISelectBaseInput

export const SelectBaseInputInstance = function (prototype: object) {
    assignToInstance(prototype, {
        initialize,
        handleOnChanged,
        handleOnSelected,
        ref,
        register,
        refOption,
        registerOption,
        onSelectItem
    })
}

SelectBaseInputInstance(SelectBaseInput.prototype)
