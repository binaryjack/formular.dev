import { ISchemaValidationData, IValidationDataBuilder } from './validation.types'

export const ValidationDataBuilder = function (this: IValidationDataBuilder, name: string) {
    this.name = name
    this.required = false
    this.shouldValidate = false
    this.pattern = undefined
    this.min = undefined
    this.max = undefined
    this.minLength = undefined
    this.maxLength = undefined
    this.customGuide = undefined
    this.customError = undefined
} as any as IValidationDataBuilder

ValidationDataBuilder.prototype = {
    /** aim to ease chaining from existing or not builder in factory */
    fromBuilder: function (baseBuilder?: IValidationDataBuilder) {
        if (!baseBuilder) return this
        return { ...baseBuilder }
    },
    isRequired: function (required: boolean) {
        this.required = required
        return this
    },
    hasMin: function (min: number) {
        this.min = min
        return this
    },
    hasMax: function (max: number) {
        this.max = max
        return this
    },
    hasMinLength: function (minLength: number) {
        this.minLength = minLength
        return this
    },
    hasMaxLength: function (maxLength: number) {
        this.maxLength = maxLength
        return this
    },
    hasPattern: function (pattern?: string) {
        if (!pattern) return this
        this.pattern = pattern
        return this
    },
    hasCustomGuide: function (messageOrKey?: string) {
        if (!messageOrKey) return this
        this.customGuide = messageOrKey
        return this
    },
    hasCustomError: function (messageOrKey?: string) {
        if (!messageOrKey) return this
        this.customError = messageOrKey
        return this
    },
    build: function () {
        return { ...this } as ISchemaValidationData
    }
}
