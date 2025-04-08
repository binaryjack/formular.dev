import { getMonthNames } from './getMonthNames'

/**
 * Retrieves the name of the month corresponding to the given month index.
 *
 * @param month - The zero-based index of the month (0 for January, 1 for February, ..., 11 for December).
 * @returns The name of the month as a string.
 *
 * @throws Will throw an error if the provided month index is out of range or if `getMonthNames` does not return a valid array.
 */
export const getMonthName = (month: number): string => {
    return getMonthNames()[month]
}
