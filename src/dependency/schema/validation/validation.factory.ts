import { ValidationDataBuilder } from './validation.builder'
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
} from './validation.builders'
import {
    IValidationDataBuilder,
    IValidationFactory,
    minMaxMethodBuilderTypes
} from './validation.types'

export const ValidationFactory = function (this: IValidationFactory) {
    this.builders = []
} as any as IValidationFactory

ValidationFactory.prototype = {
    addBuilders: function (...builders: minMaxMethodBuilderTypes[]) {
        this.builders = [...builders]
    },
    createMinMaxBasedBuilder: function <minMaxMethodBuilderTypes>(builderName: string) {
        const _builder: IValidationDataBuilder | undefined = this.builders.find(
            (o: IValidationDataBuilder) => o.name === builderName
        )
        if (!_builder) return this.builders.find((o: IValidationDataBuilder) => o.name === 'empty')
        return _builder as minMaxMethodBuilderTypes
    },
    finalizer: function (
        required: boolean,
        base?: IValidationDataBuilder,
        pattern?: RegExp,
        customGuide?: string,
        customError?: string
    ) {
        return new ValidationDataBuilder(`${name}-factored`)
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
        return new ValidationDataBuilder(`${name}-factored`)
            .isRequired(required)
            .hasPattern(pattern)
            .hasCustomError(customError)
            .hasCustomGuide(customGuide)
            .build()
    }
}

const validationFactory = new ValidationFactory()

validationFactory.addBuilders(
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

export default validationFactory
