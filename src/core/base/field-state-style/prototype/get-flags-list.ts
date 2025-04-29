import { FieldInputStateType } from '../../common.types'
import { IFieldStateStyle } from '../field-state-style.types'

/**
 * Retrieves a list of all flags (field states) as an array.
 *
 * @returns {FieldInputStateType[]} - An array of all field states.
 */
export function getFlagsList(this: IFieldStateStyle): FieldInputStateType[] {
    return Array.from(this.classesList.keys())
}
