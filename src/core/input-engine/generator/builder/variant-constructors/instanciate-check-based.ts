import { IInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { CheckBoxInput } from '@core/input-engine/variants/check-box-base/check-box-base-input'
import { ICheckBoxBaseInput } from '@core/input-engine/variants/check-box-base/check-box-base-input.types'
import { IClickBaseInput } from '@core/input-engine/variants/click-base/click-base-input.types'

export const instanciateCheckBoxInput = (
    field: IInputBase,
    clickBaseInput: IClickBaseInput
): ICheckBoxBaseInput => {
    const _checkBoxInput = new CheckBoxInput()
    /** Assign base field dependency */
    _checkBoxInput.input = field
    _checkBoxInput.clickBase = clickBaseInput
    return _checkBoxInput
}
