import { ValidationSchemaBuilder } from '../schema/builder/validation.schema.builder'
import { IValidationSchemaBuilder } from '../schema/builder/validation.schema.builder.types'
import { ValidationSchemaBuildersEnum } from './builders.enum'

export const MaxMinLengthAndMaxLengthBuilder = (
    max: number,
    minLength: number,
    maxLength: number
): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MaxMinLengthAndMaxLengthBuilder)
        .hasMax(max)
        .hasMinLength(minLength)
        .hasMaxLength(maxLength)
