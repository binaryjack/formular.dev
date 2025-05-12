import { IDateObject } from '@components/date-picker/core/models/date-object.models'
import { INDate } from '../schema/descriptor/i-n-date'
export type BaseInputDataTypes = string | number | boolean | INDate | IDateObject | object | bigint
export type InputOmmitObjectsType = 'object' | 'INDate' | 'DateObject'
export type InputDataTypes = Omit<BaseInputDataTypes, InputOmmitObjectsType> | null | undefined
