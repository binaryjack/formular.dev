/**
 * Checks if a given number is null or undefined.
 *
 * @param value - The number to check.
 * @returns True if the number is null or undefined, otherwise false.
 */
export const isNotNumericNullOrUndefined = (value?: number | null): boolean => {
    if (value === null || value === undefined) {
        return true
    }

    const conversionTry = Number(value)

    if (typeof conversionTry !== 'number') {
        return true
    }

    return false
}
