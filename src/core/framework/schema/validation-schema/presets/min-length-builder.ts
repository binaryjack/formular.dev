import { ValidationSchemaBuilder } from '../schema/builder/validation.schema.builder'
import { IValidationSchemaBuilder } from '../schema/builder/validation.schema.builder.types'
import { ValidationSchemaBuildersEnum } from './builders.enum'

export const MinLengthBuilder = (minLength: number): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MinLengthBuilder).hasMinLength(
        minLength
    )
