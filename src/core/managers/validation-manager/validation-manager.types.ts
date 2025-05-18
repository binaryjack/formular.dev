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
    error?: string
    guide?: string
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
    error?: string,
    guide?: string
): IValidationResult => {
    return { state, fieldName, code, error, guide, triggerEventTypes }
}

export type IValidationStrategyType = (field: IInput) => IValidationManager

export interface IValidationMethodStrategy {
    new (): IValidationMethodStrategy
    name: string
    validate: (field: IExtendedInput) => IValidationResult
    validateAsync: (field: IExtendedInput) => Promise<IValidationResult>
}

export interface IValidationManager extends IInitializableDependency {
    new (): IValidationManager
    validationStrategies: IValidationMethodStrategy[]
    isValidating: boolean
    validationTriggerModeType: EventsType[]
    addValidationStrategies: (...parsers: IValidationMethodStrategy[]) => void
    addValidationStrategy: (parser: IValidationMethodStrategy) => void
    setValidationTriggerMode: (mode: EventsType[]) => void
    validate: (field: IExtendedInput, reset?: boolean) => IValidationResult[]
    validateAsync?: (field: IExtendedInput, reset?: boolean) => Promise<IValidationResult[]>
    validateMany: (fields: IExtendedInput[], reset?: boolean) => IValidationResult[]
    validateManyAsync?: (fields: IExtendedInput[], reset?: boolean) => Promise<IValidationResult[]>
}

export interface IValidationTextBase {
    error?: IFieldError
    guide?: IFieldGuide
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

export const ValidationErrorsCodes = {
    min: 'MIN_ERROR',
    max: 'MAX_ERROR',
    minLength: 'MIN_LENGTH_ERROR',
    maxLength: 'MAX_LENGTH_ERROR',
    required: 'REQUIRED',
    pattern: 'PATTERN',
    custom: 'CUSTOM'
}

export type ValidationErrorsCodesType = keyof typeof ValidationErrorsCodes
export type ValidationErrorsCodesValue = (typeof ValidationErrorsCodes)[ValidationErrorsCodesType]
