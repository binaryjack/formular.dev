import { DatePickerGridMode, ICellItem, IDatePickerRow } from './dateModels'

export enum IDatePickerActions {
    INIT = 'INIT',

    SET_DATE = 'SET_DATE',

    SET_DAY = 'SET_DAY',
    SET_MONTH = 'SET_MONTH',
    SET_YEAR = 'SET_YEAR',

    SET_HOUR = 'SET_HOUR',
    SET_MINUTE = 'SET_MINUTE',
    SET_SECOND = 'SET_SECOND',

    SET_FROM_TO = 'SET_FROM_TO',

    SET_DAYS = 'SET_DAYS',
    SET_MONTHS = 'SET_MONTHS',
    SET_YEARS = 'SET_YEARS',

    SET_CELLS = 'SET_CELLS',

    SET_HEADER = 'SET_HEADER',

    SET_SCOPE_MONTH = 'SET_SCOPE_MONTH',

    SET_GRID_MODE = 'SET_GRID_MODE'
}

export type DatePickerModeType = 'FULL' | 'DATE' | 'TIME'
export type DatePickerOutputFormat = 'dd/mm/yyyy' | 'mm/dd/yyyy' | 'yyyy/mm/dd'

export interface IDatePickerAction {
    type: IDatePickerActions
    payload:
        | DatePickerGridMode
        | string
        | string[]
        | undefined
        | boolean
        | number
        | IDate
        | ITime
        | IDateTime
        | IDatePickerInit
        | IDatePickerLokales
        | IDatePickerRow
        | IDatePickerRow[]
        | ICellItem
        | ICellItem[]
        | IFromTo
}

export interface IDatePickerState {
    inputFormat: DatePickerOutputFormat
    outputFormat: DatePickerOutputFormat
    displayFormat: DatePickerOutputFormat

    gridMode?: DatePickerGridMode
    mode?: DatePickerModeType

    scopeMonth?: number

    day?: string
    month?: string
    year?: string
    hours?: string
    minutes?: string
    seconds?: string
    timestamp?: string

    cells: ICellItem[]

    from?: IDate
    to?: IDate

    days: IDatePickerRow[]
    months: IDatePickerRow[]
    years: IDatePickerRow[]

    header?: IDatePickerLokales
}

export interface IFromTo {
    from: IDate
    to: IDate
}

export interface IDate {
    day?: string
    month?: string
    year?: string
    date?: string
}

export interface ITime {
    hours?: string
    minutes?: string
    seconds?: string
    timestamp?: string
}

export interface IDateTime extends IDate, ITime {}

export interface IDatePickerInit {
    inputFormat?: DatePickerOutputFormat
    outputFormat?: DatePickerOutputFormat
    displayFormat?: DatePickerOutputFormat
    header?: IDatePickerLokales
    gridMode?: DatePickerGridMode
    mode?: DatePickerModeType
    day?: string
    month?: string
    year?: string
    hours?: string
    minutes?: string
    seconds?: string
    scopeMonth?: number
}

export interface IDatePickerLokales {
    days: string[]
    daysAbrv: string[]
    months: string[]
    monthsAbrv: string[]
}
