import { conventions } from '@components/context/conventions/conventions'
import { DatePickerFormatsEnum } from '@components/date-picker/core/date-picker.types'
import { IDateObject } from '@components/date-picker/core/models/date-object.models'

export const dateObjectToString = (
    value: IDateObject,
    outputFormat: DatePickerFormatsEnum
): string | null => {
    if (value === null || value === undefined) {
        return null
    }
    value.separator = conventions.dataTypes.date.separator
    return value.toString?.(outputFormat) ?? null
}
