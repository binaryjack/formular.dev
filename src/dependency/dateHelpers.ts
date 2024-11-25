import { IDatePickerLokales } from './contextModels'
import {
    IDatePickerItem,
    IDatePickerLocalizedNames,
    IDatePickerOutputType,
    newDatePickerItem
} from './dateModels'

export const getPaddedNumber = (num: number) =>
    num.toString().length > 1 ? num.toString() : `0${num.toString()}`

export const getDayNumber = (dateStr: string) => new Date(dateStr).getDay()

export const getDayNameFromDate = (dateStr: string, locale: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}
export const DatePickerLokales: IDatePickerLokales = {
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    daysAbrv: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    months: [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
    ],
    monthsAbrv: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
}

export const getDayName = (dateStr: string) => DatePickerLokales.days[getDayNumber(dateStr)]

export const getDayAbrvName = (dateStr: string) => DatePickerLokales.daysAbrv[getDayNumber(dateStr)]

export const getMonthName = (monthNumber: number) => DatePickerLokales.months[monthNumber - 1]

export const getMonthAbrvName = (monthNumber: number) =>
    DatePickerLokales.monthsAbrv[monthNumber - 1]

export const getDatePickerItem = (
    type: IDatePickerOutputType,
    year: number,
    month: number,
    day: number,
    current?: boolean,
    previous?: boolean,
    next?: boolean,
    selected?: boolean,
    active?: boolean
): IDatePickerItem => {
    const dateStr = `${year}-${getPaddedNumber(month)}-${getPaddedNumber(day)}`
    //console.log(dateStr)
    const dte = new Date(dateStr)
    // console.log(dateStr)
    // console.log("dte.getDay()", dte.getDay())
    return newDatePickerItem(
        type,
        day.toString(),
        dateStr,
        dte.getFullYear(),
        month,
        getMonthName(month),
        getMonthAbrvName(month),
        day,
        getDayName(dateStr),
        getDayAbrvName(dateStr),
        dte.getDay() === 1,
        dte.getDay() === 0,
        current ? current : false,
        previous ? previous : false,
        next ? next : false,
        selected ? selected : false,
        active ? active : true
    )
}

export const getPreviousDaysThruMonday = (current: IDatePickerItem): number[] => {
    const output: number[] = []
    const previousMonth = current.month - 1 < 1 ? 12 : current.month - 1
    const contextYear = current.month - 1 < 1 ? current.year - 1 : current.year
    const prevMonthDay = getLastDayOfMonth(contextYear, previousMonth)

    for (let day = prevMonthDay; day > 1; day--) {
        const currentDay = getDatePickerItem('DAY', contextYear, previousMonth, day)
        output.push(day)
        if (currentDay.isMonday) return output.sort((a, b) => a - b)
    }
    return output.sort((a, b) => a - b)
}

export const getNextDaysThruSunday = (current: IDatePickerItem): number[] => {
    const output: number[] = []
    const nextMonth = current.month + 1 > 12 ? 1 : current.month + 1
    const contextYear = current.month + 1 > 12 ? current.year + 1 : current.year
    const nextMonthDay = getLastDayOfMonth(contextYear, nextMonth)
    for (let day = 1; day < nextMonthDay - 1; day++) {
        const currentDay = getDatePickerItem('DAY', contextYear, nextMonth, day)
        //console.log("----- currentDay", currentDay)
        output.push(day)
        if (currentDay.isSunday) return output
    }
    return output
}

export const getDatePickerItems = (
    type: IDatePickerOutputType,
    year: number,
    month: number,
    days: number[],
    isCurrent: boolean,
    isPrevious: boolean,
    isNext: boolean
): IDatePickerItem[] =>
    days.map((day) => getDatePickerItem(type, year, month, day, isCurrent, isPrevious, isNext))

export const getDatePickerMonthItems = (
    type: IDatePickerOutputType,
    year: number,
    months: number[],
    isCurrent: boolean,
    isPrevious: boolean,
    isNext: boolean
): IDatePickerItem[] =>
    months.map((month) => getDatePickerItem(type, year, month, 1, isCurrent, isPrevious, isNext))

export const getDatePickerYearItems = (
    type: IDatePickerOutputType,
    years: number[],
    isCurrent: boolean,
    isPrevious: boolean,
    isNext: boolean
): IDatePickerItem[] =>
    years.map((year) => getDatePickerItem(type, year, 1, 1, isCurrent, isPrevious, isNext))

export const getMonthDaysToDatePickerItems = (year: number, month: number): IDatePickerItem[] => {
    const days: IDatePickerItem[] = []
    for (let day = 1; day < 32; day++) {
        const dateStr = `${year}-${getPaddedNumber(month)}-${getPaddedNumber(day)}`
        const instance = getDatePickerItem('DAY', year, month, day)
        if (getRightMonth(dateStr) === month) {
            days.push(instance)
        }
    }
    return days
}

export const getDatePickerLokalizedNames = (days: string, months: string): IDatePickerLokales => {
    if (!days || !months) {
        // console.error('Unable to provide lokalized names for calendar. please check cms entries')
        // fallback
        return DatePickerLokales
    }
    // console.log(days, months)
    const daysBuscket = days.split('*')
    const monthsBuscket = months.split('*')

    const output: IDatePickerLocalizedNames = {
        days: [],
        daysAbrv: [],
        months: [],
        monthsAbrv: []
    }

    for (const element of daysBuscket) {
        const tmpCurrentDay = element.split(',')
        output.days.push(tmpCurrentDay[0])
        output.daysAbrv.push(tmpCurrentDay[1])
    }
    for (const element of monthsBuscket) {
        const tmpCurrentMonth = element.split(',')
        output.months.push(tmpCurrentMonth[0])
        output.monthsAbrv.push(tmpCurrentMonth[1])
    }

    return output
}

export const getLastDayOfMonth = (year: number, month: number): number =>
    getMonthDays(year, month)?.slice(-1)?.pop() ?? -1

export const getRightMonth = (dateStr: string): number => new Date(dateStr).getMonth() + 1

export const getMonthDays = (year: number, month: number): number[] => {
    const { localYear, localMonth } = parseEntries(year, month)
    const days: number[] = []
    for (let day = 1; day < 33; day++) {
        const dateStr = `${localYear}-${getPaddedNumber(localMonth)}-${getPaddedNumber(day)}`
        if (getRightMonth(dateStr) === localMonth) {
            days.push(day)
        }
    }
    return days
}

export const getContextualizedDate = (year: number, month: number) => {
    const { localYear, localMonth } = parseEntries(year, month)
    const contextMonth = localMonth > 12 ? 1 : localMonth < 1 ? 12 : localMonth
    const contextYear =
        contextMonth > localMonth
            ? localYear - 1
            : contextMonth < localMonth
              ? localYear + 1
              : localYear

    return { contextYear, contextMonth }
}

export const parseEntries = (year: number, month: number) => {
    let localYear = year
    let localMonth = month
    const dte = new Date()
    if (year === undefined || year === 0 || isNaN(year)) {
        localYear = dte.getUTCFullYear()
    }
    if (month === undefined || isNaN(month)) {
        localMonth = dte.getMonth() + 1
    }
    return { localYear, localMonth }
}
