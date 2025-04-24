import { getMonthNames } from './get-month-names'

/**
 * Retrieves the index of a month by its name.
 *
 * @param month - The name of the month to find the index for (e.g., "January", "February").
 * @returns The zero-based index of the month in the year (0 for January, 1 for February, etc.).
 *          Returns -1 if the month name is not found.
 */
export const getMonthIndexByName = (month: string): number => {
    return getMonthNames().indexOf(month)
}
