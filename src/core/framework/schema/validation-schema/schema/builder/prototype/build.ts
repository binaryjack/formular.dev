import { IValidationSchema } from '../../../validation.schema.types'
import { IValidationSchemaBuilder } from '../validation.schema.builder.types'

export function build(this: IValidationSchemaBuilder): IValidationSchema {
    return { ...this } as IValidationSchema
}
