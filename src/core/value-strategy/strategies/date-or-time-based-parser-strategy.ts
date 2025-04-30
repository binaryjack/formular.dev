import { dateTypes } from '../../field-input/field-input.types'
import { dateOrTimeParser } from '../parsers/date-or-time-parser'
import { setParserStrategy } from '../value-strategy.types'

export const dateOrTimeParserStrategy = setParserStrategy(
    'DateOrTimeParserStrategy',
    dateTypes,
    'value',
    dateOrTimeParser
)
