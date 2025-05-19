import { IInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { OptionBaseInput } from '@core/input-engine/variants/option-based/option-base-input'
import { IOptionBaseInput } from '@core/input-engine/variants/option-based/option-base-input.types'

export const instanciateOptionBasedInput = (field: IInputBase): IOptionBaseInput => {
    const _optionBasedInput = new OptionBaseInput()
    /** Assign base field dependency */
    _optionBasedInput.input = field
    return _optionBasedInput
}
