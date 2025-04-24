import { ValidationSchemaBuilder } from '../schema/builder/validation.schema.builder'
import { IValidationSchemaBuilder } from '../schema/builder/validation.schema.builder.types'
import { ValidationSchemaBuildersEnum } from './builders.types'

export const MaxAndMinLengthBuilder = (max: number, minLength: number): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MaxAndMinLengthBuilder)
        .hasMax(max)
        .hasMinLength(minLength)
