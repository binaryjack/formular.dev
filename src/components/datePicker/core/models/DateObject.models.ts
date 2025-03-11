import { INDate } from '../../../../dependency/schema/descriptor/field.data.date.struct'
import { DatePickerOutputFormatType } from '../DatePicker.types'

export interface IDateObjectMethods {
    day: () => number
    month: () => number
    year: () => number

    isDefined: () => boolean

    setFromStrings: (day?: string, month?: string, year?: string) => void
    setFromNumbers: (day?: number, month?: number, year?: number) => void
    setFromDate: (date: Date) => void
    setFromNumber: (date: number) => void
    setFromObject: (date: INDate) => void

    setFromString: (date: string, format: DatePickerOutputFormatType) => boolean

    isNullEmptyOrUndefined?: (dateObject: INDate | undefined | null) => boolean

    setCurrentDate: (year: number, month: number, day?: number) => void

    toString: (format: DatePickerOutputFormatType) => string
    toDate: () => Date
    toINDate: () => INDate
}

export interface IDateObject extends Partial<IDateObjectMethods> {
    new (date?: Date, name?: string, separator?: string): IDateObject
    name: string
    separator: string
    dateObject: INDate
    dayOfWeek: number
}
