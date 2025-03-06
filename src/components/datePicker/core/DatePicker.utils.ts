import { INDate } from '../../../dependency/schema/descriptor/field.data.date.struct'
import { DateObject } from './DateObject.objects'
import { DatePickerGridModeType, DatePickerOutputFormatType } from './DatePicker.types'
import { IDatePickerCell, IDatePickerOptions, IDatePickerRow } from './models/DatePicker.models'
import { newCell, newCellsRow, newDatePickerItem } from './models/DatePicker.models.constructors'

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

export const getCorrectMonthNumber = (month: number): number =>
    month < 0 ? 11 : month > 11 ? 0 : month

export const computeDaysGrid = (dte: Date): IDatePickerRow[] => {
    const year = dte.getFullYear()
    const currentMonth = dte.getMonth()
    const daysArray = [1, 2, 3, 4, 5, 6, 0]

    const firstDay = new Date(year, currentMonth, 1).getDay()
    const nextMonthFirstDay = new Date(year, currentMonth + 1, 1).getDay()
    const output: IDatePickerRow[] = []

    // let's find out how many days previews the first day to complete a weekrow with previous month
    const previousDaysRemaining = daysArray.indexOf(firstDay)
    // let's find out how many days remains the last day to complete a weekrow with next months
    const nextMonthDaysRemaining = Math.abs(daysArray.indexOf(nextMonthFirstDay) - daysArray.length)
    // gets the previous month's days
    const previousDays = getPreviousMonthDays(previousDaysRemaining, currentMonth, year)
    // gets the month's days
    const currentDays = getCurrentMonthDays(currentMonth, year)
    // gets the next month's days
    const nextMonthDays = getNextMonthDays(nextMonthDaysRemaining, currentMonth, year)
    // build full grid data combining the three above collections
    const fullGridData = [...previousDays, ...currentDays, ...nextMonthDays]
    // split week rows
    for (let row = 1; row < 7; row++) {
        const weekDays = fullGridData.splice(0, 7)
        const newRow = newCellsRow(row, weekDays)
        output.push(newRow)
    }

    return output
}

export const computeMonthsGrid = (year: number) => {
    const output: IDatePickerRow[] = []
    let rowData: IDatePickerCell[] = []
    let colNumber: number = 0
    let rowNumber: number = 0
    for (let month = 0; month < 11; month++) {
        colNumber++
        const cell = createCell(rowNumber, month, year, {
            isCurrentScope: true
        })
        rowData.push(cell)
        if (colNumber === 4) {
            rowNumber++
            colNumber = 0
            const newRow = newCellsRow(rowNumber, rowData)
            rowData = []
            output.push(newRow)
        }
    }
    return output
}

export const computeYearsGrid = (year: number) => {
    const previousYears: number[] = []
    const nextYears: number[] = []
    for (let p = year - 1; p > year - 13; p--) {
        previousYears.push(p)
    }
    for (let n = year + 1; n < year + 13; n++) {
        nextYears.push(n)
    }

    const allYears = [...previousYears, year, ...nextYears].sort((a, b) => a - b)

    const output: IDatePickerRow[] = []
    let rowData: IDatePickerCell[] = []
    let colNumber: number = 0
    let rowNumber: number = 0
    for (const y of allYears) {
        colNumber++
        const cell = createCell(1, 1, y, {
            isPreviousScope: previousYears.includes(y),
            isCurrentScope: y === year,
            isNextScope: nextYears.includes(y)
        })
        rowData.push(cell)
        if (colNumber === 5) {
            rowNumber++
            colNumber = 0
            const newRow = newCellsRow(rowNumber, rowData)
            rowData = []
            output.push(newRow)
        }
    }

    return output
}

const createCell = (
    day: number,
    month: number,
    year: number,
    options: Partial<IDatePickerOptions>
): IDatePickerCell => {
    const key = `${month}${day}`
    const cDate = new Date(year, month, day)
    const dateObjectInstance = new DateObject(cDate, key)
    const dpItem = newDatePickerItem(key, dateObjectInstance, options)
    return newCell(day, dpItem)
}

const getPreviousMonthDays = (remainingDays: number, currentMonth: number, year: number) => {
    const lastDay = new Date(year, currentMonth, 0).getDate()
    const output: IDatePickerCell[] = []
    if (remainingDays === 0) return output
    for (let i = lastDay; i > 0; i--) {
        const cell = createCell(i, currentMonth, year, {
            isPreviousScope: true
        })

        output.push(cell)
        if (output.length === remainingDays) {
            break
        }
    }
    return output.sort((a, b) => a.id - b.id)
}

const getNextMonthDays = (remainingDays: number, currentMonth: number, year: number) => {
    const output: IDatePickerCell[] = []
    for (let i = 1; i <= remainingDays + 14; i++) {
        const cell = createCell(i, currentMonth + 1, year, {
            isNextScope: true
        })
        output.push(cell)
        // const cDate = new Date(year, nextMonth, i)
        // output.push(newCell(i, `${nextMonth + 1}-${i}`, cDate.getDay(), null))
    }
    return output
}

const getCurrentMonthDays = (month: number, year: number) => {
    //If you provide 0 as the dayValue in Date.setFullYear you get the last day of the previous month:
    const lastDay = new Date(year, month + 1, 0).getDate()
    const output: IDatePickerCell[] = []
    for (let i = 1; i < lastDay + 1; i++) {
        const cell = createCell(i, month, year, {
            isCurrentScope: true
        })
        output.push(cell)
        // const cDate = new Date(year, month, i)
        // output.push(newCell(i, `${month + 1}-${i}`, cDate.getDay(), null))
    }
    return output
}

export const getPreviousDate = (gridMode: DatePickerGridModeType, currentDate: Date) => {
    let _year = currentDate.getFullYear()
    let _month = currentDate.getMonth()
    let _day = currentDate.getDate()

    switch (gridMode) {
        case 'YEAR':
            _year = _year - 1
            break
        case 'MONTH':
            _month = _month - 1
            break
        case 'DAY':
        default:
            _day = _day - 1
            break
    }
    return new Date(_year, _month, _day)
}

export const getNextDate = (gridMode: DatePickerGridModeType, currentDate: Date) => {
    let _year = currentDate.getFullYear()
    let _month = currentDate.getMonth()
    let _day = currentDate.getDate()

    switch (gridMode) {
        case 'YEAR':
            _year = _year + 1
            break
        case 'MONTH':
            _month = _month + 1
            break
        case 'DAY':
        default:
            _day = _day + 1
            break
    }
    return new Date(_year, _month, _day)
}

const getTs = (date: Date) =>
    `${date.getFullYear().toString()}${date.getMonth().toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`

export const formatDate = (date?: INDate, format?: DatePickerOutputFormatType) => {
    if (!date || !format) return ''

    switch (format) {
        case 'yyyy/mm/dd':
            return `${date?.year}-${date?.month.toString().padStart(2, '0')}-${date?.day.toString().padStart(2, '0')}`

        case 'mm/dd/yyyy':
            return `${date?.month.toString().padStart(2, '0')}-${date?.day.toString().padStart(2, '0')}-${date?.year}`

        case 'dd/mm/yyyy':
        default:
            return `${date?.day.toString().padStart(2, '0')}-${date?.month.toString().padStart(2, '0')}-${date?.year}`
    }
}

export const computeRange = (selection: IDatePickerCell[]): IDatePickerCell[] => {
    const output: IDatePickerCell[] = []
    if (selection.length < 2) return output

    const startDateObject = selection[0]
    const endDateObject = selection[1]

    const _sd = startDateObject.item?.date.toDate?.()
    const _ed = endDateObject.item?.date.toDate?.()

    if (!_sd || !_ed) return output

    let newDate = new Date(_sd.getFullYear(), _sd.getMonth(), _sd.getDate())

    while (getTs(newDate) !== getTs(_ed)) {
        newDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1)
        const cell = createCell(newDate.getDate(), newDate.getMonth(), newDate.getFullYear(), {
            isRangeDays: true
        })
        output.push(cell)
    }

    return output
}
