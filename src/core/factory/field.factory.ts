import { FieldTypes } from '@core/common.types'
import { FieldInput } from '@core/fields/field-base-input/field-input-base'
import { IBaseField } from '@core/fields/field-base-input/field-input-base-types'
import { TextBaseInput } from '@core/fields/text-base-input/text-base-input'
import { ValidatorMaxLengthStrategy } from '@core/validation-strategy/strategies/validator-max-length-strategy'
import { ValidatorMaxStrategy } from '@core/validation-strategy/strategies/validator-max-strategy'
import { ValidatorMinLengthStrategy } from '@core/validation-strategy/strategies/validator-min-length-strategy'
import { ValidatorMinStrategy } from '@core/validation-strategy/strategies/validator-min-strategy'
import { ValidatorRequiredStrategy } from '@core/validation-strategy/strategies/validator-required-strategy'
import { ValidatorPatternStrategy } from '@core/validation-strategy/strategies/vaslidator-pattern-strategy'
import { IValidationMethodStrategy } from '@core/validation-strategy/validation-strategy.types'
import { booleanParserStrategy } from '@core/value-strategy/strategies/boolean-based-parser-strategy'
import { dateOrTimeParserStrategy } from '@core/value-strategy/strategies/date-or-time-based-parser-strategy'
import { numericParserStrategy } from '@core/value-strategy/strategies/numeric-based-parser-strategy'
import { numericOptionBasedParserStrategy } from '@core/value-strategy/strategies/numeric-option-based-parser-strategy'
import { stringParserStrategy } from '@core/value-strategy/strategies/string-based-parser-strategy'
import { IParserStrategy } from '@core/value-strategy/value-strategy.types'
import { IFieldDescriptor } from '@dependency/schema/descriptor/field.descriptor'

export interface IFieldFactory {
    new (): IFieldFactory
    create: (type: FieldTypes, descriptor: IFieldDescriptor) => IBaseField
}

const valueParsers: IParserStrategy<any>[] = [
    booleanParserStrategy,
    stringParserStrategy,
    numericParserStrategy,
    dateOrTimeParserStrategy,
    numericOptionBasedParserStrategy
]

const validationStrategies: IValidationMethodStrategy[] = [
    ValidatorMaxLengthStrategy,
    ValidatorMaxStrategy,
    ValidatorMinLengthStrategy,
    ValidatorMinStrategy,
    ValidatorRequiredStrategy,
    ValidatorPatternStrategy
]

export const FieldFactory = function (this: IFieldFactory) {
    this.create = function (
        this: IFieldFactory,
        type: FieldTypes,
        descriptor: IFieldDescriptor
    ): IBaseField {
        const _baseInput = new FieldInput(descriptor)
        _baseInput.initializeEvents()
        _baseInput.initializeDommable()
        _baseInput.initializeStyle()
        _baseInput.initializeTracking()
        _baseInput.initializeValidationStrategy(...validationStrategies)
        _baseInput.initializeValueStrategy(...valueParsers)

        switch (type) {
            case 'STRING':
                const _textField = new TextBaseInput()
                _textField.initialize(_baseInput)
                return _textField

            default:
                return _baseInput
        }
    }
}
