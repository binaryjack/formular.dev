import { ValidationSchemaBuilder } from './validation.schema.builder'
import {
    IValidationSchemaBuilder,
    minMaxMethodBuilderTypes
} from './validation.schema.builder.types'
import { IValidationSchemaFactory } from './validation.schema.factory.types'
import {
    BaseEmptyBuilder,
    MaxAndMaxLengthBuilder,
    MaxAndMinLengthBuilder,
    MaxBuilder,
    MaxLengthBuilder,
    MaxMinLengthAndMaxLengthBuilder,
    MinAndMaxLengthBuilder,
    MinAndMinLengthBuilder,
    MinBuilder,
    MinLengthAndMaxLengthBuilder,
    MinLengthBuilder,
    MinMaxAndMinLengthBuilder,
    MinMaxBuilder,
    MinMinLengthAndMaxLengthBuilder,
    RequiredBuilder
} from './validation.schema.specific.builders'

export const ValidationSchemaFactory = function (this: IValidationSchemaFactory) {
    this.builders = []
} as any as IValidationSchemaFactory

ValidationSchemaFactory.prototype = {
    addBuilders: function (...builders: minMaxMethodBuilderTypes[]) {
        this.builders = [...builders]
    },
    createMinMaxBasedBuilder: function <minMaxMethodBuilderTypes>(builderName: string) {
        const _builder: IValidationSchemaBuilder | undefined = this.builders.find(
            (o: IValidationSchemaBuilder) => o.name === builderName
        )
        if (!_builder)
            return this.builders.find((o: IValidationSchemaBuilder) => o.name === 'empty')
        return _builder as minMaxMethodBuilderTypes
    },
    finalizer: function (
        required: boolean,
        base?: IValidationSchemaBuilder,
        pattern?: RegExp,
        customGuide?: string,
        customError?: string
    ) {
        return new ValidationSchemaBuilder(`${name}-factored`)
            .fromBuilder(base)
            .isRequired(required)
            .hasPattern(pattern)
            .hasCustomError(customError)
            .hasCustomGuide(customGuide)
            .build()
    },
    create: function (
        required: boolean,
        pattern?: RegExp,
        customGuide?: string,
        customError?: string
    ) {
        return new ValidationSchemaBuilder(`${name}-factored`)
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
