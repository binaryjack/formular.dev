import {
    DatePickerFormatsEnum,
    ddMMYYYYRegex,
    MMddYYYYRegex,
    yyyyMMDDRegex
} from './DatePicker.types'

export function validateDateFormat(date: string): string | null {
    if (ddMMYYYYRegex.test(date)) {
        return DatePickerFormatsEnum.DD_MM_YYYY
    } else if (MMddYYYYRegex.test(date)) {
        return DatePickerFormatsEnum.MM_DD_YYYY
    } else if (yyyyMMDDRegex.test(date)) {
        return DatePickerFormatsEnum.YYYY_MM_DD
    }

    return null // Invalid format
}
