import { isNullEmptyOrUndefined } from '@core/framework/utility/is-null-empty-or-undefined'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'

import { isNumber } from '@core/framework/utility/is-number'
import { TGetter, TSetter } from '../value-manager.types'

export const numericGetter: TGetter<number | null> = (exfield: IExtendedInput): number | null => {
    if (isNullEmptyOrUndefined(exfield.input.objectValue)) {
        return null
    }
    if (isNumber(exfield.input.value)) {
        return exfield.input.value as number | null
    }
    throw new Error(
        `${numericGetter.name}: cannot get the value as number, is not number compatible value: ${JSON.stringify(exfield.input.value)}, field: ${exfield.input?.id}`
    )
}

export const numericSetter: TSetter<number | null> = function (
    exfield: IExtendedInput,
    value: any | null
) {
    if ((value !== null || value !== undefined) && !isNumber(value)) {
        throw new Error(
            `${numericGetter.name}: cannot set the value as number, is not number compatible value: ${JSON.stringify(exfield.input.value)}, field: ${exfield.input?.id}`
        )
    }
    exfield.input.domManager.dmSetValue(exfield.input.id.toString(), value)
    exfield.input.value = value
}
