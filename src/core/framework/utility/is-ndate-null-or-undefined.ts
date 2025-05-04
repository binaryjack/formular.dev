import { DateObjectTypes } from '@components/date-picker/core/models/date-object.types'

/**
 * Checks if a given INDate or DateObject is null or undefined.
 *
 * @param value - The INDate or DateObject to check.
 * @returns True if the INDate or DateObject is null or undefined, otherwise false.
 */
export const isNDateNullOrUndefined = (value?: DateObjectTypes): boolean =>
    value === null || value === undefined
