import { IValidationSchemaBuilder } from '../validation.schema.builder.types'

export function hasMinLength(this: IValidationSchemaBuilder, minLength: number) {
    this.minLength = minLength
    return this
}
