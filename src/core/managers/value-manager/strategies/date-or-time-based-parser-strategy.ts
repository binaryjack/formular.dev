import { dateTypes } from '@core/framework/common/common.input.types'
import { dateOrTimeParser } from '../parsers/date-or-time-parser'
import { setParserStrategy } from '../value-manager.types'

export const dateOrTimeParserStrategy = setParserStrategy(
    'DateOrTimeParserStrategy',
    dateTypes,
    'value',
    dateOrTimeParser
)
