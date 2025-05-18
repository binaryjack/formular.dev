import { IInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { TextBaseInput } from '@core/input-engine/variants/text-base/text-base-input'
import { ITextBaseInput } from '@core/input-engine/variants/text-base/text-base-input.types'

export const instanciateTextBaseInput = (field: IInputBase): ITextBaseInput => {
    const _textInput = new TextBaseInput()
    /** Assign base field dependency */
    _textInput.input = field
    return _textInput
}
