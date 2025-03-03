import { IDate } from './contextModels'

export type IDatePickerOutputType = 'DAY' | 'MONTH' | 'YEAR'
export type DatePickerGridMode = 'YEAR' | 'MONTH' | 'DAY'
export type DatePickerMode = 'range' | 'single'
/** indicates start and end date in caso of using range mode */
export type DatePickerLocator = 'start' | 'end'

export interface IDateRangeObject {
    id: string
    from: IDate
    to: IDate
}

export interface ICursorPosition {
    currentID: number
    x: number
    y: number
}

export interface IDatePickerItem {
    id: string
    date: string
    year: number
    month: number
    monthName: string
    monthNameAbrv: string
    day: number
    dayName: string
    dayNameAbrv: string
    isMonday: boolean
    isSunday: boolean
    isCurrent: boolean
    isPrevious: boolean
    isNext: boolean
    selected: boolean
    active: boolean
    type: IDatePickerOutputType
}

export const newDatePickerItem = (
    type: IDatePickerOutputType,
    id: string,
    date: string,
    year: number,
    month: number,
    monthName: string,
    monthNameAbrv: string,
    day: number,
    dayName: string,
    dayNameAbrv: string,
    isMonday: boolean,
    isSunday: boolean,
    isCurrent: boolean,
    isPrevious: boolean,
    isNext: boolean,
    selected: boolean,
    active: boolean
) => {
    return {
        type,
        id,
        date,
        year,
        month,
        monthName,
        monthNameAbrv,
        day,
        dayName,
        dayNameAbrv,
        isMonday,
        isSunday,
        isCurrent,
        isPrevious,
        isNext,
        selected,
        active
    }
}

// CELL DATA
export interface ICellItem {
    cell: number
    current: number
    from: number
    to: number
    mode: DatePickerMode
}

export type IYearItem = {
    year: number
    selected: boolean
}

export type IMonthItem = {
    month: number
    selected: boolean
}

export type IDatePickerRow = {
    id: number
    rows: IDatePickerItem[]
}

export interface IDatePickerLocalizedNames {
    days: string[]
    daysAbrv: string[]
    months: string[]
    monthsAbrv: string[]
}
