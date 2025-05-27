import { ValidationSchemaBuilder } from '../schema/builder/validation.schema.builder'
import { ValidationSchemaBuildersEnum } from './builders.enum'

export const BaseEmptyBuilder = () =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.BaseEmptyBuilder)
