import { DatePickerFormatsEnum } from '../../../components/date-picker/core/date-picker.types'
import { getPaddedNumber } from '../../../components/date-picker/core/getters/get-padded-number'
import { INDate } from './field.data.date.struct'

export class DateObjectOld {
    separator: string
    name: string
    constructor(name: string, separator = '-') {
        this.separator = separator
        this.name = name
    }

    dateObject: INDate = { day: 0, month: 0, year: 0 }

    public get isDefined(): boolean {
        return this.dateObject.day > 0 && this.dateObject.month > 0 && this.dateObject.year > 0
    }
    public setFromNumber(day?: number, month?: number, year?: number) {
        const dte = new Date()
        this.dateObject.day = day ?? dte.getDay()
        this.dateObject.month = month ?? dte.getMonth() + 1
        this.dateObject.year = year ?? dte.getFullYear()
    }

    public setFromStrings(day?: string, month?: string, year?: string) {
        const dte = new Date()
        this.dateObject.day = day ? parseInt(day) : dte.getDay()
        this.dateObject.month = month ? parseInt(month) : dte.getMonth() + 1
        this.dateObject.year = year ? parseInt(year) : dte.getFullYear()
    }

    public get day(): string {
        return getPaddedNumber(this.dateObject.day, 2)
    }
    public get month(): string {
        return getPaddedNumber(this.dateObject.month, 2)
    }
    public get year(): string {
        return `${this.dateObject.year}`
    }

    public get stamp(): number {
        return Number(`${this.year}${this.month}${this.day}`)
    }

    public get date(): Date {
        return new Date(this.dateObject.year, this.dateObject.month, this.dateObject.day)
    }

    public get type(): INDate {
        return this.dateObject
    }

    public toString(
        format: DatePickerFormatsEnum = DatePickerFormatsEnum.DD_MM_YYYY
    ): string | null {
        // console.log(
        //     'toString',
        //     format,
        //     `${this.day}${this.separator}${this.month}${this.separator}${this.year}`
        // )
        if (this.nullOrEmpty()) {
            return null
        }
        if (!this.isDefined) throw new Error('UNABLE TO GET DATE')

        if (format === DatePickerFormatsEnum.DD_MM_YYYY)
            return `${this.day}${this.separator}${this.month}${this.separator}${this.year}`

        if (format === DatePickerFormatsEnum.YYYY_MM_DD)
            return `${this.year}${this.separator}${this.month}${this.separator}${this.day}`

        if (format === DatePickerFormatsEnum.MM_DD_YYYY)
            return `${this.month}${this.separator}${this.day}${this.separator}${this.year}`

        return `${this.day}${this.separator}${this.month}${this.separator}${this.year}`
    }

    public set parseDate(date: Date) {
        try {
            // console.log('parseDate', this.name, date)
            this.dateObject.day = date.getDate()
            this.dateObject.month = date.getMonth() + 1
            this.dateObject.year = date.getFullYear()
        } catch (e: unknown) {
            throw new Error((e as { message: string })?.message)
        }
    }
    public set parseObject(date: INDate) {
        //   console.log('parseObject', this.name, date)
        this.dateObject = { ...date }
    }

    public set parseNumber(date: number) {
        //  console.log('parseNumber', this.name, date)
        if (/^\d*$/.test(date.toString())) {
            this.parseDate = new Date(date)
        }
    }

    public IsNullOrEmpty(dateObject: INDate | undefined) {
        return (
            !dateObject || dateObject.day === 0 || dateObject.month === 0 || dateObject.year === 0
        )
    }

    public nullOrEmpty() {
        return (
            !this.dateObject ||
            this.dateObject.day === 0 ||
            this.dateObject.month === 0 ||
            this.dateObject.year === 0
        )
    }

    public set parseString(date: string) {
        if (!date) return
        //    console.log('parseString', this.name, date)
        if (/^\d*$/.test(date?.toString())) {
            const newDate = new Date(date)
            this.parseDate = newDate
        }

        const dateWithSeparatorReplaced = this.setSeparator(date)
        if (!dateWithSeparatorReplaced) throw new Error('UNABLE TO IDENTIFY SEPARATOR')
        const splitted = this.splitString(dateWithSeparatorReplaced, this.separator)
        if (!splitted || splitted.length === 0) throw new Error('UNABLE TO SPLIT DATE')

        if (splitted[2]?.length === 4) {
            this.dateObject.year = Number(splitted[2])

            if (Number(splitted[1]) > 12) {
                this.dateObject.day = Number(splitted[1])
                this.dateObject.month = Number(splitted[0])
            } else {
                /// if (Number(splitted[0]) > 12) {
                this.dateObject.day = Number(splitted[0])
                this.dateObject.month = Number(splitted[1])
            }
        }
        if (splitted[1]?.length === 4) {
            this.dateObject.year = Number(splitted[1])

            if (Number(splitted[2]) > 12) {
                this.dateObject.day = Number(splitted[2])
                this.dateObject.month = Number(splitted[0])
            } else {
                //Number(splitted[0]) > 12
                this.dateObject.day = Number(splitted[0])
                this.dateObject.month = Number(splitted[2])
            }
        }
        if (splitted[0]?.length === 4) {
            this.dateObject.year = Number(splitted[0])

            if (Number(splitted[1]) > 12) {
                this.dateObject.day = Number(splitted[1])
                this.dateObject.month = Number(splitted[2])
            } else {
                ///Number(splitted[2]) > 12
                this.dateObject.day = Number(splitted[2])
                this.dateObject.month = Number(splitted[1])
            }
        }
    }

    public validateInput(
        date: string,
        format: DatePickerFormatsEnum = DatePickerFormatsEnum.YYYY_MM_DD
    ): boolean {
        if (date.length === 0) return true

        if (date.length === 10) {
            try {
                this.parseString = date
                return true
            } catch {
                return false
            }
        }
        if (date.length === 8) {
            let output = ''
            if (
                format === DatePickerFormatsEnum.DD_MM_YYYY ||
                format === DatePickerFormatsEnum.MM_DD_YYYY
            )
                output = `${date.substring(0, 2)}${
                    this.separator
                }${date.substring(2, 4)}${this.separator}${date.substring(4)}`
            if (format === DatePickerFormatsEnum.YYYY_MM_DD)
                output = `${date.substring(0, 4)}${
                    this.separator
                }${date.substring(4, 6)}${this.separator}${date.substring(6)}`
            this.parseString = output
            return true
        }

        return false
    }

    public setCurrentDay = (date: DateObjectOld, day: number) => {
        this.dateObject.day = day
        this.dateObject.month = date.type.month
        this.dateObject.year = date.type.year
    }
    public setCurrentMonth = (date: DateObjectOld, month: number) => {
        this.dateObject.day = date.type.day
        this.dateObject.month = month
        this.dateObject.year = date.type.year
    }
    public setCurrentYear = (date: DateObjectOld, year: number) => {
        this.dateObject.day = date.type.day
        this.dateObject.month = date.type.month
        this.dateObject.year = year
    }

    public setCurrentDate = (year: number, month: number, day?: number) => {
        // const { contextYear, contextMonth } = getContextualizedDate(year, month)
        // const lastDay = getLastDayOfMonth(contextYear, contextMonth)
        // const givenStamp = `${year}${getPaddedNumber(month, 2)}`
        // const newStamp = `${contextYear}${getPaddedNumber(contextMonth, 2)}`
        // this.dateObject.day = day ? day : newStamp < givenStamp ? lastDay : 1
        // this.dateObject.month = contextMonth
        // this.dateObject.year = contextYear
    }

    private readonly splitString = (item: string, separator: string): string[] | undefined => {
        return item.split(separator)
    }

    private readonly setSeparator = (date: string): string => {
        // debugger
        if (/^-+$/.test(date)) {
            return date.replace(/-+/gi, this.separator)
        }
        if (/^\/+$/.test(date)) {
            return date.replace(/\/+/gi, this.separator)
        }
        if (/^\.+$/.test(date)) {
            return date.replace(/\.+/gi, this.separator)
        }
        return date
    }

    private readonly getSeparator = (date: string): string | undefined => {
        if (/-*/.test(date)) {
            return '-'
        }
        if (/\/*/.test(date)) {
            return '/'
        }
        if (/\.*/.test(date)) {
            return '.'
        }
        return undefined
    }
}
