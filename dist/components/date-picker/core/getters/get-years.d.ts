/**
 * Generates an array of consecutive years within a specified range.
 *
 * @param start - The starting year of the range (inclusive).
 * @param end - The ending year of the range (inclusive).
 * @returns An array of numbers representing the years from `start` to `end`.
 *
 * @example
 * ```typescript
 * const years = getYears(2020, 2025);
 * console.log(years); // Output: [2020, 2021, 2022, 2023, 2024, 2025]
 * ```
 */
export declare const getYears: (start: number, end: number) => number[];
