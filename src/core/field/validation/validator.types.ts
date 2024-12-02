import { IFieldError, IFieldGuide } from '../../../dependency/errors'
import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'

export type ValidationTriggerModeType =
    | 'onBlur'
    | 'onChange'
    | 'onSubmit'
    | 'onFocus'
    | 'onLoad'
    | 'reset'

export interface IValidationOrigin {
    fieldName: string
    fieldState: ValidationTriggerModeType
}

export interface IDoValidate {
    formId: string
}

export interface IValidationResult {
    state: boolean
    fieldName: string
    error?: IFieldError
    guide?: IFieldGuide
    strategyData?: IValidatorStrategyData
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
    error?: IFieldError,
    guide?: IFieldGuide,
    strategyData?: IValidatorStrategyData
): IValidationResult => {
    return { state, fieldName, error, guide, strategyData }
}

export interface IValidatorStrategyData {
    fieldName: string
    type: string
    validationOptions: IValidationOptions
    value: FieldValuesTypes | null
    expectedValue: FieldValuesTypes | null
    origin: IValidationOrigin | null
}

export const newValidatorStrategyData = (
    fieldName: string,
    type: string,
    validationOptions: IValidationOptions,
    value: FieldValuesTypes | null,
    expectedValue?: FieldValuesTypes | null,
    origin?: IValidationOrigin
) => {
    return {
        fieldName: fieldName,
        type: type,
        validationOptions: validationOptions,
        value: value,
        expectedValue: expectedValue !== undefined ? expectedValue : null,
        origin: origin ?? null
    } as IValidatorStrategyData
}

export interface IValidatorStrategy {
    new (): IValidatorStrategy
    validate: (data: IValidatorStrategyData) => IValidationResult
}

export type IValidatorStrategyType = (data: IValidatorStrategyData) => IValidatorStrategy

export interface IValidator {
    new (): IValidator
    strategies: IValidatorStrategy[]
    addStrategies: (...strategies: IValidatorStrategy[]) => void
    validate: (data: IValidatorStrategyData) => IValidationResult[]
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
    required?: IRequired
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
