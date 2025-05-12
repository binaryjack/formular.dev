import { ValidationSchemaBuilder } from '../../builder/validation.schema.builder'
import { IValidationSchemaFactory } from '../validation.schema.factory.types'

export function create(
    this: IValidationSchemaFactory,
    required: boolean,
    pattern?: RegExp,
    customGuide?: string,
    customError?: string
) {
    return new ValidationSchemaBuilder(`${this.name}-factored`)
        .isRequired(required)
        .hasPattern(pattern)
        .hasCustomError(customError)
        .hasCustomGuide(customGuide)
        .build()
}
