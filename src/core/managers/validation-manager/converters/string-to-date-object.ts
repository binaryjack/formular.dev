import { conventions } from '@components/context/conventions/conventions'
import { DateObject } from '@components/date-picker/core/date-object.object'
import { IDateObject } from '@components/date-picker/core/models/date-object.models'

export const stringToDateObject = (value: string): IDateObject | null => {
    if (value === null || value === undefined) {
        return null
    }
    const date = new DateObject(undefined, 'temp-date')
    if (!date)
        throw new Error(
            `${stringToDateObject.name}: cannot get the value as date, is not date compatible value: ${JSON.stringify(
                value
            )}`
        )

    date?.setFromString?.(value, conventions.dataTypes.date.formatDisplay)
    return date
}
