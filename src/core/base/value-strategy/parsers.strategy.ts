import { DateObject } from '../../../components/date-picker/core/date-object.object'
import { DatePickerFormatsEnum } from '../../../components/date-picker/core/date-picker.types'
import { DateObjectTypes } from '../../../components/date-picker/core/models/date-object.types'
import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'
import {
    isBooleanNullOrUndefined,
    isNDateNullOrUndefined,
    isNotNumericNullOrUndefined,
    isNullEmptyOrUndefined
} from '../field-input-base/utils'
import { TParserStrategy } from './value-strategy.types'

export const DateOrTimeParserStrategy: TParserStrategy<string | null> = (
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

export const NumericValueParserStrategy: TParserStrategy<number | null> = (
    value: Partial<FieldValuesTypes>
): number | null =>
    !isNotNumericNullOrUndefined(value as number | null | undefined) ? Number(value) : null

export const StringParserStrategy: TParserStrategy<string | null> = (
    value: Partial<FieldValuesTypes>
): string | null => {
    return !isNullEmptyOrUndefined(value as string | null | undefined) && typeof value !== 'object'
        ? (value as string)
        : null
}

export const BooleanParserStrategy: TParserStrategy<boolean | null> = (
    value: Partial<FieldValuesTypes>
): boolean | null =>
    !isBooleanNullOrUndefined(value as boolean | undefined | null) ? (value ? true : false) : null
