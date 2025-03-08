import { INDate } from '../../../dependency/schema/descriptor/field.data.date.struct'
import { DatePickerOutputFormatType } from './DatePicker.types'
import { getPaddedNumber } from './DatePicker.utils'
import { IDateObject } from './models/DateObject.models'

export const DateObject = function (
    this: IDateObject,
    date?: Date,
    name: string = '',
    separator: string = '-'
) {
    this.name = name
    this.separator = separator ?? '-'
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
    day: function () {
        return this.dateObject.day
    },
    month: function () {
        return this.dateObject.month
    },
    year: function () {
        return this.dateObject.year
    },
    isDefined: function () {
        return (
            this.dateObject.day !== 0 && this.dateObject.month !== 0 && this.dateObject.year !== 0
        )
    },
    setFromStrings: function (day = '', month = '', year = '') {
        this.dateObject.day = parseInt(day)
        this.dateObject.month = parseInt(month)
        this.dateObject.year = parseInt(year)
        this.dayOfWeek = new Date(parseInt(year), parseInt(month), parseInt(day)).getDay()
    },
    setFromNumbers: function (day = 0, month = 0, year = 0) {
        this.dateObject.day = day
        this.dateObject.month = month
        this.dateObject.year = year
        this.dayOfWeek = new Date(year, month, day).getDay()
    },
    setFromDate: function (date: Date) {
        this.dateObject.day = date.getDate()
        this.dateObject.month = date.getMonth()
        this.dateObject.year = date.getFullYear()
        this.dayOfWeek = date.getDay()
    },
    setFromNumber: function (date: number) {
        const d = new Date(date)
        this.setFromDate(d)
    },
    setFromObject: function (date: INDate) {
        this.dateObject = { ...date }
    },
    setFromString: function (date: string, format: DatePickerOutputFormatType) {
        if (date.length === 10) {
            let _year = ''
            let _month = ''
            let _day = ''
            if (format === 'mm/dd/yyyy') {
                _month = date.substring(0, 2)
                _day = date.substring(3, 5)
                _year = date.substring(6)
            }

            if (format === 'dd/mm/yyyy') {
                _day = date.substring(0, 2)
                _month = date.substring(3, 5)
                _year = date.substring(6)
            }

            if (format === 'yyyy/mm/dd') {
                _year = date.substring(0, 4)
                _month = date.substring(5, 7)
                _day = date.substring(8)
            }

            console.log('RESULT', _day, _month, _year, 'DTE', date)
            this.setFromStrings(_day, _month, _year)
            return true
        }
        return false
    },
    isNullEmptyOrUndefined: function (dateObject: INDate | undefined | null) {
        return dateObject === null || dateObject === undefined
    },
    setCurrentDate: function (year: number, month: number, day = 1) {
        this.setFromNumbers(day, month, year)
    },
    toString: function (format: DatePickerOutputFormatType) {
        if (format === 'mm/dd/yyyy') {
            return `${getPaddedNumber(this.dateObject.month, 2)}/${getPaddedNumber(this.dateObject.day, 2)}/${this.dateObject.year}`
        }

        if (format === 'dd/mm/yyyy') {
            return `${getPaddedNumber(this.dateObject.day, 2)}/${getPaddedNumber(this.dateObject.month, 2)}/${this.dateObject.year}`
        }

        if (format === 'yyyy/mm/dd') {
            return `${this.dateObject.year}/${getPaddedNumber(this.dateObject.month, 2)}/${getPaddedNumber(this.dateObject.day, 2)}`
        }
        return ''
    },
    toDate: function () {
        return new Date(this.dateObject.year, this.dateObject.month, this.dateObject.day)
    },
    getDayName: function () {
        const date = this.toDate()
        return date.toLocaleString('en', { weekday: 'long' })
    },
    getMonthName: function () {
        const date = this.toDate()
        return date.toLocaleString('en', { month: 'long' })
    },
    getDayShortName: function () {
        const date = this.toDate()
        return date.toLocaleString('en', { weekday: 'short' })
    },
    getMonthShortName: function () {
        const date = this.toDate()
        return date.toLocaleString('en', { month: 'short' })
    }
}
