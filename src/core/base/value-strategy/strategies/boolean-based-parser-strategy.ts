import { booleanTypes } from '../../field-input-base/field-input.types'
import { booleanParser } from '../parsers/boolean-parser'
import { setParserStrategy } from '../value-strategy.types'

export const booleanParserStrategy = setParserStrategy(
    'BooleanParserStrategy',
    booleanTypes,
    'value',
    booleanParser
)
