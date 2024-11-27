import { INDate } from './field.data.date.struct'
import { DateObject } from './field.data.dateobject.type'

export type FieldValuesTypes = string | number | INDate | DateObject | object | bigint | undefined

export type FieldOmmitObjectsType = 'object' | 'INDate' | 'DateObject'
