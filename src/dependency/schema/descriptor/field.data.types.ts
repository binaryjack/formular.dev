import { IDateObject } from '../../../components/datePicker/core/models/DateObject.models'
import { INDate } from './field.data.date.struct'

export type FieldValuesTypes = string | number | INDate | IDateObject | object | bigint | undefined

export type FieldOmmitObjectsType = 'object' | 'INDate' | 'DateObject'
