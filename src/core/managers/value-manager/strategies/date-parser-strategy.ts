import { dateTypes } from '@core/framework/common/common.input.types'
import { dateGetter, dateSetter } from '../parsers/date-io'
import { setParserStrategy } from '../value-manager.types'

export const dateParserStrategy = setParserStrategy(
    'DateParserStrategy',
    dateTypes,
    'objectValue',
    dateSetter,
    dateGetter
)
