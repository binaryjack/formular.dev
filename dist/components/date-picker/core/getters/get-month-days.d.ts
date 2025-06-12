/**
 * Generates an array of day numbers for a given month and year.
 *
 * @param month - The month for which to get the days (1-based, where 1 = January, 12 = December).
 * @param year - The year for which to get the days.
 * @returns An array of numbers representing the days of the specified month.
 *
 * @example
 * ```typescript
 * getMonthDays(2, 2023); // [1, 2, 3, ..., 28]
 * getMonthDays(12, 2023); // [1, 2, 3, ..., 31]
 * ```
 */
export declare const getMonthDays: (month: number, year: number) => number[];
