import { IDatePickerRow } from '../models/date-picker.models';
/**
 * Computes a grid of years centered around the given date's year.
 * The grid includes the current year, a range of previous years, and a range of next years.
 * The years are organized into rows, each containing a fixed number of columns.
 *
 * @param date - The reference date used to determine the current year.
 * @returns An array of rows, where each row contains cells representing years.
 *          Each cell includes metadata indicating whether the year belongs to the
 *          previous, current, or next scope.
 */
export declare const computeYearsGrid: (date: Date) => IDatePickerRow[];
