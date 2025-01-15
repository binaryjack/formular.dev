import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import { INDate } from '../../../dependency/schema/descriptor/field.data.date.struct'

export type DatePickerModeType = 'FULL' | 'DATE' | 'TIME'
export type DatePickerOutputFormat = 'dd/mm/yyyy' | 'mm/dd/yyyy' | 'yyyy/mm/dd'
export type IDatePickerOutputType = 'DAY' | 'MONTH' | 'YEAR'

export interface IDatePicker {
    new (id: string, name?: string): IDatePicker
    id: string
    name: string
    separator: string

    inputFormat: DatePickerOutputFormat
    outputFormat: DatePickerOutputFormat
    displayFormat: DatePickerOutputFormat

    internalHTMLElementRef: React.RefObject<HTMLInputElement> | null
    internalCells: React.RefObject<HTMLInputElement> | null

    register: () => DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    registerCell: () => DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

    ref: () => React.RefObject<HTMLInputElement>
    refCell: (o: React.RefObject<HTMLInputElement>) => React.RefObject<HTMLInputElement> | undefined

    focusCell: () => void
}

export interface IDateObject {
    new (name: string, separator?: string): IDateObject
    name: string
    separator: string
    dateObject: INDate
    day: number
    month: number
    year: number

    isDefined: () => boolean

    setFromStrings: (day?: string, month?: string, year?: string) => void
    setFromNumbers: (day?: number, month?: number, year?: number) => void
    setFromDate: (date: Date) => void
    setFromNumber: (date: number) => void
    setFromObject: (date: INDate) => void
    setFromString: (date: string) => void

    validateInput: (date: string, format: DatePickerOutputFormat) => boolean

    isNullEmptyOrUndefined: (dateObject: INDate | undefined | null) => boolean

    getCurrentDay: () => number
    getCurrentMonth: () => number
    getCurrentYear: () => number
    nextDay: () => void
    nextMonth: () => void
    nextYear: () => void
    previousDay: () => void
    previousMonth: () => void
    previousYear: () => void
    setCurrentDay: (day: number) => void
    setCurrentMonth: (month: number) => void
    setCurrentYear: (year: number) => void

    setCurrentDate: (year: number, month: number, day?: number) => void

    toString: (format: DatePickerOutputFormat) => string
    toDate: () => Date
    getDayName: () => string
    getMonthName: () => string
    getDayShortName: () => string
    getMonthShortName: () => string
}

export interface ICursorPosition {
    currentID: number
    x: number
    y: number
}

export interface IDatePickerItem {
    id: string
    date: IDateObject
    selected: boolean
    active: boolean
    type: IDatePickerOutputType
}
