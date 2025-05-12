import { ValidationSchemaBuilder } from '../schema/builder/validation.schema.builder'
import { IValidationSchemaBuilder } from '../schema/builder/validation.schema.builder.types'
import { ValidationSchemaBuildersEnum } from './builders.enum'

export const MinMaxBuilder = (min: number, max: number): IValidationSchemaBuilder =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.MinMaxBuilder).hasMin(min).hasMax(max)
