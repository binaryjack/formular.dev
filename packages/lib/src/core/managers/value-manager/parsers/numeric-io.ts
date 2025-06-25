import { isNumber } from '@core/framework/utility/is-number'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'

import { TGetter, TSetter } from '../value-manager.types'

export const numericGetter: TGetter<number | null> = (extInput: IExtendedInput): number | null => {
    if (extInput.input.value !== null && !isNumber(extInput.input.value)) {
        throw new Error(
            `${numericGetter.name}: cannot get the value as number, is not number compatible value: ${JSON.stringify(extInput.input.value)}, field: ${extInput.input?.id}`
        )
    }
    return extInput.input.value as number | null
}

export const numericSetter: TSetter<number | null> = function (
    extInput: IExtendedInput,
    value: any | null
) {
    if ((value !== null || value !== undefined) && !isNumber(value)) {
        throw new Error(
            `${numericGetter.name}: cannot set the value as number, is not number compatible value: ${JSON.stringify(extInput.input.value)}, field: ${extInput.input?.id}`
        )
    }
    extInput.input.domManager.dmSetValue(extInput.input.id.toString(), value)
    extInput.input.value = value
}
