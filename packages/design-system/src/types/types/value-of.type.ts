/**
 * Value Of Type
 *
 * Utility type for extracting value types from objects.
 */

export type ValueOfType<T> = T[keyof T]
