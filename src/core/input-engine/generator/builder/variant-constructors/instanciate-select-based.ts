import { IInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { IClickBaseInput } from '@core/input-engine/variants/click-base/click-base-input.types'
import { IOptionBaseInput } from '@core/input-engine/variants/option-based/option-base-input.types'
import { SelectBaseInput } from '@core/input-engine/variants/select-base/select-base-input'
import { ISelectBaseInput } from '@core/input-engine/variants/select-base/select-base-input.types'

export const instanciateSelectBasedInput = (
    field: IInputBase,
    clickBase: IClickBaseInput,
    optionBase: IOptionBaseInput
): ISelectBaseInput => {
    const _selectBasedInput = new SelectBaseInput()
    /** Assign base field dependency */
    _selectBasedInput.input = field
    _selectBasedInput.clickBase = clickBase
    _selectBasedInput.optionBase = optionBase
    return _selectBasedInput
}
