import { TGetter, TSetter } from '../value-manager.types'

import { isString } from '@core/framework/utility/is-string'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'

export const stringGetter: TGetter<string | null> = (exfield: IExtendedInput): string | null => {
    if (exfield.input.value !== null && !isString(exfield.input.value)) {
        throw new Error(
            `${stringGetter.name}: cannot get he value as string, is not string compatible value: ${JSON.stringify(exfield.input.value)}, field: ${exfield.input?.id}`
        )
    }
    return exfield.input.value as string | null
}

export const stringSetter: TSetter<string | null> = function (
    exfield: IExtendedInput,
    value: any
): void {
    if (exfield.input.value !== null && !isString(value)) {
        throw new Error(
            `${stringSetter.name}: cannot set he value as string, is not boolean string value: ${JSON.stringify(exfield.input?.value)}, field: ${exfield.input?.id}`
        )
    }

    exfield.input.domManager.dmSetValue(exfield.input.id.toString(), value as string | null)
    exfield.input.value = value
}
