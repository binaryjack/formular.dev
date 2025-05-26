import { conventions } from '@components/context/conventions/conventions'
import { DateObject } from '@components/date-picker/core/date-object.object'
import { IDateObject } from '@components/date-picker/core/models/date-object.models'

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
