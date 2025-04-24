import { IDateObject } from '../../../components/date-picker/core/models/date-object.models'
import { INDate } from './field.data.date.struct'

export type FieldValuesTypes = string | number | INDate | IDateObject | object | bigint | undefined

export type FieldOmmitObjectsType = 'object' | 'INDate' | 'DateObject'
