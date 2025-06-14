/**
 * Checks if a given string is null, empty, or undefined.
 *
 * @param value - The string to check.
 * @returns True if the string is null, empty, or undefined, otherwise false.
 */
export const isNullEmptyOrUndefined = (value?: unknown): boolean =>
    value === null || value === '' || value === undefined
