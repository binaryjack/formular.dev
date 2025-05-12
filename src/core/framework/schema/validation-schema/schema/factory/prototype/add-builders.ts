import { ValidationSchemaBuilderType } from '../../builder/validation.schema.builder.types'
import { IValidationSchemaFactory } from '../validation.schema.factory.types'

export function addBuilders(
    this: IValidationSchemaFactory,
    ...builders: ValidationSchemaBuilderType[]
) {
    this.builders = [...builders]
}
