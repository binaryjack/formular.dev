/**
 * Adjusts a given month number to ensure it falls within the valid range of 0 to 11.
 *
 * @param month - The month number to validate and adjust. It can be any integer.
 * @returns The corrected month number:
 * - Returns 11 if the input month is less than 0.
 * - Returns 0 if the input month is greater than 11.
 * - Returns the input month if it is within the range 0 to 11.
 */
export const getCorrectMonthNumber = (month: number): number =>
    month < 0 ? 11 : month > 11 ? 0 : month
