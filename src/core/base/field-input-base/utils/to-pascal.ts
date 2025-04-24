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
