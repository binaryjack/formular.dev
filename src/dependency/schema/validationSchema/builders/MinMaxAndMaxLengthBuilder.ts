import { ValidationSchemaBuilder } from '../schema/builder/validation.schema.builder'
import { IValidationSchemaBuilder } from '../schema/builder/validation.schema.builder.types'
import { ValidationSchemaBuildersEnum } from './builders.types'

export const MinMaxAndMaxLengthBuilder = (
    min: number,
    max: number,
    maxLength: number
): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MinMaxAndMaxLengthBuilder)
        .hasMin(min)
        .hasMax(max)
        .hasMaxLength(maxLength)
