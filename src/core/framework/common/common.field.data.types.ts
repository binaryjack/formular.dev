import { IDateObject } from '@components/date-picker/core/models/date-object.models'
import { INDate } from '../schema/descriptor/i-n-date'
export type BaseFieldDataTypes = string | number | boolean | INDate | IDateObject | object | bigint
export type FieldOmmitObjectsType = 'object' | 'INDate' | 'DateObject'
export type FieldDataTypes = Omit<BaseFieldDataTypes, FieldOmmitObjectsType> | null | undefined
