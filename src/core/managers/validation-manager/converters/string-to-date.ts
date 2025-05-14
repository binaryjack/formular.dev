export const stringToDate = (value: string): Date | null => {
    if (value === null || value === undefined) {
        return null
    }
    const date = new Date(value)
    if (!date)
        throw new Error(
            `${stringToDate.name}: cannot get the value as date, is not date compatible value: ${JSON.stringify(
                value
            )}`
        )

    return date
}
