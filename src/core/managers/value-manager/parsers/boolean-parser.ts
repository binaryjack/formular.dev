import { InputDataTypes } from '@core/framework/common/common.input.data.types'

import { isBooleanNullOrUndefined } from '@core/framework/utility/is-boolean-null-or-undefined'
import { IInput } from '@core/input-engine/core/input-base/input-base.types'
import { TParser } from '../value-manager.types'

export const booleanParser: TParser<boolean | null> = (
    value: Partial<InputDataTypes>
): boolean | null =>
    !isBooleanNullOrUndefined(value as boolean | undefined | null) ? (value ? true : false) : null

export const checkBoxParser: TParser<boolean | null> = function (input: IInput, value: boolean) {
    input.checked = value
    input.domManager.dmSetChecked(input.id.toString(), value)
    input.value = value
}
