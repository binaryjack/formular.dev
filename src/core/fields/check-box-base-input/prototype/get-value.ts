import { getValueAccessor } from '@core/fields/field-base-input/accessors/accessors'
import { IFValueTypes } from '@dependency/schema/descriptor/field.data.types'
import { ICheckBoxInput } from '../check-box-base-input.types'

/**
 * Retrieves the value of a field based on the strategies defined in the ValueStrategy instance.
 * @param field - The field input base instance to retrieve the value from.
 * @returns The value of the field or null if no strategy matches.
 */
export function getValue(this: ICheckBoxInput): IFValueTypes {
    return getValueAccessor(this.field())
}
