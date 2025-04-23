import { ValidationSchemaBuilder } from '../schema/builder/validation.schema.builder'
import { IValidationSchemaBuilder } from '../schema/builder/validation.schema.builder.types'
import { ValidationSchemaBuildersEnum } from './builders.types'

export const MinMaxMinLengthAndMaxLengthBuilder = (
    min: number,
    max: number,
    minLength: number,
    maxLength: number
): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MinMaxMinLengthAndMaxLengthBuilder)
        .hasMin(min)
        .hasMax(max)
        .hasMinLength(minLength)
        .hasMaxLength(maxLength)
