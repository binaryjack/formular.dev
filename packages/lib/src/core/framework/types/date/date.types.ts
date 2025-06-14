/**
 * Explanation:
        ([0-2][0-9]|3[0-1]): Matches days 01 to 31.
        ([-/]): Captures the separator (- or /) and ensures consistency.
        ([0][1-9]|1[0-2]): Matches months 01 to 12.
        \2: Ensures the same separator is used.
        (\d{4}): Matches a 4-digit year.
 */
export const ddMMYYYYRegex = /^([0-2][0-9]|3[0-1])([-/])([0][1-9]|1[0-2])\2(\d{4})$/

/**Explanation:
        ([0][1-9]|1[0-2]): Matches months 01 to 12.
        ([-/]): Captures the separator (- or /) and ensures consistency.
        ([0-2][0-9]|3[0-1]): Matches days 01 to 31.
        \2: Ensures the same separator is used.
        (\d{4}): Matches a 4-digit year.
 */
export const MMddYYYYRegex = /^([0][1-9]|1[0-2])([-/])([0-2][0-9]|3[0-1])\2(\d{4})$/

/**
 * Explanation:
        (\d{4}): Matches a 4-digit year.
        ([-/]): Captures the separator (- or /) and ensures consistency.
        ([0][1-9]|1[0-2]): Matches months 01 to 12.
        \2: Ensures the same separator is used.
        ([0-2][0-9]|3[0-1]): Matches days 01 to 31.
 */
export const yyyyMMDDRegex = /^(\d{4})([-/])([0][1-9]|1[0-2])\2([0-2][0-9]|3[0-1])$/

export enum DateFormatsEnum {
    DD_MM_YYYY = 'dd/mm/yyyy',
    MM_DD_YYYY = 'mm/dd/yyyy',
    YYYY_MM_DD = 'yyyy/mm/dd'
}
