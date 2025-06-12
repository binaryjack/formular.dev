import { ValueOf } from '../../../style/global.types';
/**
 * Explanation:
        ([0-2][0-9]|3[0-1]): Matches days 01 to 31.
        ([-/]): Captures the separator (- or /) and ensures consistency.
        ([0][1-9]|1[0-2]): Matches months 01 to 12.
        \2: Ensures the same separator is used.
        (\d{4}): Matches a 4-digit year.
 */
export declare const ddMMYYYYRegex: RegExp;
/**Explanation:
        ([0][1-9]|1[0-2]): Matches months 01 to 12.
        ([-/]): Captures the separator (- or /) and ensures consistency.
        ([0-2][0-9]|3[0-1]): Matches days 01 to 31.
        \2: Ensures the same separator is used.
        (\d{4}): Matches a 4-digit year.
 */
export declare const MMddYYYYRegex: RegExp;
/**
 * Explanation:
        (\d{4}): Matches a 4-digit year.
        ([-/]): Captures the separator (- or /) and ensures consistency.
        ([0][1-9]|1[0-2]): Matches months 01 to 12.
        \2: Ensures the same separator is used.
        ([0-2][0-9]|3[0-1]): Matches days 01 to 31.
 */
export declare const yyyyMMDDRegex: RegExp;
export declare enum DatePickerFormatsEnum {
    DD_MM_YYYY = "dd/mm/yyyy",
    MM_DD_YYYY = "mm/dd/yyyy",
    YYYY_MM_DD = "yyyy/mm/dd"
}
export type DatePickerFormatType = ValueOf<DatePickerFormatsEnum>;
export declare const DatePickerFormatArray: string[];
/** indicates  */
export type DatePickerGridModeType = 'YEAR' | 'MONTH' | 'DAY';
export type DatePickerDisplayType = 'DAY' | 'MONTH' | 'YEAR';
export type DatePickerSelectionModeType = 'range' | 'single';
