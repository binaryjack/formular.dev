import { DateObject } from '@components/date-picker/core/date-object.object'
import { DatePickerFormatsEnum } from '@components/date-picker/core/date-picker.types'
import { formatDate } from '@components/date-picker/core/formatters/format-date'
import { INDate } from '@dependency/schema/descriptor/field.data.date.struct'
import { IValueStrategy } from '../value-strategy.types'

export const toString = function (this: IValueStrategy) {
    const value = this.field.value as any
    if (!value) return ''
    if (typeof value === 'object') {
        if ('day' in value && 'month' in value && 'year' in value) {
            const _dte = value as INDate
            return formatDate(_dte, DatePickerFormatsEnum.YYYY_MM_DD)
        }
        return ''
    } else if (value instanceof DateObject) {
        return value?.toString?.(DatePickerFormatsEnum.YYYY_MM_DD)
    } else {
        return value.toString?.()
    }
}
