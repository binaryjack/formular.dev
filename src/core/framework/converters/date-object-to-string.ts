import { DateFormatsEnum } from '@core/framework/types/date/date.types'
import { IDateObject } from '../types/date/i-date-object'

export const dateObjectToString = (
    value: IDateObject,
    outputFormat: DateFormatsEnum
): string | null => {
    if (value === null || value === undefined) {
        return null
    }
    return value.toString?.(outputFormat) ?? null
}
