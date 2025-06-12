import { DatePickerGridModeType } from '../date-picker.types';
/**
 * Calculates the previous date based on the specified grid mode and the current date.
 *
 * @param gridMode - The mode of the date picker grid, which determines the unit to decrement.
 *                   Can be one of the following:
 *                   - 'YEAR': Decrements the year by 1.
 *                   - 'MONTH': Decrements the month by 1.
 *                   - 'DAY': Decrements the day by 1 (default behavior).
 * @param currentDate - The current date from which the previous date is calculated.
 * @returns A new `Date` object representing the previous date based on the specified grid mode.
 */
export declare const getPreviousDate: (gridMode: DatePickerGridModeType, currentDate: Date) => Date;
