import { booleanTypes } from '@core/framework/common/common.field.types'
import { booleanParser } from '../parsers/boolean-parser'
import { setParserStrategy } from '../value-manager.types'

export const booleanParserStrategy = setParserStrategy(
    'BooleanParserStrategy',
    booleanTypes,
    'value',
    booleanParser
)
