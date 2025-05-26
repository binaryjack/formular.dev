import { DateObject } from '@components/date-picker/core/date-object.object'
import { IDateObject } from '@components/date-picker/core/models/date-object.models'
import { INDate } from '../schema/descriptor/i-n-date'

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
