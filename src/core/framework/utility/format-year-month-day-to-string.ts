import { DatePickerFormatType } from '@components/date-picker/core/date-picker.types'

export const formatYearMonthDayToString = (
    year: number,
    month: number,
    day: number,
    outputFormat: DatePickerFormatType,
    separator: string
): string | null => {
    switch (outputFormat) {
        case 'YYYY-MM-DD':
            return `${year}${separator}${String(month).padStart(2, '0')}${separator}${String(day).padStart(2, '0')}`
        case 'MM-DD-YYYY':
            return `${String(month).padStart(2, '0')}${separator}${String(day).padStart(2, '0')}${separator}${year}`
        case 'DD-MM-YYYY':
        default:
            return `${String(day).padStart(2, '0')}${separator}${String(month).padStart(2, '0')}${separator}${year}`
    }
}
