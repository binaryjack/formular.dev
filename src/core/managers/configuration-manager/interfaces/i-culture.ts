import { DateFormatsEnum } from '@core/framework'

export interface ICulture {
    name: string
    dateFormat: DateFormatsEnum
    timeFormat: string
    currencySymbol: string
    separator: string
}
