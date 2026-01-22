import { INDate } from '@core/framework/types/date/i-n-date'
import { DateFormatsEnum } from '../types'
import { stringToDateObject } from './string-to-date-object'

export const stringToINDate = (value: string | null, format: DateFormatsEnum): INDate | null => {
    if (value === null || value === undefined || value === '') {
        return null
    }
    const dateObject = stringToDateObject(value, format)
    if (!dateObject)
        throw new Error(
            `${
                stringToINDate.name
            }: cannot get the value as date, is not date compatible value: ${JSON.stringify(value)}`
        )

    return dateObject.toINDate?.() ?? null
}
