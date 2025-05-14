/**
 * Checks if a given number is null or undefined.
 *
 * @param value - The number to check.
 * @returns True if the number is null or undefined, otherwise false.
 */
export const isNumber = (value?: any): boolean => !Number.isNaN(value)
