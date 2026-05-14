import {
    DateFormatsEnum,
    ddMMYYYYRegex,
    MMddYYYYRegex,
    yyyyMMDDRegex
} from '@core/framework/types/date/date.types'

export function validateDateFormat(date: string): string | null {
    if (ddMMYYYYRegex.test(date)) {
        return DateFormatsEnum.DD_MM_YYYY
    } else if (MMddYYYYRegex.test(date)) {
        return DateFormatsEnum.MM_DD_YYYY
    } else if (yyyyMMDDRegex.test(date)) {
        return DateFormatsEnum.YYYY_MM_DD
    }

    return null // Invalid format
}
