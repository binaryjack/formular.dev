/**
 * Checks if a given boolean is null or undefined.
 *
 * @param value - The boolean to check.
 * @returns True if the boolean is null or undefined, otherwise false.
 */
export const isBoolean = (value?: unknown): boolean => typeof value === 'boolean'
