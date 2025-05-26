import { IDateObject } from '@components/date-picker/core/models/date-object.models'
import { INDate } from '@core/framework/schema/descriptor/i-n-date'

import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'

import { conventions } from '@components/context/conventions/conventions'
import { DateObject } from '@components/date-picker/core/date-object.object'
import { tryConvertINDateToDateObject } from '@core/framework/converters/try-convert-in-date-to-date-object'
import { tryConvertStringToDateObject } from '@core/framework/converters/try-convert-string-to-date-object'
import { isNDate } from '@core/framework/utility/is-n-date'
import { isNullEmptyOrUndefined } from '@core/framework/utility/is-null-empty-or-undefined'

import { TGetter, TSetter } from '../value-manager.types'

export const dateGetter: TGetter<string | null> = (exfield: IExtendedInput): string | null => {
    if (!isNullEmptyOrUndefined(exfield.input.objectValue)) {
        if (isNDate(exfield.input.objectValue)) {
            const value = tryConvertINDateToDateObject(exfield.input.objectValue)
            if (value instanceof DateObject) {
                return value.toString?.(conventions.dataTypes.date.formatDisplay) ?? null
            }
        }
    }
    return exfield.input.value as string | null
}

export const dateSetter: TSetter<Date | IDateObject | INDate | string | null> = function (
    exfield: IExtendedInput,
    value: any
) {
    if (typeof value === 'string' && value.length === 10) {
        value = tryConvertStringToDateObject(value)
    }
    if (isNDate(value)) {
        value = tryConvertINDateToDateObject(value)
    }

    if (value instanceof DateObject) {
        const dateString = value.toString?.(conventions.dataTypes.date.formatDisplay) ?? null

        exfield.input.domManager.dmSetValue(exfield.input.id.toString(), dateString)
        exfield.input.value = dateString
        exfield.input.objectValue = value?.toINDate?.() ?? null
    } else {
        exfield.input.domManager.dmSetValue(exfield.input.id.toString(), value)
        exfield.input.value = value
    }
}
