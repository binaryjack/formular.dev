import {
    computeDaysGrid,
    computeMonthsGrid,
    computeRange,
    computeYearsGrid,
    formatDate,
    getCorrectMonthNumber,
    GetDayIndex,
    GetDayIndexByName,
    GetDayName,
    GetDayNameByIndex,
    GetDayNames,
    getDayNumber,
    GetMonthDays,
    GetMonthIndex,
    GetMonthIndexByName,
    GetMonthName,
    GetMonthNameByIndex,
    GetMonthNames,
    getNextDate,
    getPreviousDate,
    GetYearMonths,
    GetYears
} from '../src/components/datePicker/core/DatePicker.utils'
import { IDatePickerCell } from '../src/components/datePicker/core/models/DatePicker.models'

describe('DatePicker.utils', () => {
    it('should return the correct day number', () => {
        expect(getDayNumber('2025-03-08')).toBe(6) // Saturday
    })

    it('should return the correct number of days in a month', () => {
        expect(GetMonthDays(2, 2025)).toEqual([
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            25, 26, 27, 28
        ])
    })

    it('should return the correct months of the year', () => {
        expect(GetYearMonths()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    })

    it('should return the correct years range', () => {
        expect(GetYears(2020, 2025)).toEqual([2020, 2021, 2022, 2023, 2024, 2025])
    })

    it('should return the correct month names', () => {
        expect(GetMonthNames()).toEqual([
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
        ])
    })

    it('should return the correct day names', () => {
        expect(GetDayNames()).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
    })

    it('should return the correct month name by index', () => {
        expect(GetMonthName(2)).toBe('March')
    })

    it('should return the correct day name by index', () => {
        expect(GetDayName(6)).toBe('Sat')
    })

    it('should return the correct month name by index', () => {
        expect(GetMonthNameByIndex(2)).toBe('March')
    })

    it('should return the correct day name by index', () => {
        expect(GetDayNameByIndex(6)).toBe('Sat')
    })

    it('should return the correct month index by name', () => {
        expect(GetMonthIndex('March')).toBe(2)
    })

    it('should return the correct day index by name', () => {
        expect(GetDayIndex('Sat')).toBe(6)
    })

    it('should return the correct month index by name', () => {
        expect(GetMonthIndexByName('March')).toBe(2)
    })

    it('should return the correct day index by name', () => {
        expect(GetDayIndexByName('Sat')).toBe(6)
    })

    it('should return the correct month number', () => {
        expect(getCorrectMonthNumber(-1)).toBe(11)
        expect(getCorrectMonthNumber(12)).toBe(0)
    })

    it('should compute the correct days grid', () => {
        const date = new Date(2025, 2, 1)
        const grid = computeDaysGrid(date)
        expect(grid.length).toBe(6)
    })

    it('should compute the correct months grid', () => {
        const grid = computeMonthsGrid(2025)
        expect(grid.length).toBe(3)
    })

    it('should compute the correct years grid', () => {
        const grid = computeYearsGrid(2025)
        expect(grid.length).toBe(5)
    })

    it('should return the correct previous date', () => {
        const date = new Date(2025, 2, 1)
        const previousDate = getPreviousDate('DAY', date)
        expect(previousDate.getDate()).toBe(28)
    })

    it('should return the correct next date', () => {
        const date = new Date(2025, 2, 1)
        const nextDate = getNextDate('DAY', date)
        expect(nextDate.getDate()).toBe(2)
    })

    it('should format the date correctly', () => {
        const date = { day: 8, month: 3, year: 2025 }
        expect(formatDate(date, 'yyyy/mm/dd')).toBe('2025-03-08')
        expect(formatDate(date, 'mm/dd/yyyy')).toBe('03-08-2025')
        expect(formatDate(date, 'dd/mm/yyyy')).toBe('08-03-2025')
    })

    it('should compute the correct range', () => {
        const selection: IDatePickerCell[] = [
            { item: { date: { toDate: () => new Date(2025, 2, 1) } } } as IDatePickerCell,
            { item: { date: { toDate: () => new Date(2025, 2, 5) } } } as IDatePickerCell
        ]
        const range = computeRange(selection)
        expect(range.length).toBe(4)
    })
})
