import { INDate } from '@core/framework/schema/descriptor/i-n-date'
import { stringToDateObject } from './string-to-date-object'

export const stringToINDate = (value: string | null): INDate | null => {
    if (value === null || value === undefined || value === '') {
        return null
    }
    const dateObject = stringToDateObject(value)
    if (!dateObject)
        throw new Error(
            `${stringToINDate.name}: cannot get the value as date, is not date compatible value: ${JSON.stringify(
                value
            )}`
        )

    return dateObject.toINDate?.() ?? null
}
