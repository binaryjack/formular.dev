import { ValidationSchemaBuilderType } from '../schema/builder/validation.schema.builder.types'
import validationSchemaFactory from '../schema/factory/validation.schema.factory'
import { ValidationSchemaBuildersEnum } from './builders.enum'

/** base required name validator between 3 and 50 length*/
export const minMaxNameBuilder =
    validationSchemaFactory.createValidationSchemaBuilder<ValidationSchemaBuilderType>(
        ValidationSchemaBuildersEnum.MinLengthAndMaxLengthBuilder
    )?.(3, 50)
