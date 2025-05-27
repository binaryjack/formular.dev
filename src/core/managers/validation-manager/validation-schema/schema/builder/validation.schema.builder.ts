import { build } from './prototype/build'
import { fromBuilder } from './prototype/from-builder'
import { hasCustomError } from './prototype/has-custom-error'
import { hasCustomGuide } from './prototype/has-custom-guide'
import { hasMax } from './prototype/has-max'
import { hasMaxLength } from './prototype/has-max-length'
import { hasMin } from './prototype/has-min'
import { hasMinLength } from './prototype/has-min-length'
import { hasPattern } from './prototype/has-pattern'
import { isRequired } from './prototype/is-required'
import { IValidationSchemaBuilder } from './validation.schema.builder.types'

export const ValidationSchemaBuilder = function (this: IValidationSchemaBuilder, name: string) {
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

Object.assign(ValidationSchemaBuilder.prototype, {
    /** aim to ease chaining from existing or not builder in factory */
    fromBuilder,
    isRequired,
    hasMin,
    hasMax,
    hasMinLength,
    hasMaxLength,
    hasPattern,
    hasCustomGuide,
    hasCustomError,
    build
})
