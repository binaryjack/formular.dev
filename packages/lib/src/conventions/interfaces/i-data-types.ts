import { DateFormatsEnum } from '../../core/framework/types/date/date.types'

export interface IDateSettings {
    separator: string
    formatValue: DateFormatsEnum
    formatDisplay: DateFormatsEnum
}

export interface IDataTypes {
    date: IDateSettings
}
