import { conventions } from '../../../../../components/context/conventions/conventions'
import { IValidationSchema } from '../../validation.schema.types'
import { IValidationSchemaBuilder } from './validation.schema.builder.types'

export const ValidationSchemaBuilder = function (this: IValidationSchemaBuilder, name: string) {
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
} as any as IValidationSchemaBuilder

ValidationSchemaBuilder.prototype = {
    /** aim to ease chaining from existing or not builder in factory */
    fromBuilder: function (this: IValidationSchemaBuilder, baseBuilder?: IValidationSchemaBuilder) {
        this.name = baseBuilder?.name ?? conventions.NameIsEmpty()
        this.required = baseBuilder?.required ?? false
        this.shouldValidate = baseBuilder?.shouldValidate
        this.pattern = baseBuilder?.pattern
        this.min = baseBuilder?.min
        this.max = baseBuilder?.max
        this.minLength = baseBuilder?.minLength
        this.maxLength = baseBuilder?.maxLength
        this.customGuide = baseBuilder?.customGuide
        this.customError = baseBuilder?.customError
        return this
    },
    isRequired: function (this: IValidationSchemaBuilder, required: boolean) {
        this.required = required
        return this
    },
    hasMin: function (this: IValidationSchemaBuilder, min: number) {
        this.min = min
        return this
    },
    hasMax: function (this: IValidationSchemaBuilder, max: number) {
        this.max = max
        return this
    },
    hasMinLength: function (this: IValidationSchemaBuilder, minLength: number) {
        this.minLength = minLength
        return this
    },
    hasMaxLength: function (this: IValidationSchemaBuilder, maxLength: number) {
        this.maxLength = maxLength
        return this
    },
    hasPattern: function (this: IValidationSchemaBuilder, pattern?: RegExp) {
        if (!pattern) return this
        this.pattern = pattern
        return this
    },
    hasCustomGuide: function (this: IValidationSchemaBuilder, messageOrKey?: string) {
        if (!messageOrKey) return this
        this.customGuide = messageOrKey
        return this
    },
    hasCustomError: function (this: IValidationSchemaBuilder, messageOrKey?: string) {
        if (!messageOrKey) return this
        this.customError = messageOrKey
        return this
    },
    build: function () {
        return { ...this } as IValidationSchema
    }
}
