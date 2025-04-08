import { getMonthNames } from './getMonthNames'

/**
 * Retrieves the index of a given month name from the list of month names.
 *
 * @param month - The name of the month to find the index for.
 * @returns The zero-based index of the month in the list of month names, or -1 if the month is not found.
 */
export const getMonthIndex = (month: string): number => {
    return getMonthNames().indexOf(month)
}
