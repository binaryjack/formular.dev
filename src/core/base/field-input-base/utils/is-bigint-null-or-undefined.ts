/**
 * Checks if a given bigint is null or undefined.
 *
 * @param value - The bigint to check.
 * @returns True if the bigint is null or undefined, otherwise false.
 */
export const isBigIntNullOrUndefined = (value?: bigint | null): boolean =>
    value === null || value === undefined
