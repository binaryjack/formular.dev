import { IDatePickerRow } from '../models/date-picker.models';
/**
 * Computes a grid of days for a date picker, organized into rows of weeks.
 * The grid includes days from the previous month, the current month, and the next month
 * to ensure all weeks are fully populated.
 *
 * @param dte - The date for which the days grid is computed. The month and year of this date
 *              determine the current month in the grid.
 * @returns An array of rows, where each row represents a week and contains the days
 *          (including previous and next month's days) as part of the grid.
 */
export declare const computeDaysGrid: (dte: Date) => IDatePickerRow[];
