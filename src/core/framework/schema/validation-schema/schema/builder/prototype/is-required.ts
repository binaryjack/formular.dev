import { IValidationSchemaBuilder } from '../validation.schema.builder.types'

export function isRequired(this: IValidationSchemaBuilder, required: boolean) {
    this.required = required
    return this
}
