import { isBoolean } from '@core/framework/utility/is-boolean'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'

import { TGetter, TSetter } from '../value-manager.types'

export const booleanGetter: TGetter<boolean | null> = (
    extInput: IExtendedInput
): boolean | null => {
    if (extInput.input.value !== null && !isBoolean(extInput.input.value)) {
        throw new Error(
            `${booleanGetter.name}: cannot get he value as boolea, is not boolean compatible value: ${JSON.stringify(extInput.input.value)}, field: ${extInput.input?.id}`
        )
    }
    return extInput.input.value as boolean | null
}

export const booleanSetter: TSetter<boolean | null> = function (
    extInput: IExtendedInput,
    value: boolean | null
) {
    if (value !== null && !isBoolean(value)) {
        throw new Error(
            `${booleanSetter.name}: cannot set he value as boolea, is not boolean compatible value: ${JSON.stringify(extInput.input?.value)}, field: ${extInput.input?.id}`
        )
    }
    extInput.checked = value ?? false
    extInput.input.domManager.dmSetChecked(extInput.input.id.toString(), value ?? false)
    extInput.input.value = value
}
