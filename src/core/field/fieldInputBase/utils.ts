import { INDate } from '../../../dependency/schema/descriptor/field.data.date.struct'
import { DateObject } from '../../../dependency/schema/descriptor/field.data.dateobject.type'

/**
 * Converts a given word to PascalCase.
 *
 * @param word - The word to convert.
 * @returns The word converted to PascalCase.
 */
export const toPascal = (word: string): string => {
    return word.replace(/\w+/g, function (w) {
        return w[0].toUpperCase() + w.slice(1).toLowerCase()
    })
}

/**
 * Capitalizes the first letter of a given word.
 *
 * @param word - The word to capitalize.
 * @returns The word with the first letter capitalized.
 */
export const capitalizeFirstLetter = (word: string): string => {
    return word.replace(/\w+/g, function (w) {
        return w[0].toUpperCase() + w.slice(1)
    })
}

/**
 * Checks if a given string is null or empty.
 *
 * @param value - The string to check.
 * @returns True if the string is null or empty, otherwise false.
 */
export const isNullOrEmpty = (value: string | null): boolean => value === null || value === ''

/**
 * Checks if a given string is null, empty, or undefined.
 *
 * @param value - The string to check.
 * @returns True if the string is null, empty, or undefined, otherwise false.
 */
export const isNullEmptyOrUndefined = (value?: string | null): boolean =>
    value === null || value === '' || value === undefined

/**
 * Checks if a given number is null or undefined.
 *
 * @param value - The number to check.
 * @returns True if the number is null or undefined, otherwise false.
 */
export const isNumericNullOrUndefined = (value?: number | null): boolean =>
    value === null || value === undefined

/**
 * Checks if a given boolean is null or undefined.
 *
 * @param value - The boolean to check.
 * @returns True if the boolean is null or undefined, otherwise false.
 */
export const isBooleanNullOrUndefined = (value?: boolean | null): boolean =>
    value === null || value === undefined

/**
 * Checks if a given bigint is null or undefined.
 *
 * @param value - The bigint to check.
 * @returns True if the bigint is null or undefined, otherwise false.
 */
export const isBigIntNullOrUndefined = (value?: bigint | null): boolean =>
    value === null || value === undefined

/**
 * Checks if a given INDate or DateObject is null or undefined.
 *
 * @param value - The INDate or DateObject to check.
 * @returns True if the INDate or DateObject is null or undefined, otherwise false.
 */
export const isNDateNullOrUndefined = (value?: INDate | DateObject | null): boolean =>
    value === null || value === undefined
