import { IInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { ClickBaseInput } from '@core/input-engine/variants/click-base/click-base-input'
import { IClickBaseInput } from '@core/input-engine/variants/click-base/click-base-input.types'

export const instanciateClickBasedInput = (field: IInputBase): IClickBaseInput => {
    const _clickBasedInput = new ClickBaseInput()
    /** Assign base field dependency */
    _clickBasedInput.input = field
    return _clickBasedInput
}
