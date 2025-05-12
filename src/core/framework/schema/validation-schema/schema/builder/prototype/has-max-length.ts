import { IValidationSchemaBuilder } from '../validation.schema.builder.types'

export function hasMaxLength(this: IValidationSchemaBuilder, maxLength: number) {
    this.maxLength = maxLength
    return this
}
