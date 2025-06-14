import { IFieldError } from '@core/framework/models/errors/i-field-error'
import { IFieldGuide } from '@core/framework/models/errors/i-field-guide'
import { IValidationTextBase, ValidationErrorsCodesType } from '../validation-manager.types'

export interface IDescriptorValidtionBuilder<T extends IValidationTextBase> {
    new <T extends IValidationTextBase>(
        type: ValidationErrorsCodesType
    ): IDescriptorValidtionBuilder<T>
    type: ValidationErrorsCodesType
    max: number | null
    min: number | null
    minLength: number | null
    maxLength: number | null
    pattern: RegExp | null
    required: boolean | null
    error: () => IFieldError
    guide: () => IFieldGuide

    setRequired: (required: boolean | null) => IDescriptorValidtionBuilder<T>
    setMin: (min: number | null) => IDescriptorValidtionBuilder<T>
    setMax: (max: number | null) => IDescriptorValidtionBuilder<T>
    setMinLength: (minLength: number | null) => IDescriptorValidtionBuilder<T>
    setMaxLength: (maxLength: number | null) => IDescriptorValidtionBuilder<T>
    setPattern: (pattern: RegExp | null) => IDescriptorValidtionBuilder<T>
    setError: (error: () => IFieldError) => IDescriptorValidtionBuilder<T>
    setGuide: (guide: () => IFieldGuide) => IDescriptorValidtionBuilder<T>
    build: () => T
}

export const DescriptorValidationBuilder = function <T extends IValidationTextBase>(
    this: IDescriptorValidtionBuilder<T>,
    type: ValidationErrorsCodesType
) {
    this.type = type
    this.setRequired = function (required: boolean | null): IDescriptorValidtionBuilder<T> {
        this.required = required
        return this
    }
    this.setMin = function (min: number | null): IDescriptorValidtionBuilder<T> {
        this.min = min
        return this
    }
    this.setMax = function (max: number | null): IDescriptorValidtionBuilder<T> {
        this.max = max
        return this
    }
    this.setMinLength = function (minLength: number | null): IDescriptorValidtionBuilder<T> {
        this.minLength = minLength
        return this
    }
    this.setMaxLength = function (maxLength: number | null): IDescriptorValidtionBuilder<T> {
        this.maxLength = maxLength
        return this
    }
    this.setPattern = function (pattern: RegExp | null): IDescriptorValidtionBuilder<T> {
        this.pattern = pattern
        return this
    }
    this.setError = function (error: () => IFieldError): IDescriptorValidtionBuilder<T> {
        this.error = error
        return this
    }
    this.setGuide = function (guide: () => IFieldGuide): IDescriptorValidtionBuilder<T> {
        this.guide = guide
        return this
    }

    this.build = function (): T {
        let output: any = {}

        switch (this.type) {
            case 'required':
                output = {
                    required: this.required,
                    error: this.required ? this.error() : undefined,
                    guide: this.required ? this.guide() : undefined
                }
                break
            case 'min':
                output = {
                    min: this.min,
                    error: this.min !== null ? this.error() : undefined,
                    guide: this.min !== null ? this.guide() : undefined
                }
                break
            case 'max':
                output = {
                    max: this.max,
                    error: this.max !== null ? this.error() : undefined,
                    guide: this.max !== null ? this.guide() : undefined
                }
                break
            case 'minLength':
                output = {
                    minLength: this.minLength,
                    error: this.minLength !== null ? this.error() : undefined,
                    guide: this.minLength !== null ? this.guide() : undefined
                }
                break
            case 'maxLength':
                output = {
                    maxLength: this.maxLength,
                    error: this.maxLength !== null ? this.error() : undefined,
                    guide: this.maxLength !== null ? this.guide() : undefined
                }
                break

            case 'pattern':
                output = {
                    pattern: this.pattern,
                    error: this.pattern !== null ? this.error() : undefined,
                    guide: this.pattern !== null ? this.guide() : undefined
                }
                break
            default:
                throw new Error(`Unknown validation type: ${this.type}`)
        }

        return output as T
    }
} as any as IDescriptorValidtionBuilder<any>
