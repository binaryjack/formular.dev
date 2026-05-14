import { isString } from '@core/framework/utility/is-string'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'

import { TGetter, TSetter } from '../value-manager.types'

export const stringGetter: TGetter<string | null> = (extInput: IExtendedInput): string | null => {
    if (extInput.input.value !== null && !isString(extInput.input.value)) {
        throw new Error(
            `${stringGetter.name}: cannot get he value as string, is not string compatible value: ${JSON.stringify(extInput.input.value)}, field: ${extInput.input?.id}`
        )
    }
    return extInput.input.value as string | null
}

export const stringSetter: TSetter<string | null> = function (
    extInput: IExtendedInput,
    value: any
): void {
    if (extInput.input.value !== null && !isString(value)) {
        throw new Error(
            `${stringSetter.name}: cannot set he value as string, is not boolean string value: ${JSON.stringify(extInput.input?.value)}, field: ${extInput.input?.id}`
        )
    }

    extInput.input.domManager.dmSetValue(extInput.input.id.toString(), value as string | null)
    extInput.input.value = value
}
