/**
 * Checks if a given value is a number (excluding NaN).
 *
 * @param value - The value to check.
 * @returns True if the value is a number and not NaN, otherwise false.
 */
export const isNumber = (value?: any): boolean => typeof value === 'number' && !Number.isNaN(value)
