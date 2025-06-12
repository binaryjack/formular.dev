import { IDatePickerRow } from '../models/date-picker.models';
/**
 * Computes a grid of months for a date picker, organizing months into rows of four.
 *
 * @param date - The reference date used to determine the year and day for the grid.
 * @returns An array of rows, where each row contains cells representing months.
 *
 * Each cell in the grid represents a month and includes metadata such as whether
 * it belongs to the current scope (year). The grid is structured into rows, with
 * each row containing four months.
 */
export declare const computeMonthsGrid: (date: Date) => IDatePickerRow[];
