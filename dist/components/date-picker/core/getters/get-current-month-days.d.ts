import { IDatePickerCell } from '../models/date-picker.models';
/**
 * Generates an array of date picker cells representing all the days in a given month and year.
 *
 * @param month - The zero-based month index (0 for January, 11 for December).
 * @param year - The full year (e.g., 2023).
 * @returns An array of `IDatePickerCell` objects, each representing a day in the specified month.
 *
 * @remarks
 * - The function calculates the number of days in the specified month and year.
 * - Each day is represented as an `IDatePickerCell` object created using the `createCell` function.
 * - The `isCurrentScope` property of each cell is set to `true`.
 */
export declare const getCurrentMonthDays: (month: number, year: number) => IDatePickerCell[];
