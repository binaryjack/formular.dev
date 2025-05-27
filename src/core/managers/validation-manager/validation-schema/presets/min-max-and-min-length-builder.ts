import { ValidationSchemaBuilder } from '../schema/builder/validation.schema.builder'
import { IValidationSchemaBuilder } from '../schema/builder/validation.schema.builder.types'
import { ValidationSchemaBuildersEnum } from './builders.enum'

export const MinMaxAndMinLengthBuilder = (
    min: number,
    max: number,
    minLength: number
): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MinMaxAndMinLengthBuilder)
        .hasMin(min)
        .hasMax(max)
        .hasMinLength(minLength)
