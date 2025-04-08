import { getDayNames } from './getDayNames'

/**
 * Retrieves the name of the day corresponding to the given index.
 *
 * @param index - The index of the day (0-based, where 0 typically represents Sunday).
 * @returns The name of the day as a string.
 *
 * @throws Will throw an error if the index is out of bounds or if `getDayNames` does not return a valid array.
 */
export const getDayNameByIndex = (index: number): string => {
    return getDayNames()[index]
}
