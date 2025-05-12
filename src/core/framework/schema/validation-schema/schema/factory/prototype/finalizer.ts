import { ValidationSchemaBuilder } from '../../builder/validation.schema.builder'
import { IValidationSchemaBuilder } from '../../builder/validation.schema.builder.types'
import { IValidationSchemaFactory } from '../validation.schema.factory.types'

export function finalizer(
    this: IValidationSchemaFactory,
    required: boolean,
    base?: IValidationSchemaBuilder,
    pattern?: RegExp,
    customGuide?: string,
    customError?: string
) {
    return new ValidationSchemaBuilder(`${this.name}-factored`)
        .fromBuilder(base)
        .isRequired(required)
        .hasPattern(pattern)
        .hasCustomError(customError)
        .hasCustomGuide(customGuide)
        .build()
}
