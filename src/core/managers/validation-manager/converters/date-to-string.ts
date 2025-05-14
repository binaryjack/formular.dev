import { conventions } from '@components/context/conventions/conventions'
import { DatePickerFormatsEnum } from '@components/date-picker/core/date-picker.types'
import { formatYearMonthDayToString } from '@core/framework/utility/format-year-month-day-to-string'

export const dateToString = (value: Date, outputFormat: DatePickerFormatsEnum): string | null => {
    if (value === null || value === undefined) {
        return null
    }
    const year = value.getFullYear()
    const month = value.getMonth() + 1 // Months are zero-based in JavaScript
    const day = value.getDate()

    return formatYearMonthDayToString(
        year,
        month,
        day,
        outputFormat,
        conventions.dataTypes.date.separator
    )
}
