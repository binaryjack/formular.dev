import { DateObject } from '../types/date/date-object.object'

/**
 * Checks if a given INDate or DateObject is null or undefined.
 *
 * @param value - The INDate or DateObject to check.
 * @returns True if the INDate or DateObject is null or undefined, otherwise false.
 */
export const isDateObject = (value?: unknown): boolean => value instanceof DateObject
