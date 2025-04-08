/**
 * Generates an array representing the months of a year.
 *
 * @returns {number[]} An array of numbers from 1 to 12, where each number corresponds to a month of the year.
 */
export const getYearMonths = (): number[] => {
    return Array.from({ length: 12 }, (_, i) => i + 1)
}
