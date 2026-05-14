/**
 * Pads a given number with leading zeros to ensure it has a specified minimum length.
 *
 * @param num - The number to be padded.
 * @param count - The desired minimum length of the resulting string.
 * @returns A string representation of the number, padded with leading zeros if necessary.
 */
export const getPaddedNumber = (num: number, count: number) => num.toString().padStart(count, '0')
