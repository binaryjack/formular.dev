import { ValidationSchemaBuilderType } from '../schema/builder/validation.schema.builder.types'
import validationSchemaFactory from '../schema/factory/validation.schema.factory'
import { ValidationSchemaBuildersEnum } from './builders.enum'
export const eMAilBuilder =
    validationSchemaFactory.createValidationSchemaBuilder<ValidationSchemaBuilderType>(
        ValidationSchemaBuildersEnum.MaxLengthBuilder
    )?.(150)
