export const ErrorIndex = (x: number) => {
    const incrementError = (y: number) => {
        x = x + y
        return x
    }
    return incrementError
}
