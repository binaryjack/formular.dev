import { conventions } from '@conventions/conventions'
import { DateObject, IDateObject } from '../types/date'

export const tryConvertStringToDateObject = function (value: string): IDateObject | string {
    try {
        const dte = new DateObject()
        if (dte.setFromString) {
            dte.setFromString(value, conventions.dataTypes.date.formatDisplay)
        }
        return dte
    } catch {
        return value
    }
}
