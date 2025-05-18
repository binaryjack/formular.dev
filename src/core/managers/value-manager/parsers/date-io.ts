import { IDateObject } from '@components/date-picker/core/models/date-object.models'
import { INDate } from '@core/framework/schema/descriptor/i-n-date'

import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'

import { conventions } from '@components/context/conventions/conventions'
import { isDate } from '@core/framework/utility/is-date'
import { isDateObject } from '@core/framework/utility/is-date-object'
import { isNDate } from '@core/framework/utility/is-n-date'
import { isNullEmptyOrUndefined } from '@core/framework/utility/is-null-empty-or-undefined'
import { stringIsDate } from '@core/framework/utility/string-is-date'
import { dateObjectToString } from '@core/managers/validation-manager/converters/date-object-to-string'
import { dateToString } from '@core/managers/validation-manager/converters/date-to-string'
import { iNDateToString } from '@core/managers/validation-manager/converters/i-n-date-to-string'
import { stringToINDate } from '@core/managers/validation-manager/converters/string-to-n-date'
import { TGetter, TSetter } from '../value-manager.types'

export const dateGetter: TGetter<string | null> = (exfield: IExtendedInput): string | null => {
    if (isNullEmptyOrUndefined(exfield.input.objectValue)) {
        return null
    }
    if (exfield.input.value !== null && !isNDate(exfield.input.objectValue ?? null)) {
        throw new Error(
            `${dateGetter.name}: cannot get the value as date, is not date compatible value: ${JSON.stringify(exfield.input.value)}, field: ${exfield.input?.id}`
        )
    }
    return iNDateToString(
        exfield.input.objectValue as INDate,
        conventions.dataTypes.date.formatDisplay
    )
}

export const dateSetter: TSetter<Date | IDateObject | INDate | string | null> = function (
    exfield: IExtendedInput,
    value: any
) {
    let dateString: string | null = null

    switch (value) {
        case isDate(value):
        case stringIsDate(value as unknown as string):
            dateString = dateToString(value as Date, conventions.dataTypes.date.formatDisplay)

            break
        case isDateObject(value):
            dateString = dateObjectToString(
                value as IDateObject,
                conventions.dataTypes.date.formatDisplay
            )
            break
        case isNDate(value):
            dateString = iNDateToString(value as INDate, conventions.dataTypes.date.formatDisplay)
            break
    }
    const inDateObject = stringToINDate(dateString)
    exfield.input.domManager.dmSetValue(exfield.input.id.toString(), dateString)
    exfield.input.value = dateString
    exfield.input.objectValue = inDateObject
}
