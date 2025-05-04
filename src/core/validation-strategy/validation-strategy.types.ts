import { DateObject } from '@components/date-picker/core/date-object.object'
import { DatePickerFormatsEnum } from '@components/date-picker/core/date-picker.types'
import { IDateObject } from '@components/date-picker/core/models/date-object.models'
import { IFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import { IFieldError, IFieldGuide } from '@core/framework/errors'
import { FieldDataTypes } from '@core/framework/schema/descriptor/field.data.types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { EventsType, IEvents } from '../events/events.types'

export interface IValidableForm {
    validateAll: () => void
}

export interface IDoValidate {
    formId: string
}

export interface IValidationResult {
    state: boolean
    code: string
    fieldName: string
    error?: IFieldError
    guide?: IFieldGuide
    strategyData?: IValidationStrategyData
}

export interface IDoValidateAll {
    formId: string
}

export interface IValidationResults {
    isValid: boolean
    results?: IValidationResult[]
    formId?: string
}

export const newValidationResults = (
    isValid: boolean,
    results?: IValidationResult[],
    formId?: string
): IValidationResults => {
    return { isValid, results: results ?? [], formId }
}

export const newValidationResult = (
    state: boolean,
    fieldName: string,
    code: string,
    error?: IFieldError,
    guide?: IFieldGuide,
    strategyData?: IValidationStrategyData
): IValidationResult => {
    return { state, fieldName, code, error, guide, strategyData }
}

export interface IValidationStrategyData {
    fieldName: string
    type: string
    validationOptions: IValidationOptions
    value: FieldDataTypes
    expectedValue: FieldDataTypes
    origin: IEvents | null
    asyncValidators?: Array<(data: IValidationStrategyData) => Promise<IValidationResult>>
    toString: () => string
}

export const newValidationStrategyData = (
    fieldName: string,
    type: string,
    validationOptions: IValidationOptions,
    value: FieldDataTypes,
    expectedValue?: FieldDataTypes,
    origin?: IEvents
) => {
    return {
        fieldName: fieldName,
        type: type,
        validationOptions: validationOptions,
        value: value,
        expectedValue: expectedValue !== undefined ? expectedValue : null,
        origin: origin ?? null,
        toString: function () {
            if (this.value === undefined || this.value === null) {
                return ''
            }
            if (typeof this.value === 'string') {
                return String(this.value)
            }
            if (typeof this.value === 'number') {
                return Number(this.value).toString()
            }
            if (typeof this.value === 'bigint') {
                return BigInt(this.value).toString()
            }
            if (value instanceof DateObject) {
                return (this.value as IDateObject).toString?.(DatePickerFormatsEnum.YYYY_MM_DD)
            }
            if (typeof this.value === 'object') {
                if ('year' in this.value && 'day' in this.value && 'month' in this.value) {
                    return `${this.value.year}-${this.value.month}-${this.value.day}`
                }
                return JSON.stringify(this.value)
            }
            return ''
        }
    } as IValidationStrategyData
}

export type IValidationStrategyType = (data: IValidationStrategyData) => IValidationStrategy

export interface IValidationMethodStrategy {
    new (): IValidationMethodStrategy
    validate: (data: IValidationStrategyData) => IValidationResult
}

export interface IValidationStrategy {
    new (): IValidationStrategy

    validationStrategies: IValidationMethodStrategy[]
    validationOptions: IValidationOptions
    isValidating: boolean
    shouldValidate: boolean
    validationTriggerModeType: EventsType[]
    validationResults: IValidationResult[]
    initializeValidationStrategy: (descriptor: IFieldDescriptor) => void
    addValidationStrategies: (...parsers: IValidationMethodStrategy[]) => void
    setValidationTriggerMode: (mode: EventsType[]) => void
    validate: (data: IValidationStrategyData) => IValidationResult[]
    validateAll: (fields: IFieldInput[]) => void
}

export interface IValidationTextBase {
    error?: string
    guide?: string
}

export interface IRequired extends IValidationTextBase {
    required: boolean
}

export interface IMax extends IValidationTextBase {
    max: number
}

export interface IMin extends IValidationTextBase {
    min: number
}

export interface IMaxLength extends IValidationTextBase {
    maxLength: number
}

export interface IMinLength extends IValidationTextBase {
    minLength: number
}

export interface IPattern extends IValidationTextBase {
    pattern: string
}

export interface IValidationOptions {
    requiredData?: IRequired
    min?: IMin
    max?: IMax
    minLength?: IMinLength
    maxLength?: IMaxLength
    pattern?: IPattern
}

export const isRequired = (required: boolean, error?: string, guide?: string): IRequired => {
    return {
        required,
        error,
        guide
    }
}

export const hasMin = (min: number, error?: string, guide?: string): IMin => {
    return {
        min,
        error,
        guide
    }
}

export const hasMax = (max: number, error?: string, guide?: string): IMax => {
    return {
        max,
        error,
        guide
    }
}

export const hasMinLength = (minLength: number, error?: string, guide?: string): IMinLength => {
    return {
        minLength,
        error,
        guide
    }
}

export const hasMaxLength = (maxLength: number, error?: string, guide?: string): IMaxLength => {
    return {
        maxLength,
        error,
        guide
    }
}

export const hasPattern = (pattern: string, error?: string, guide?: string): IPattern => {
    return {
        pattern,
        error,
        guide
    }
}

export const ValidationErrorsCodes = {
    min: 'MIN_ERROR',
    max: 'MAX_ERROR',
    minLength: 'MIN_LENGTH_ERROR',
    maxLength: 'MAX_LENGTH_ERROR',
    required: 'REQUIRED',
    custom: 'CUSTOM'
}
