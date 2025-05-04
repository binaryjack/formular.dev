import { dateTypes } from '@core/common.types'
import { dateOrTimeParser } from '../parsers/date-or-time-parser'
import { setParserStrategy } from '../value-strategy.types'

export const dateOrTimeParserStrategy = setParserStrategy(
    'DateOrTimeParserStrategy',
    dateTypes,
    'value',
    dateOrTimeParser
)
