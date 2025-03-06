import { DatePickerDisplayType } from '../DatePicker.types'
import { IDateObject } from './DateObject.models'

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
    isNextScope: boolean
    isPreviousScope: boolean
    isCurrentScope: boolean
    isRangeDays: boolean
    displayType: DatePickerDisplayType
}

export interface IDatePickerOptions {
    selected: boolean
    active: boolean
    isNextScope: boolean
    isPreviousScope: boolean
    isCurrentScope: boolean
    isRangeDays: boolean
    displayType: DatePickerDisplayType
}

export interface IDatePickerCell {
    id: number
    code: string | undefined
    ts: number
    item: IDatePickerItem | null
}

export interface IDatePickerRow {
    id: number
    cells: IDatePickerCell[]
}
