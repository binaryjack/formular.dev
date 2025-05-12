import { ValidationSchemaBuilder } from '../schema/builder/validation.schema.builder'
import { IValidationSchemaBuilder } from '../schema/builder/validation.schema.builder.types'
import { ValidationSchemaBuildersEnum } from './builders.enum'

export const MinMinLengthAndMaxLengthBuilder = (
    min: number,
    minLength: number,
    maxLength: number
): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MinMinLengthAndMaxLengthBuilder)
        .hasMin(min)
        .hasMinLength(minLength)
        .hasMaxLength(maxLength)
