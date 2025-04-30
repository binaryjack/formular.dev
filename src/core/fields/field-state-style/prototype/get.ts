import { FieldInputStateType } from '../../../common.types'
import { IFieldStateStyle } from '../field-state-style.types'

/**
 * Retrieves the class name associated with a specific field state.
 *
 * @param {FieldInputStateType} state - The state of the field to retrieve.
 * @returns {string} - The class name associated with the state.
 */
export function get(this: IFieldStateStyle, state: FieldInputStateType): string {
    return this.classesList.get(state) ?? ''
}
