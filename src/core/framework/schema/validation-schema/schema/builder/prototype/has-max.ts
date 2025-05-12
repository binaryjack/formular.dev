import { IValidationSchemaBuilder } from '../validation.schema.builder.types'

export function hasMax(this: IValidationSchemaBuilder, max: number) {
    this.max = max
    return this
}
