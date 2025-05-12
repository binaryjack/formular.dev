import { IValidationSchemaBuilder } from '../validation.schema.builder.types'

export function hasCustomGuide(this: IValidationSchemaBuilder, messageOrKey?: string) {
    if (!messageOrKey) return this
    this.customGuide = messageOrKey
    return this
}
