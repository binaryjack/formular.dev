export const getPaddedNumber = (num: number, count: number) => num.toString().padStart(count, '0')

export const getDayNumber = (dateStr: string) => new Date(dateStr).getDay()

export const GetMonthDays = (month: number, year: number): number[] => {
    return Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => i + 1)
}
export const GetYearMonths = (): number[] => {
    return Array.from({ length: 12 }, (_, i) => i + 1)
}
export const GetYears = (start: number, end: number): number[] => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start)
}
export const GetMonthNames = (): string[] => {
    return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
}
export const GetDayNames = (): string[] => {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}
export const GetMonthName = (month: number): string => {
    return GetMonthNames()[month]
}
export const GetDayName = (day: number): string => {
    return GetDayNames()[day]
}
export const GetMonthNameByIndex = (index: number): string => {
    return GetMonthNames()[index]
}
export const GetDayNameByIndex = (index: number): string => {
    return GetDayNames()[index]
}
export const GetMonthIndex = (month: string): number => {
    return GetMonthNames().indexOf(month)
}
export const GetDayIndex = (day: string): number => {
    return GetDayNames().indexOf(day)
}
export const GetMonthIndexByName = (month: string): number => {
    return GetMonthNames().indexOf(month)
}
export const GetDayIndexByName = (day: string): number => {
    return GetDayNames().indexOf(day)
}
export const computeGrid = (month: number, year: number): number[][] => {
    const firstDay = new Date(year, month - 1, 1).getDay()
    const lastDay = new Date(year, month, 0).getDate()
    const grid = Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => 0))
    let day = 1
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                grid[i][j] = 0
            } else if (day > lastDay) {
                grid[i][j] = 0
            } else {
                grid[i][j] = day
                day++
            }
        }
    }
    return grid
}
