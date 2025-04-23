import { ValidationSchemaBuilder } from '../schema/builder/validation.schema.builder'
import { ValidationSchemaBuildersEnum } from './builders.types'

export const RequiredBuilder = () =>
    new ValidationSchemaBuilder(ValidationSchemaBuildersEnum.RequiredBuilder)
