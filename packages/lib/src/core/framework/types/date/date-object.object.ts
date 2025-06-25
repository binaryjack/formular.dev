import { DateFormatsEnum } from '@core/framework/types/date/date.types'
import { INDate } from '@core/framework/types/date/i-n-date'
import { DateObjectTypes } from './date-object.types'
import { validateDateFormat } from './date-picker.utils'
import { getPaddedNumber } from './getters/get-padded-number'
import { IDateObject } from './i-date-object'

export const DateObject = function (
    this: IDateObject,
    date?: Date,
    name: string = '',
    separator: string = '/'
) {
    this.name = name
    this.separator = separator
    this.dateObject = date
        ? { day: date.getDate(), month: date.getMonth(), year: date.getFullYear() }
        : {
              day: new Date().getDate(),
              month: new Date().getMonth(),
              year: new Date().getFullYear()
          }
    this.dayOfWeek = date ? date.getDay() : new Date().getDay()
} as any as IDateObject

DateObject.prototype = {
    day: function (this: IDateObject) {
        return this.dateObject.day
    },
    month: function (this: IDateObject) {
        return this.dateObject.month
    },
    year: function (this: IDateObject) {
        return this.dateObject.year
    },
    isDefined: function (this: IDateObject) {
        return (
            this.dateObject.day !== 0 && this.dateObject.month !== 0 && this.dateObject.year !== 0
        )
    },
    setFromStrings: function (this: IDateObject, day = '', month = '', year = '') {
        this.dateObject.day = parseInt(day)
        this.dateObject.month = parseInt(month) - 1
        this.dateObject.year = parseInt(year)
        this.dayOfWeek = new Date(
            this.dateObject.year,
            this.dateObject.month,
            this.dateObject.day
        ).getDay()
    },
    setFromNumbers: function (this: IDateObject, day = 0, month = 0, year = 0) {
        this.dateObject.day = day
        this.dateObject.month = month
        this.dateObject.year = year
        this.dayOfWeek = new Date(year, month, day).getDay()
    },
    setFromDate: function (this: IDateObject, date: Date) {
        this.dateObject.day = date.getDate()
        this.dateObject.month = date.getMonth()
        this.dateObject.year = date.getFullYear()
        this.dayOfWeek = date.getDay()
    },
    setFromNumber: function (this: IDateObject, date: number) {
        const d = new Date(date)
        this.setFromDate?.(d)
    },
    /** here we store the date object with the month shifted - 1 */
    setFromObject: function (this: IDateObject, date: INDate) {
        this.dateObject = { ...date, month: date.month - 1 } as INDate
    },
    setFromString: function (this: IDateObject, date: string, format: DateFormatsEnum) {
        if (date.length === 10) {
            let _year = ''
            let _month = ''
            let _day = ''
            if (format === DateFormatsEnum.MM_DD_YYYY) {
                _month = date.substring(0, 2)
                _day = date.substring(3, 5)
                _year = date.substring(6)
            }

            if (format === DateFormatsEnum.DD_MM_YYYY) {
                _day = date.substring(0, 2)
                _month = date.substring(3, 5)
                _year = date.substring(6)
            }

            if (format === DateFormatsEnum.YYYY_MM_DD) {
                _year = date.substring(0, 4)
                _month = date.substring(5, 7)
                _day = date.substring(8)
            }

            this.setFromStrings?.(_day, _month, _year)
            return true
        }
        return false
    },
    isNullEmptyOrUndefined: function (this: IDateObject, dateObject: INDate | undefined | null) {
        return dateObject === null || dateObject === undefined
    },
    setCurrentDate: function (this: IDateObject, year: number, month: number, day = 1) {
        this.setFromNumbers?.(day, month, year)
    },
    /** Note that  */
    toString: function (this: IDateObject, format: DateFormatsEnum) {
        const day = this.dateObject.day
        const month = this.dateObject.month + 1
        const year = this.dateObject.year

        if (format === DateFormatsEnum.MM_DD_YYYY) {
            return `${getPaddedNumber(month, 2)}${this.separator}${getPaddedNumber(day, 2)}${
                this.separator
            }${year}`
        }

        if (format === DateFormatsEnum.DD_MM_YYYY) {
            return `${getPaddedNumber(day, 2)}${this.separator}${getPaddedNumber(month, 2)}${
                this.separator
            }${year}`
        }

        if (format === DateFormatsEnum.YYYY_MM_DD) {
            return `${year}${this.separator}${getPaddedNumber(month, 2)}${
                this.separator
            }${getPaddedNumber(day, 2)}`
        }
        return ''
    },
    toDate: function (this: IDateObject) {
        return new Date(this.dateObject.year, this.dateObject.month, this.dateObject.day)
    },
    /** here we return the date object with the month shifted + 1 */
    toINDate: function (this: IDateObject) {
        return {
            year: this.dateObject.year,
            month: this.dateObject.month + 1,
            day: this.dateObject.day
        } as INDate
    },
    parse: function (this: IDateObject, value: DateObjectTypes) {
        if (typeof value === 'string') {
            const isValidFormat = validateDateFormat(value)
            if (!isValidFormat) {
                this.setFromString?.(value, DateFormatsEnum.YYYY_MM_DD)
                return
            }
            this.setFromString?.(value, isValidFormat as DateFormatsEnum)
        }

        if (typeof value === 'number') {
            this.setFromNumber?.(value)
            return
        }

        if (value instanceof Date) {
            this.setFromDate?.(value)
            return
        }

        if (typeof value === 'object' && value !== null) {
            if ('year' in value && 'month' in value && 'day' in value) {
                this.setFromObject?.(value as INDate)
                return
            }
        }
        throw Error(`Cannot parse DATE ${JSON.stringify(value)} `)
    }
}
