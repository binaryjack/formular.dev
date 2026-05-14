import { INDate } from '@core/framework/schema'
import { IDateObjectMethods } from './date-object.models'

export interface IDateObject extends Partial<IDateObjectMethods> {
    new (date?: Date, name?: string, separator?: string): IDateObject
    name: string
    separator: string
    dateObject: INDate
    dayOfWeek: number
}
