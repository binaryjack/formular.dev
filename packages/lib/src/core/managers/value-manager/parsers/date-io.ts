import { conventions } from '@conventions/conventions'
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
    try {
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
            /** keep this object value to null until we have a correct date */
            exfield.input.objectValue = null
        }
    } catch (e: any) {
        logManager(
            undefined,
            'error',
            `Error setting date value for field ${exfield.input.name}: ${e.message}`,
            'dateSetter'
        )
        exfield.input.value = null
        exfield.input.objectValue = null
    }
}
