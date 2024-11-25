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
    IValidationFatory,
    minMaxMethodBuilderTypes,
    ValidationBuildersEnum
} from './validation.types'

const ValidationFatory = function (this: IValidationFatory) {
    this.builders = []
} as any as IValidationFatory

ValidationFatory.prototype = {
    addBuilders: function (...builders: minMaxMethodBuilderTypes[]) {
        this.builders = [...builders]
    },
    createMinMaxBasedBuilder: function (name: ValidationBuildersEnum) {
        const _builder: IValidationDataBuilder | undefined = this.builders.find(
            (o: IValidationDataBuilder) => o.name === name
        )
        if (!_builder) return this.builders.find((o: IValidationDataBuilder) => o.name === 'empty')
        return _builder
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

const validationFactory = new ValidationFatory()

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
