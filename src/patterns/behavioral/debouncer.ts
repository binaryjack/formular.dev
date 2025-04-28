export const debounce = (func: (...args: any[]) => void, timeFrame: number) => {
    let timer: ReturnType<typeof setTimeout>
    return (...args: any[]) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func(...args)
        }, timeFrame)
    }
}
