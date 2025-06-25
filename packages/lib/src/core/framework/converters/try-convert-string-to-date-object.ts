import { DateFormatsEnum, DateObject, IDateObject } from '../types/date'

export const tryConvertStringToDateObject = function (
    value: string,
    format: DateFormatsEnum
): IDateObject | string {
    try {
        const dte = new DateObject()
        if (dte.setFromString) {
            dte.setFromString(value, format)
        }
        return dte
    } catch {
        return value
    }
}
