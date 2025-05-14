export const stringIsDate = (value: string): boolean => {
    if (value === null || value === undefined) {
        return false
    }
    const date = new Date(value)
    if (!date) {
        return false
    }

    return !isNaN(date.getTime())
}
