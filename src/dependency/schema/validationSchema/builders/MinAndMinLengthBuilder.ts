import { ValidationSchemaBuilder } from '../schema/builder/validation.schema.builder'
import { IValidationSchemaBuilder } from '../schema/builder/validation.schema.builder.types'
import { ValidationSchemaBuildersEnum } from './builders.types'

export const MinAndMinLengthBuilder = (min: number, minLength: number): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MinAndMinLengthBuilder)
        .hasMin(min)
        .hasMinLength(minLength)
