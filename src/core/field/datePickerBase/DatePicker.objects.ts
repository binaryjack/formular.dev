import { INDate } from '../../../dependency/schema/descriptor/field.data.date.struct'
import { DatePickerOutputFormat, IDateObject } from './DatePicker.types'
import { getPaddedNumber } from './DatePicker.utils'

export const DateObject = function (this: IDateObject, name: string, separator = '-') {
    this.name = name
    this.separator = separator
    this.dateObject = {
        day: 0,
        month: 0,
        year: 0
    }
    this.day = 0
    this.month = 0
    this.year = 0
} as any as IDateObject

DateObject.prototype = {
    isDefined: function () {
        return (
            this.dateObject.day !== 0 && this.dateObject.month !== 0 && this.dateObject.year !== 0
        )
    },
    setFromStrings: function (day = '', month = '', year = '') {
        this.dateObject.day = parseInt(day)
        this.dateObject.month = parseInt(month)
        this.dateObject.year = parseInt(year)
    },
    setFromNumbers: function (day = 0, month = 0, year = 0) {
        this.dateObject.day = day
        this.dateObject.month = month
        this.dateObject.year = year
    },
    setFromDate: function (date: Date) {
        this.dateObject.day = date.getDate()
        this.dateObject.month = date.getMonth() + 1
        this.dateObject.year = date.getFullYear()
    },
    setFromNumber: function (date: number) {
        const d = new Date(date)
        this.setFromDate(d)
    },
    setFromObject: function (date: INDate) {
        this.dateObject = { ...date }
    },
    setFromString: function (date: string) {
        const [day, month, year] = date.split(this.separator)
        this.setFromStrings(day, month, year)
    },
    validateInput: function (date: string, format: DatePickerOutputFormat) {
        if (date.length === 10) {
            let year = ''
            let month = ''
            let day = ''
            if (format === 'mm/dd/yyyy') {
                month = date.substring(0, 2)
                day = date.substring(2, 4)
                year = date.substring(4)
            }

            if (format === 'dd/mm/yyyy') {
                day = date.substring(0, 2)
                month = date.substring(2, 4)
                year = date.substring(4)
            }

            if (format === 'yyyy/mm/dd') {
                year = date.substring(0, 4)
                month = date.substring(4, 6)
                day = date.substring(6)
            }
            this.setFromStrings(day, month, year)
            return true
        }
        return false
    },
    isNullEmptyOrUndefined: function (dateObject: INDate | undefined | null) {
        return dateObject === null || dateObject === undefined
    },
    getCurrentDay: function () {
        return this.dateObject.day
    },
    getCurrentMonth: function () {
        return this.dateObject.month
    },
    getCurrentYear: function () {
        return this.dateObject.year
    },
    nextDay: function () {
        this.dateObject.day++
    },
    nextMonth: function () {
        this.dateObject.month++
    },
    nextYear: function () {
        this.dateObject.year++
    },
    previousDay: function () {
        this.dateObject.day--
    },
    previousMonth: function () {
        this.dateObject.month--
    },
    previousYear: function () {
        this.dateObject.year--
    },
    setCurrentDay: function (day: number) {
        this.dateObject.day = day
    },
    setCurrentMonth: function (month: number) {
        this.dateObject.month = month
    },
    setCurrentYear: function (year: number) {
        this.dateObject.year = year
    },
    setCurrentDate: function (year: number, month: number, day = 1) {
        this.setFromNumbers(day, month, year)
    },
    toString: function (format: DatePickerOutputFormat) {
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
        return new Date(this.dateObject.year, this.dateObject.month - 1, this.dateObject.day)
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
