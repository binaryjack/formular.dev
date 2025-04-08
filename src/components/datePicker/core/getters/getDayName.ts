import { getDayNames } from './getDayNames'

/**
 * Retrieves the name of the day corresponding to the given day index.
 *
 * @param day - The index of the day (0-based, where 0 typically represents Sunday).
 * @returns The name of the day as a string.
 *
 * @throws Will throw an error if the day index is out of range or if `getDayNames()` does not return a valid array.
 */
export const getDayName = (day: number): string => {
    return getDayNames()[day]
}
