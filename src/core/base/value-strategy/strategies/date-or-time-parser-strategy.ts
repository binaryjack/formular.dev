import { DateObject } from '../../../../components/date-picker/core/date-object.object'
import { DatePickerFormatsEnum } from '../../../../components/date-picker/core/date-picker.types'
import { DateObjectTypes } from '../../../../components/date-picker/core/models/date-object.types'
import { FieldValuesTypes } from '../../../../dependency/schema/descriptor/field.data.types'
import { isNDateNullOrUndefined } from '../../field-input-base/utils/is-ndate-null-or-undefined'
import { TParserStrategy } from '../value-strategy.types'

export const dateOrTimeParserStrategy: TParserStrategy<string | null> = (
    value: Partial<FieldValuesTypes>
): string | null => {
    if (!isNDateNullOrUndefined(value as DateObjectTypes)) {
        const newDte = new DateObject(undefined, 'temp-date')
        if (!newDte?.toString || !newDte.isDefined || !newDte.parse) return null
        newDte.parse?.(value as DateObjectTypes)
        return newDte.isDefined?.() ? newDte.toString(DatePickerFormatsEnum.YYYY_MM_DD) : null
    }
    return null
}
