import { ValidationSchemaBuilderType } from '../schema/builder/validation.schema.builder.types'
import validationSchemaFactory from '../schema/factory/validation.schema.factory'
import { ValidationSchemaBuildersEnum } from './builders.types'

/** base required name validator between 3 and 50 length*/
export const minMaxDatesBuilder =
    validationSchemaFactory.createValidationSchemaBuilder<ValidationSchemaBuilderType>(
        ValidationSchemaBuildersEnum.MinLengthAndMaxLengthBuilder
    )?.(10, 10)
