import { DateFormatsEnum, DateObject, IDateObject } from '../types/date'

export const stringToDateObject = (value: string, format: DateFormatsEnum): IDateObject | null => {
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

    date?.setFromString?.(value, format)
    return date
}
