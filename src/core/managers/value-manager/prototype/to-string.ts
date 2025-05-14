import { DateObject } from '@components/date-picker/core/date-object.object'
import { DatePickerFormatsEnum } from '@components/date-picker/core/date-picker.types'
import { formatDate } from '@components/date-picker/core/formatters/format-date'
import { INDate } from '@core/framework/schema/descriptor/i-n-date'
import { IInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValueManager } from '../value-manager.types'

export const toString = function (this: IValueManager, field: IInput) {
    const value = this.input.value as any
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
