import { INDate } from '../../../../core/framework/schema/descriptor/i-n-date';
import { DatePickerFormatsEnum } from '../date-picker.types';
/**
 * Formats a given date object into a string based on the specified output format.
 *
 * @param date - The date object to format. If not provided, an empty string is returned.
 * @param format - The desired output format for the date. Supported formats are:
 *   - `'yyyy/mm/dd'`: Outputs the date in the format "year-month-day".
 *   - `'mm/dd/yyyy'`: Outputs the date in the format "month-day-year".
 *   - `'dd/mm/yyyy'`: Outputs the date in the format "day-month-year" (default).
 * @returns A formatted date string based on the specified format, or an empty string if
 *          either the date or format is not provided.
 */
export declare const formatDate: (date?: INDate, format?: DatePickerFormatsEnum) => string;
