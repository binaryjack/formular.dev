import { booleanParserStrategy } from '../strategies/boolean-parser-strategy'
import { dateOrTimeParserStrategy } from '../strategies/date-or-time-based-parser-strategy'
import { numericParserStrategy } from '../strategies/numeric-based-parser-strategy'
import { numericOptionBasedParserStrategy } from '../strategies/numeric-option-based-parser-strategy'
import { stringParserStrategy } from '../strategies/string-based-parser-strategy'
import { IParserStrategy } from '../value-manager.types'

export const defaultValueParsersStrategies: IParserStrategy<any>[] = [
    booleanParserStrategy,
    stringParserStrategy,
    numericParserStrategy,
    dateOrTimeParserStrategy,
    numericOptionBasedParserStrategy
]
