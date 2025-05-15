import { EventsType } from '@core/framework/events/events.types'
import { IFieldError } from '@core/framework/models/errors/i-field-error'
import { IFieldGuide } from '@core/framework/models/errors/i-field-guide'
import { IExtendedInput, IInput } from '@core/input-engine/core/input-base/input-base.types'
import { IInitializableDependency } from '../initialization-manager/initialization-manager.types'

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
    triggerEventTypes: EventsType[]
    error?: IFieldError
    guide?: IFieldGuide
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
    triggerEventTypes: EventsType[],
    error?: IFieldError,
    guide?: IFieldGuide
): IValidationResult => {
    return { state, fieldName, code, error, guide, triggerEventTypes }
}

export type IValidationStrategyType = (field: IInput) => IValidationManager

export interface IValidationMethodStrategy {
    new (): IValidationMethodStrategy
    name: string
    validate: (field: IExtendedInput) => IValidationResult
}

export interface IValidationManager extends IInitializableDependency {
    new (): IValidationManager
    validationStrategies: IValidationMethodStrategy[]
    isValidating: boolean
    validationTriggerModeType: EventsType[]
    addValidationStrategies: (...parsers: IValidationMethodStrategy[]) => void
    setValidationTriggerMode: (mode: EventsType[]) => void
    validate: (field: IExtendedInput) => IValidationResult[]
    validateAll: (fields: IExtendedInput[]) => IValidationResults[]
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
