/**
 * Checks if a given value is a proper Date instance.
 *
 * @param value - The value to check.
 * @returns True if the value is a proper Date instance, otherwise false.
 */
export const isDate = (value?: unknown): boolean => {
    // Use instanceof but also check that it has the internal [[Class]] of Date
    // This prevents Object.create(Date.prototype) from returning true
    return value instanceof Date && Object.prototype.toString.call(value) === '[object Date]'
}
