import { IFValueTypes } from '@dependency/schema/descriptor/field.data.types'
import { IRadioInput } from '../radio-base-input.types'

/**
 * Retrieves the value of a field based on the strategies defined in the ValueStrategy instance.
 * @param field - The field input base instance to retrieve the value from.
 * @returns The value of the field or null if no strategy matches.
 */
export function getValue(this: IRadioInput): IFValueTypes {
    return this.field()._value?.getValue() ?? null
}
