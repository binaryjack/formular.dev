import { IDatePickerCell, IDatePickerOptions } from '../models/date-picker.models';
/**
 * Creates a date picker cell with the specified parameters.
 *
 * @param day - The day of the month for the cell.
 * @param month - The month of the year for the cell (0-based, where 0 = January).
 * @param year - The year for the cell.
 * @param options - Partial options for configuring the date picker cell.
 * @param defineWeekEnds - Optional flag to determine if weekends should be identified.
 * @returns An object representing the date picker cell.
 */
export declare const createCell: (day: number, month: number, year: number, options: Partial<IDatePickerOptions>, defineWeekEnds?: boolean) => IDatePickerCell;
