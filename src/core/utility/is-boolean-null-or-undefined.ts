/**
 * Checks if a given boolean is null or undefined.
 *
 * @param value - The boolean to check.
 * @returns True if the boolean is null or undefined, otherwise false.
 */
export const isBooleanNullOrUndefined = (value?: boolean | null): boolean =>
    value === null || value === undefined
