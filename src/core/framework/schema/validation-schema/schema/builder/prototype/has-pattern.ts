import { IValidationSchemaBuilder } from '../validation.schema.builder.types'

export function hasPattern(this: IValidationSchemaBuilder, pattern?: RegExp) {
    if (!pattern) return this
    this.pattern = pattern
    return this
}
