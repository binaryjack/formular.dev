import { BaseEmptyBuilder } from '../../builders/base-empty-builder'
import { MaxAndMaxLengthBuilder } from '../../builders/max-and-max-length-builder'
import { MaxAndMinLengthBuilder } from '../../builders/max-and-min-length-builder'
import { MaxBuilder } from '../../builders/max-builder'
import { MaxLengthBuilder } from '../../builders/max-length-builder'
import { MaxMinLengthAndMaxLengthBuilder } from '../../builders/max-min-length-and-max-length-builder'
import { MinAndMaxLengthBuilder } from '../../builders/min-and-max-length-builder'
import { MinAndMinLengthBuilder } from '../../builders/min-and-min-length-builder'
import { MinBuilder } from '../../builders/min-builder'
import { MinLengthAndMaxLengthBuilder } from '../../builders/min-length-and-max-length-builder'
import { MinLengthBuilder } from '../../builders/min-length-builder'
import { MinMaxAndMinLengthBuilder } from '../../builders/min-max-and-min-length-builder'
import { MinMaxBuilder } from '../../builders/min-max-builder'
import { MinMinLengthAndMaxLengthBuilder } from '../../builders/min-min-length-and-max-length-builder'
import { RequiredBuilder } from '../../builders/required-builder'
import { ValidationSchemaBuilder } from '../builder/validation.schema.builder'
import {
    IValidationSchemaBuilder,
    ValidationSchemaBuilderType
} from '../builder/validation.schema.builder.types'
import { IValidationSchemaFactory } from './validation.schema.factory.types'

export const ValidationSchemaFactory = function (this: IValidationSchemaFactory) {
    this.builders = []
} as any as IValidationSchemaFactory

ValidationSchemaFactory.prototype = {
    addBuilders: function (
        this: IValidationSchemaFactory,
        ...builders: ValidationSchemaBuilderType[]
    ) {
        this.builders = [...builders]
    },
    createValidationSchemaBuilder: function <ValidationSchemaBuilderType>(
        this: IValidationSchemaFactory,
        builderName: string
    ) {
        const _builder = this.builders.find((o) => o.name === builderName)
        if (!_builder) return this.builders.find((o) => o.name === 'empty')
        return _builder as ValidationSchemaBuilderType
    },
    finalizer: function (
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
    },
    create: function (
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
}

const validationSchemaFactory = new ValidationSchemaFactory()

validationSchemaFactory.addBuilders(
    BaseEmptyBuilder,
    RequiredBuilder,
    MinBuilder,
    MaxBuilder,
    MinMaxBuilder,
    MinAndMinLengthBuilder,
    MaxAndMinLengthBuilder,
    MinMaxAndMinLengthBuilder,
    MinAndMaxLengthBuilder,
    MaxAndMaxLengthBuilder,
    MinMinLengthAndMaxLengthBuilder,
    MaxMinLengthAndMaxLengthBuilder,
    MinLengthBuilder,
    MaxLengthBuilder,
    MinLengthAndMaxLengthBuilder
)

export default validationSchemaFactory
