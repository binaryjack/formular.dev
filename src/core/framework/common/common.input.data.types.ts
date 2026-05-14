import { IDateObject } from '../types/date/i-date-object'
import { INDate } from '../types/date/i-n-date'
export type BaseInputDataTypes = string | number | boolean | INDate | IDateObject | object | bigint
export type InputOmmitObjectsType = 'object' | 'INDate' | 'DateObject'
export type InputDataTypes = Omit<BaseInputDataTypes, InputOmmitObjectsType> | null | undefined
