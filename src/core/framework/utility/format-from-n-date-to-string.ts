import { DatePickerFormatType } from '@components/date-picker/core/date-picker.types'
import { INDate } from '../schema/descriptor/i-n-date'
import { formatYearMonthDayToString } from './format-year-month-day-to-string'

export const formatFromNDateToString = (
    value: INDate | null,
    outputFormat: DatePickerFormatType,
    separator: string
): string | null => {
    if (!value) {
        return null
    }

    return formatYearMonthDayToString(value.year, value.month, value.day, outputFormat, separator)
}
