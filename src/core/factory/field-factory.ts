import { FieldTypeNames } from '@core/framework/common/common.field.types'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
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
import { FieldBuilder, IFieldBuilder } from './builder/field-builder'

export interface IFieldFactory {
    new (): IFieldFactory
    create: <T>(type: FieldTypeNames, descriptor: IFieldDescriptor) => T
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

const defaultOutputTracker = consoleTrackingProvider

const fieldRegistry = <T>(builder: IFieldBuilder, type: keyof FieldTypeMap): T | undefined => {
    switch (type) {
        case 'toggle':
        case 'checkbox':
            return builder.createCheckBased() as T
        case 'select':
            return builder.createSelectBased() as T
        case 'radio':
            return builder.createRadioBased() as T
        case 'text':
        default:
            return builder.createTextBased() as T
    }
}

export const FieldFactory = function (this: IFieldFactory) {
    this.create = function <T>(
        this: IFieldFactory,
        type: FieldTypeNames,
        descriptor: IFieldDescriptor
    ): T {
        const builder = new FieldBuilder(descriptor)
            .initialize()
            .initializeTracking([defaultOutputTracker])
            .initializeDommable()
            .initializeNotifier()
            .initializeValidationStrategy(descriptor, ...validationStrategies)
            .initializeValueStrategy(...valueParsers)
            .initializeEvents()
            .initializeStyle()

        return fieldRegistry<T>(builder, type) as T
    }
} as any as IFieldFactory
