import { booleanParserStrategy } from '../strategies/boolean-parser-strategy'
import { dateParserStrategy } from '../strategies/date-parser-strategy'
import { numericOptionParserStrategy } from '../strategies/numeric-option-parser-strategy'
import { numericParserStrategy } from '../strategies/numeric-parser-strategy'
import { selectOptionParserStrategy } from '../strategies/select-option-parser-strategy'
import { stringParserStrategy } from '../strategies/string-parser-strategy'
import { IParserStrategy } from '../value-manager.types'

export const defaultValueParsersStrategies: IParserStrategy<any>[] = [
    booleanParserStrategy,
    stringParserStrategy,
    numericParserStrategy,
    dateParserStrategy,
    numericOptionParserStrategy,
    selectOptionParserStrategy
]
