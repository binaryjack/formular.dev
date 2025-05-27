import { IValidationSchemaBuilder } from '../validation.schema.builder.types'

export function hasMin(this: IValidationSchemaBuilder, min: number) {
    this.min = min
    return this
}
