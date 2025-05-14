import { isBoolean } from '@core/framework/utility/is-boolean'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { TGetter, TSetter } from '../value-manager.types'

export const booleanGetter: TGetter<boolean | null> = (exfield: IExtendedInput): boolean | null => {
    if (!isBoolean(exfield.input.value)) {
        throw new Error(
            `${booleanGetter.name}: cannot get he value as boolea, is not boolean compatible value: ${JSON.stringify(exfield.input.value)}, field: ${exfield.input?.id}`
        )
    }
    return exfield.input.value as boolean | null
}

export const booleanSetter: TSetter<boolean | null> = function (
    exfield: IExtendedInput,
    value: boolean | null
) {
    if (!isBoolean(value)) {
        throw new Error(
            `${booleanSetter.name}: cannot set he value as boolea, is not boolean compatible value: ${JSON.stringify(exfield.input?.value)}, field: ${exfield.input?.id}`
        )
    }
    exfield.checked = value ?? false
    exfield.input.domManager.dmSetChecked(exfield.input.id.toString(), value ?? false)
    exfield.input.value = value
}
