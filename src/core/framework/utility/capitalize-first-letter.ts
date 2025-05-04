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
