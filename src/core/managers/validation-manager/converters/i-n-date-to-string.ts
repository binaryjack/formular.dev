import { conventions } from '@components/context/conventions/conventions'
import { DatePickerFormatsEnum } from '@components/date-picker/core/date-picker.types'
import { INDate } from '@core/framework/schema/descriptor/i-n-date'
import { formatFromNDateToString } from '@core/framework/utility/format-from-n-date-to-string'

export const iNDateToString = (
    value: INDate,
    outputFormat: DatePickerFormatsEnum
): string | null => {
    if (value === null || value === undefined) {
        return null
    }
    if (typeof value === 'object' && 'day' in value && 'month' in value && 'year' in value) {
        return formatFromNDateToString(value, outputFormat, conventions.dataTypes.date.separator)
    }
    throw new Error(
        `${iNDateToString.name}: cannot get the value as date, is not date compatible value: ${JSON.stringify(
            value
        )}`
    )
}
