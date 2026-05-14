import { INDate } from '@core/framework/types/date/i-n-date'
import { DateObjectTypes } from './date-object.types'
import { DateFormatsEnum } from './date.types'

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

    setFromString: (date: string, format: DateFormatsEnum) => boolean

    isNullEmptyOrUndefined?: (dateObject: INDate | undefined | null) => boolean

    setCurrentDate: (year: number, month: number, day?: number) => void

    toString: (format: DateFormatsEnum) => string
    toDate: () => Date
    toINDate: () => INDate
    parse: (value: DateObjectTypes) => void
}
