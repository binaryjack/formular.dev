import {
    isNDate,
    isNullEmptyOrUndefined,
    tryConvertINDateToDateObject,
    tryConvertStringToDateObject
} from '@core/framework'
import { INDate } from '@core/framework/schema'
import { DateObject } from '@core/framework/types/date/date-object.object'
import { IDateObject } from '@core/framework/types/date/i-date-object'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { logManager } from '@core/managers/log-manager'

import { TGetter, TSetter } from '../value-manager.types'

export const dateGetter: TGetter<string | null> = (extInput: IExtendedInput): string | null => {
    if (!isNullEmptyOrUndefined(extInput.input.objectValue)) {
        if (isNDate(extInput.input.objectValue)) {
            const value = tryConvertINDateToDateObject(extInput.input.objectValue)

            if (value instanceof DateObject) {
                return value.toString?.(extInput.input.culture.dateFormat) ?? null
            }
        }
    }
    return extInput.input.value as string | null
}

export const dateSetter: TSetter<Date | IDateObject | INDate | string | null> = function (
    extInput: IExtendedInput,
    value: any
) {
    try {
        if (typeof value === 'string' && value.length === 10) {
            value = tryConvertStringToDateObject(value, extInput.input.culture.dateFormat)
        }
        if (isNDate(value)) {
            value = tryConvertINDateToDateObject(value)
        }

        if (value instanceof DateObject) {
            const dateString = value.toString?.(extInput.input.culture.dateFormat) ?? null

            extInput.input.domManager.dmSetValue(extInput.input.id.toString(), dateString)
            extInput.input.value = dateString
            extInput.input.objectValue = value?.toINDate?.() ?? null
        } else {
            extInput.input.domManager.dmSetValue(extInput.input.id.toString(), value)
            extInput.input.value = value
            /** keep this object value to null until we have a correct date */
            extInput.input.objectValue = null
        }
    } catch (e: any) {
        logManager(
            undefined,
            'error',
            `Error setting date value for field ${extInput.input.name}: ${e.message}`,
            'dateSetter'
        )
        extInput.input.value = null
        extInput.input.objectValue = null
    }
}
