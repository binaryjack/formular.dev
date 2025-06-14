import { conventions } from '@conventions/conventions'
import { DateObject, IDateObject } from '../types'

export const stringToDateObject = (value: string): IDateObject | null => {
    if (value === null || value === undefined) {
        return null
    }
    const date = new DateObject(undefined, 'temp-date')
    if (!date)
        throw new Error(
            `${
                stringToDateObject.name
            }: cannot get the value as date, is not date compatible value: ${JSON.stringify(value)}`
        )

    date?.setFromString?.(value, conventions.dataTypes.date.formatDisplay)
    return date
}
