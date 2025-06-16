export const processMaskedValue = function (mask: string, value: string): string {
    // Handle null, undefined, or empty values
    if (!value) {
        return ''
    }

    let processedValue = ''
    let index = 0

    for (let i = 0; i < value.length; i++) {
        if (index >= mask.length) break

        if (mask[index] === '#') {
            /** check if value is numeric */
            if (/\d/.test(value[i])) {
                processedValue += value[i]
                index++
            }
        } else {
            processedValue += mask[index]
            index++
            i-- // go back and check the current character again.
        }
    }

    return processedValue
}
