import { IFValueTypes } from '@dependency/schema/descriptor/field.data.types'
import { IDropDownInput } from '../drop-down-base-input.types'

/**
 * Retrieves the value of a field based on the strategies defined in the ValueStrategy instance.
 * @param field - The field input base instance to retrieve the value from.
 * @returns The value of the field or null if no strategy matches.
 */
export function getValue(this: IDropDownInput): IFValueTypes {
    return this._field._value?.getValue() ?? null
}
