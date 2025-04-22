import { DateObject } from '../../../../components/datePicker/core/DateObject.object'
import { DatePickerFormatsEnum } from '../../../../components/datePicker/core/DatePicker.types'
import { formatDate } from '../../../../components/datePicker/core/formatters/formatDate'
import { INDate } from '../../../../dependency/schema/descriptor/field.data.date.struct'
import { IFieldInput } from '../fieldInput.types'

export const toString = function (this: IFieldInput) {
    const value = this.getValue()
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
