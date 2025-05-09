import { FieldTypeNames } from '@core/framework/common/common.field.types'
import { FieldTypeMap } from '@core/mapping/field-type-maps'
import { consoleTrackingProvider } from '@core/tracker/tracker.default.provider'
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
import { createField, FieldBuilder, IBuilder, IFieldBuilder } from './builder/field-builder'

export interface IFieldFactory {
    new (): IFieldFactory
    create: <T>(type: FieldTypeNames) => IBuilder<T>
}

const fieldRegistry = <T>(
    builder: IFieldBuilder,
    type: keyof FieldTypeMap
): IBuilder<T> | undefined => {
    switch (type) {
        case 'toggle':
        case 'checkbox':
            return createField(builder.createCheckBased) as IBuilder<T>
        case 'select':
            return createField(builder.createSelectBased) as IBuilder<T>
        case 'radio':
            return createField(builder.createRadioBased) as IBuilder<T>
        case 'text':
        default:
            return createField(builder.createTextBased) as IBuilder<T>
    }
}
const defaultValueParsersStrategies: IParserStrategy<any>[] = [
    booleanParserStrategy,
    stringParserStrategy,
    numericParserStrategy,
    dateOrTimeParserStrategy,
    numericOptionBasedParserStrategy
]

const defaultValidationStrategies: IValidationMethodStrategy[] = [
    ValidatorMaxLengthStrategy,
    ValidatorMaxStrategy,
    ValidatorMinLengthStrategy,
    ValidatorMinStrategy,
    ValidatorRequiredStrategy,
    ValidatorPatternStrategy
]

const defaultOutputTracker = consoleTrackingProvider

export const FieldFactory = function (this: IFieldFactory) {
    this.create = function <T>(this: IFieldFactory, type: FieldTypeNames): IBuilder<T> {
        const builder = new FieldBuilder()
        return fieldRegistry<T>(builder, type) as IBuilder<T>
    }
} as any as IFieldFactory
