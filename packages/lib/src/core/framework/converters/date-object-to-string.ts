import { conventions } from '@conventions/conventions'
import { DateFormatsEnum } from '@core/framework/types/date/date.types'
import { IDateObject } from '../types/date/i-date-object'

export const dateObjectToString = (
    value: IDateObject,
    outputFormat: DateFormatsEnum
): string | null => {
    if (value === null || value === undefined) {
        return null
    }
    value.separator = conventions.dataTypes.date.separator
    return value.toString?.(outputFormat) ?? null
}
