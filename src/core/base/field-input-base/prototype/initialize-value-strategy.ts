import { booleanParserStrategy } from '../../value-strategy/strategies/boolean-based-parser-strategy'
import { dateOrTimeParserStrategy } from '../../value-strategy/strategies/date-or-time-based-parser-strategy'
import { numericParserStrategy } from '../../value-strategy/strategies/numeric-based-parser-strategy'
import { numericOptionBasedParserStrategy } from '../../value-strategy/strategies/numeric-option-based-parser-strategy'
import { stringParserStrategy } from '../../value-strategy/strategies/string-based-parser-strategy'
import { ValueStrategy } from '../../value-strategy/value-strategy'

import { IFieldInput } from '../field-input.types'

export const initializeValueStrategy = function (this: IFieldInput) {
    this.valueStrategy = new ValueStrategy(
        booleanParserStrategy,
        stringParserStrategy,
        numericParserStrategy,
        dateOrTimeParserStrategy,
        numericOptionBasedParserStrategy
    )
}
