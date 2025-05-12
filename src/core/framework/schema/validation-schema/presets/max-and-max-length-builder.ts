import { ValidationSchemaBuilder } from '../schema/builder/validation.schema.builder'
import { IValidationSchemaBuilder } from '../schema/builder/validation.schema.builder.types'
import { ValidationSchemaBuildersEnum } from './builders.enum'

export const MaxAndMaxLengthBuilder = (max: number, maxLength: number): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MaxAndMaxLengthBuilder)
        .hasMax(max)
        .hasMaxLength(maxLength)
