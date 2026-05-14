/**
 * Generates a timestamp string in the format `YYYYMMDD` from a given Date object.
 *
 * @param date - The Date object to extract the timestamp from.
 * @returns A string representing the date in `YYYYMMDD` format.
 */
export const getTs = (date: Date) =>
    `${date.getFullYear().toString()}${date.getMonth().toString().padStart(2, '0')}${date
        .getDate()
        .toString()
        .padStart(2, '0')}`
