import { FieldTypeNames } from '@core/framework/common/common.field.types'
import { consoleTrackingProvider } from '@core/managers/tracking-manager/tracker-manager.default.provider'
import { ValidatorMaxLengthStrategy } from '@core/managers/validation-manager/strategies/validator-max-length-strategy'
import { ValidatorMaxStrategy } from '@core/managers/validation-manager/strategies/validator-max-strategy'
import { ValidatorMinLengthStrategy } from '@core/managers/validation-manager/strategies/validator-min-length-strategy'
import { ValidatorMinStrategy } from '@core/managers/validation-manager/strategies/validator-min-strategy'
import { ValidatorRequiredStrategy } from '@core/managers/validation-manager/strategies/validator-required-strategy'
import { ValidatorPatternStrategy } from '@core/managers/validation-manager/strategies/vaslidator-pattern-strategy'
import { IValidationMethodStrategy } from '@core/managers/validation-manager/validation-manager.types'
import { booleanParserStrategy } from '@core/managers/value-manager/strategies/boolean-based-parser-strategy'
import { dateOrTimeParserStrategy } from '@core/managers/value-manager/strategies/date-or-time-based-parser-strategy'
import { numericParserStrategy } from '@core/managers/value-manager/strategies/numeric-based-parser-strategy'
import { numericOptionBasedParserStrategy } from '@core/managers/value-manager/strategies/numeric-option-based-parser-strategy'
import { stringParserStrategy } from '@core/managers/value-manager/strategies/string-based-parser-strategy'
import { IParserStrategy } from '@core/managers/value-manager/value-manager.types'
import { createField, FieldBuilder, IBuilder, IFieldBuilder } from '../builder/field-builder'
import { FieldTypeMap } from './mapping/field-type-map'

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
            return createField(builder.createCheckBased.bind(builder)) as IBuilder<T>
        case 'select':
            return createField(builder.createSelectBased.bind(builder)) as IBuilder<T>
        case 'radio':
            return createField(builder.createRadioBased.bind(builder)) as IBuilder<T>
        case 'text':
        default:
            return createField(builder.createTextBased.bind(builder)) as IBuilder<T>
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
