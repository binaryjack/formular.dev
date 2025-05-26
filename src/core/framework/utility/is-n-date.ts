import { DateObject } from '@components/date-picker/core/date-object.object'

/**
 * Checks if a given INDate or DateObject is null or undefined.
 *
 * @param value - The INDate or DateObject to check.
 * @returns True if the INDate or DateObject is null or undefined, otherwise false.
 */
export const isNDate = (value: any | null): boolean => {
    try {
        return (
            !(value instanceof DateObject) && 'day' in value && 'month' in value && 'year' in value
        )
    } catch {
        return false
    }
}
