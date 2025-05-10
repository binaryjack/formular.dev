import { dateTypes } from '@core/framework/common/common.field.types'
import { dateOrTimeParser } from '../parsers/date-or-time-parser'
import { setParserStrategy } from '../value-manager.types'

export const dateOrTimeParserStrategy = setParserStrategy(
    'DateOrTimeParserStrategy',
    dateTypes,
    'value',
    dateOrTimeParser
)
