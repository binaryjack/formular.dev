import { IInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { MaskedBaseInput } from '@core/input-engine/variants/masked-base/masked-base-input'
import { IMaskedBaseInput } from '@core/input-engine/variants/masked-base/masked-base-input.types'

export const instanciateMaskedBaseInput = (field: IInputBase, mask: string): IMaskedBaseInput => {
    const _maskedInput = new MaskedBaseInput(mask)
    /** Assign base field dependency */
    _maskedInput.input = field
    return _maskedInput
}
