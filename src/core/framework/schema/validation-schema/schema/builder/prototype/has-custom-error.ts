import { IValidationSchemaBuilder } from '../validation.schema.builder.types'

export function hasCustomError(this: IValidationSchemaBuilder, messageOrKey?: string) {
    if (!messageOrKey) return this
    this.customError = messageOrKey
    return this
}
