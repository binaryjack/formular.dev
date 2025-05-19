import { IInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { IClickBaseInput } from '@core/input-engine/variants/click-base/click-base-input.types'
import { IOptionBaseInput } from '@core/input-engine/variants/option-based/option-base-input.types'
import { RadioBaseInput } from '@core/input-engine/variants/radio-base/radio-base-input'
import { IRadioBaseInput } from '@core/input-engine/variants/radio-base/radio-base-input.types'

export const instanciateRadioBasedInput = (
    field: IInputBase,
    clickBase: IClickBaseInput,
    optionBase: IOptionBaseInput
): IRadioBaseInput => {
    const _radioBasedInput = new RadioBaseInput()
    /** Assign base field dependency */
    _radioBasedInput.input = field
    _radioBasedInput.clickBase = clickBase
    _radioBasedInput.optionBase = optionBase
    return _radioBasedInput
}
