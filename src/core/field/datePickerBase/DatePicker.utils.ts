import {
    IDatePickerCell, IDatePickerRow, newCell,
    newCellsRow,
} from './DatePicker.types';

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
export const computeGrid = (month: number, year: number): IDatePickerRow[] => {
    const firstDay = new Date(year, month, 1).getDay()
    const nextMonthFirstDay = new Date(year, month + 1, 1).getDay()
    const output: IDatePickerRow[] = []

    // let's find out how many days previews the first day to complete a weekrow with previous month
    const previousDaysRemaining = firstDay - 1 === 0 ? firstDay : firstDay - 1
    // let's find out how many days remains the last day to complete a weekrow with next months
    const nextMonthDaysRemaining = Math.abs(nextMonthFirstDay - 7)
    let day = 1
    const maxRows = 7 // 1 based

    // gets the previous month's days
    const previousDays = getPreviousMonthDays(previousDaysRemaining, month - 1, year)
    // gets the month's days
    const currentDays = getCurrentMonthDays(month, year)
    // gets the next month's days
    const nextMonthDays = getNextMonthDays(nextMonthDaysRemaining, month + 1, year)

    const fullGridData = [...previousDays, ...currentDays, ...nextMonthDays]

    for (let row = day; row < 6; row++) {
        const weekDays = fullGridData.splice(0, 7)
        const newRow = newCellsRow(row, weekDays)
        output.push(newRow)
    }

    return output
}

const getPreviousMonthDays = (remainingDays: number, previousMonth: number, year: number) => {
    const lastDay = new Date(year, previousMonth, 0).getDate()
    const output: IDatePickerCell[] = []
    for (let i = lastDay; i > 0; i--) {
        const cDate = new Date(year, previousMonth, i)
        output.push(newCell(i, `${previousMonth + 1}-${i}`, cDate.getDay(), null))
        if (output.length === remainingDays) {
            break
        }
    }
    return output.sort((a, b) => a.id - b.id)
}

const getNextMonthDays = (remainingDays: number, nextMonth: number, year: number) => {
    const output: IDatePickerCell[] = []
    for (let i = 1; i <= remainingDays + 1; i++) {
        const cDate = new Date(year, nextMonth, i)
        output.push(newCell(i, `${nextMonth + 1}-${i}`, cDate.getDay(), null))
    }
    return output
}

const getCurrentMonthDays = (month: number, year: number) => {
    //If you provide 0 as the dayValue in Date.setFullYear you get the last day of the previous month:
    const lastDay = new Date(year, month + 1, 0).getDate()
    const output: IDatePickerCell[] = []
    for (let i = 1; i < lastDay + 1; i++) {
        const cDate = new Date(year, month, i)
        output.push(newCell(i, `${month + 1}-${i}`, cDate.getDay(), null))
    }
    return output
}
