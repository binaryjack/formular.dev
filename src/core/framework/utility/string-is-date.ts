export const stringIsDate = (value: string): boolean => {
    if (value === null || value === undefined) {
        return false
    }

    // Reject pure numeric strings (like '0', '123', '-1') as they're not proper date format strings
    // Even though new Date('0') creates a valid date, we want proper date string formats
    if (/^-?\d+$/.test(value.trim())) {
        return false
    }

    const date = new Date(value)
    if (!date) {
        return false
    }

    return !isNaN(date.getTime())
}
