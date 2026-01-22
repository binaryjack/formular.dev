import { DateObject } from '@core/framework/types/date/date-object.object'
import { DateFormatsEnum } from '@core/framework/types/date/date.types'
import { formatDate } from '@core/framework/types/date/formatters/format-date'
import { INDate } from '@core/framework/types/date/i-n-date'
import { IInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValueManager } from '../value-manager.types'

export const toString = function (this: IValueManager, field: IInput) {
    const value = field.input.value as any
    if (!value) return ''
    if (typeof value === 'object') {
        if ('day' in value && 'month' in value && 'year' in value) {
            const _dte = value as INDate
            return formatDate(_dte, DateFormatsEnum.YYYY_MM_DD)
        }
        return ''
    } else if (value instanceof DateObject) {
        return value?.toString?.(DateFormatsEnum.YYYY_MM_DD)
    } else {
        return value.toString?.()
    }
}
