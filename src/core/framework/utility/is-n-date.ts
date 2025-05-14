/**
 * Checks if a given INDate or DateObject is null or undefined.
 *
 * @param value - The INDate or DateObject to check.
 * @returns True if the INDate or DateObject is null or undefined, otherwise false.
 */
export const isNDate = (value: any | null): boolean =>
    'day' in value && 'month' in value && 'year' in value
