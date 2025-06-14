import { DateObject } from '../types/date/date-object.object'
import { IDateObject } from '../types/date/i-date-object'
import { INDate } from '../types/date/i-n-date'

export const tryConvertINDateToDateObject = function (value: any): IDateObject | string {
    try {
        const dte = new DateObject()
        if (dte.setFromString) {
            dte?.setFromObject?.(value as unknown as INDate)
        }
        return dte
    } catch {
        return value
    }
}
