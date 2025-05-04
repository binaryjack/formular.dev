import { CheckBoxInput } from '@core/fields/check-box-base-input/check-box-base-input'
import { ClickBaseInput } from '@core/fields/click-base-input/click-base-input'
import { FieldInput } from '@core/fields/field-base-input/field-input-base'
import { IFieldInputExtended } from '@core/fields/field-base-input/field-input-base-types'
import { OptionBaseInput } from '@core/fields/option-based-input/option-base-input'
import { RadioBaseInput } from '@core/fields/radio-base-input/radio-base-input'
import { SelectBaseInput } from '@core/fields/select-base-input/select-base-input'
import { TextBaseInput } from '@core/fields/text-base-input/text-base-input'
import { FieldTypeNames } from '@core/framework/common/common.field.types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { FieldTypeMap } from '@core/mapping/field-type-maps'
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

export interface IFieldFactory {
    new (): IFieldFactory
    create: <T extends keyof FieldTypeMap>(
        type: FieldTypeNames,
        descriptor: IFieldDescriptor
    ) => FieldTypeMap[T]
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

type FieldConstructor = (baseInput: IFieldInputExtended) => IFieldInputExtended

const createText = (baseInput: IFieldInputExtended): IFieldInputExtended => {
    const _textField = new TextBaseInput()
    _textField.initialize(baseInput)
    return _textField
}

const createClick = (baseInput: IFieldInputExtended): IFieldInputExtended => {
    const _clickBaseInput = new ClickBaseInput()
    _clickBaseInput.initialize(baseInput)
    return _clickBaseInput
}

const createOptionBased = (baseInput: IFieldInputExtended): IFieldInputExtended => {
    const _optionBaseInput = new OptionBaseInput()
    _optionBaseInput.initialize(baseInput)

    return _optionBaseInput
}

const createCheckbox = (baseInput: IFieldInputExtended): IFieldInputExtended => {
    const _clickBaseInput = createClick(baseInput)
    const _checkBoxField = new CheckBoxInput()
    _checkBoxField.initialize(_clickBaseInput)
    return _checkBoxField
}

const createSelect = (baseInput: IFieldInputExtended): IFieldInputExtended => {
    const _clickBaseInput = createClick(baseInput)
    const _optionBaseInput = createOptionBased(_clickBaseInput)
    const _selectField = new SelectBaseInput()
    _selectField.initialize(_optionBaseInput)
    return _selectField
}

const createRadio = (baseInput: IFieldInputExtended): IFieldInputExtended => {
    const _clickBaseInput = createClick(baseInput)
    const _optionBaseInput = createOptionBased(_clickBaseInput)
    const _radioField = new RadioBaseInput()
    _radioField.initialize(_optionBaseInput)
    return _radioField
}

const fieldRegistry = <T>(type: keyof FieldTypeMap): FieldConstructor => {
    switch (type) {
        case 'toggle':
        case 'checkbox':
            return createCheckbox
        case 'select':
            return createSelect
        case 'radio':
            return createRadio
        case 'text':
        default:
            return createText
    }
}

export const FieldFactory = function (this: IFieldFactory) {
    this.create = function <T extends keyof FieldTypeMap>(
        this: IFieldFactory,
        type: FieldTypeNames,
        descriptor: IFieldDescriptor
    ): FieldTypeMap[T] {
        const _baseInput = new FieldInput(descriptor)
        _baseInput.initializeEvents()
        _baseInput.initializeDommable()
        _baseInput.initializeStyle()
        _baseInput.initializeTracking()
        _baseInput.initializeValidationStrategy(...validationStrategies)
        _baseInput.initializeValueStrategy(...valueParsers)

        const constructor = fieldRegistry(type)
        if (!constructor) {
            throw new Error(`Unsupported field type: ${type}`)
        }

        return constructor(_baseInput as IFieldInputExtended) as FieldTypeMap[T]
    }
}
