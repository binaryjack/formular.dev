import { DatePickerGridModeType } from '../date-picker.types';
/**
 * Calculates the next date based on the provided grid mode and current date.
 *
 * @param gridMode - The mode of the date picker grid, which determines the unit of increment.
 *                   Can be one of the following:
 *                   - 'YEAR': Increments the year by 1.
 *                   - 'MONTH': Increments the month by 1.
 *                   - 'DAY': Increments the day by 1 (default behavior).
 * @param currentDate - The current date from which the next date will be calculated.
 * @returns A new `Date` object representing the next date based on the specified grid mode.
 */
export declare const getNextDate: (gridMode: DatePickerGridModeType, currentDate: Date) => Date;
